import 'element-plus/theme-chalk/el-message.css'
import {ElMessage} from "element-plus";
import axios from "axios"
import {useUserStore} from "@/stores/userStore";
import router from "@/router"

const httpInstance = axios.create({
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    // from pinia get token
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    //     error tip
    ElMessage({
        type: 'error',
        message: e.response.data.message
    })
    // 401 token contact
    if (e.response.status === 401){
        // clear user info
        const userStore = useUserStore()
        userStore.clearUserInfo()
        // jump to login page
        router.push("/login")
    }
    return Promise.reject(e)
})


export default httpInstance