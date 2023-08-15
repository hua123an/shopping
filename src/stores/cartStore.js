import {defineStore} from "pinia";
import {ref , computed} from "vue";

export const useCartStore = defineStore("cart" , () => {

    const cartList = ref([])
    const addCart = (goods) => {
    //     already add , count.value + 1
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item){
            item.value.count++
        }else{
            //     can't add , push
            cartList.value.push(goods)
        }
    }
        // delete item cart
        const delCart = async (skuId) => {
            // 思路：
            // 1. 找到要删除项的下标值 - splice
            // 2. 使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }
        // all count
        const allCount = computed(() => cartList.value.reduce((a , c) => a + c.count , 0))
    //    all price
        const allPrice = computed(() => cartList.value.reduce((a , c) => a + c.count * c.price , 0))


    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice
    }
},
    {
        persist : true
    }

)