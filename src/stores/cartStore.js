import {defineStore} from "pinia";
import {ref , computed} from "vue";
import {useUserStore} from "./userStore";
import {insertCartAPI ,findNewCartListAPI ,delCartAPI} from "@/apis/cart"

export const useCartStore = defineStore("cart" , () => {
        const  userStore = useUserStore()

        const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
        // get latest cart list
        const updateNewList = async () => {
            const res = await findNewCartListAPI()
            cartList.value = res.result

        }
        // add cart
        const addCart = async (goods) => {
        const {skuId , count} = goods
    //     login status
        if(isLogin){
            await insertCartAPI({skuId , count})
            updateNewList()
            //     login api
        }else{
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item){
                //     already add , count.value + 1
                item.value.count++
            }else{
                //     can't add , push
                cartList.value.push(goods)
            }
        }
    }
        // clear cart
    const clearCart = () => {
        cartList.value = []
    }



        // delete item cart
        const delCart = async (skuId) => {
        if (isLogin.value){
            await delCartAPI([skuId])
           updateNewList()
        }else{
            // 未登录状态
            // 思路：
            // 1. 找到要删除项的下标值 - splice
            // 2. 使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }

        }
        // all count
        const allCount = computed(() => cartList.value.reduce((a , c) => a + c.count , 0))
    //    all price
        const allPrice = computed(() => cartList.value.reduce((a , c) => a + c.count * c.price , 0))
        // isAll
    const isAll = computed(() => cartList.value.every((item) => item.selected))
        // checkbox
    const singleCheck = (skuId , selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId )
        item.selected = selected
    }
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)

    }
    const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((a , c) => a + c.count , 0))
    const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((a , c) => a + c.count * c.price , 0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
},
    {
        persist : true
    }

)