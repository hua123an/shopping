import {useCartStore} from "./cartStore"
import {defineStore} from "pinia";
import {ref} from "vue";
import {loginAPI} from "@/apis/user"
import {mergeCartAPI} from "@/apis/cart"
export const useUserStore = defineStore("login" , () => {
        const userInfo = ref({})
    const getUserInfo = async ({account , password}) => {
        const res = await  loginAPI({account, password})
        userInfo.value = res.result
    //     merge cart list
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId : item.skuId,
                selected : item.selected,
                count : item.count
            }
        }))
      await  cartStore.updateNewList()


    }
        const cartStore = useCartStore()

        const clearUserInfo = () => {
        userInfo.value = 0
        cartStore.clearCart()
    }
    return  {
        userInfo,
        getUserInfo,
        clearUserInfo

    }
},{
    persist : true
    }
    )