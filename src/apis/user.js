import httpInstance from "@/utils/http";

export const loginAPI = ({account , password}) => {
    return httpInstance({
        url : "/login",
        method : "POST",
        data : {
            account,
            password
        }
    })
}
export const getLikeListAPI = ({ limit = 4 }) => {
    return httpInstance({
        url:'/goods/relevant',
        params: {
            limit
        }
    })
}
/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/


export const getUserOrder = (params) => {
    return httpInstance({
        url:'/member/order',
        method:'GET',
        params
    })
}
//register api
export const getRegisterAPI = async ({account , mobile , password , code}) => {
    return httpInstance({
        url : "/register",
        method : "POST",
        headers : {'content-type' : 'application/json'},
        data : {
            account,
            mobile,
            password,
            code
        }
    })
}
export const getCodeAPI = async ({mobile}) => {
    return httpInstance({
        url : `/code`,
        method : "GET",
        data : {
            mobile
        }
    })
}