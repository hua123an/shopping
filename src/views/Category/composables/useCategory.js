/*
*
* fixed category data
*
* */
import {getCategoryAPI} from "@/apis/category";
import {onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
export function useCategory(){
    const categoryData = ref({})
    const route=  useRoute()
    const getCategoryList = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => getCategoryList())
    onBeforeRouteUpdate((to) => {
        getCategoryList(to.params.id)
    })
    return {
        categoryData,

    }

}