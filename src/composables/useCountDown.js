import {ref  , computed} from   'vue'
import dayjs from 'dayjs'
import {onUnmounted} from "vue";

let timer  = null
export const useCountDown = () => {
//     data
    const time = ref(0)
    // format data
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    const start = (CurrentTime) => {
        formatTime.value = CurrentTime
       timer =  setInterval(() => {
            formatTime.value--
        },1000)
    }
    // clear interval
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}