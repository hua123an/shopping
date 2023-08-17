import httpInstance from "@/utils/http";

export const getOrderListAPI= (id) => {
    return httpInstance({
        url : `/member/order/${id}`
    })
}