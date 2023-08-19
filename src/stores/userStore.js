import {useCartStore} from "./cartStore"
import {defineStore} from "pinia";
import {ref} from "vue";
import {loginAPI} from "@/apis/user"
import {getCodeAPI} from "@/apis/user";
import {getRegisterAPI} from "@/apis/user";
import {mergeCartAPI} from "@/apis/cart"
export const useUserStore = defineStore("login" , () => {
        const userInfo = ref({})
        const registerInfo = ref({})
        const code = ref(0)
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
    const getCode = (params) => {
            const res = getCodeAPI(params)
            code.value = res.code
    }
    const getRegisterInfo =async ({account , mobile , password , code}) => {

            const res = await getRegisterAPI({account , mobile , password , code})



    }
    return  {
        userInfo,
        getUserInfo,
        clearUserInfo,
        getRegisterInfo,
        getCode

    }
},{
    persist : true
    }
    )