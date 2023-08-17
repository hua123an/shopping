import httpInstance from "@/utils/http";

export const insertCartAPI = ({skuId , count}) => {
  return httpInstance({
      url : "/member/cart",
      method : "post",
      data : {
            skuId ,
            count
      }
  })
}
//get latest cartList
export const findNewCartListAPI = () => {
    return httpInstance({
        url : "/member/cart"
    })
}
export const delCartAPI = (ids) => {
    return httpInstance({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}
export const  mergeCartAPI = (data) => {
    return httpInstance({
        url : "/member/cart/merge",
        method : "post",
        data
    })

}