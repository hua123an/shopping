import httpInstance from "../utils/http.js"
export function getCategory() {
    httpInstance({
         url: 'home/category/head'
    })
}