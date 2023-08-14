/*
* fixed banner data
*
*
* */

import {onMounted, ref} from "vue";
import {getBannerAPI} from "@/apis/home";

const bannerList = ref([])
export function useBanner() {
    const getBanner = async () => {
        const res = await getBannerAPI({
            distributionSite: "2"
        })
        bannerList.value = res.result
    }

    onMounted(() => getBanner())
return {
    bannerList
}
}