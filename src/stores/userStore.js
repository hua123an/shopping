// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI , getCodeAPI , getRegisterAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'
export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password}) => {
        const res = await loginAPI({ account, password , code , mobile })
        userInfo.value = res.result
        // 合并购物车的操作
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        cartStore.updateNewList()
    }

    // 退出时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        // 执行清除购物车的action
        cartStore.clearCart()
    }
    // 注册数据
    const registerInfo = ref({})
    const getRegisterInfo = async ({account , mobile , password , code }) => {
        const res = await getRegisterAPI({account , mobile , password , code})
        registerInfo.value = res.result
    }
    // 获取验证码
    const code = ref({})
    const getCode = async ({mobile}) => {
        const res = await getCodeAPI({mobile})
        code.value = res.result.code
    }






    // 3. 以对象的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo,
        registerInfo,
        getRegisterInfo,
        code,
        getCode
    }
}, {
    persist: true,
})