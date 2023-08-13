import HttpInstance from "@/utils/http"

export function getCategoryAPI(){
  return HttpInstance({
      url: '/home/category/head'
  })
}