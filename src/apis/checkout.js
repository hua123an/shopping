import httpInstance from "@/utils/http";

export const getCheckoutInfoAPI = async () => {
  return httpInstance({
      url : '/member/order/pre'
  })
}
export const createOrderAPI = async (data) => {
 return httpInstance({
        url : '/member/order',
        method : 'post',
        data
 })
}