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
        }
      ]
    },
    {
      path : "/login",
      component : () => import("@/views/login/login.vue")
    }
  ]
})

export default router
