import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import("@/views/Layout/index.vue"),
      children : [
        {
          path : "",
          component : () => import("@/views/Home/HomeView.vue"),
        },{
        path : "category/:id",
          name : "category",
          component : () => import("@/views/Category/CategoryView.vue")
        },
        {
          path : "category/sub/:id",
          name : "subCategory",
          component : () => import("@/views/subCategory/subCategoryView.vue")
        },
        {
          path : "detail/:id",
          name : "detail",
          component : () => import("@/views/detail/detailView.vue")
        }
      ]
    },
    {
      path : "/login",
      component : () => import("@/views/login/login.vue")
    }
  ],
  // router behavior to scroll to top when navigating between routes
  scrollBehavior(){
    return {top:0}
  }
})

export default router
