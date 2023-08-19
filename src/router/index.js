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
        },
        {
          path : 'cartlist',
          name : 'cartlist',
          component : () => import('@/views/CartList/CartListView.vue')
        },
        {
          path : 'checkout',
          name : 'checkout',
          component  : () => import('@/views/Checkout/CheckoutView.vue')
        },
        {
          path : 'pay',
          name : 'pay',
          component : () => import('@/views/pay/PayView.vue')
        },
        {
          path : 'paycallback',
          name : 'paycallback',
          component : () => import('@/views/payCallback/PayCallBackView.vue')
        },
        {
          path : '/member',
          name : 'member',
          component : () => import("@/views/member/MemberView.vue"),
          children : [
            {
              path : '',
              name : 'userinfo',
              component : () => import("@/views/member/components/UserInfo.vue")
            },
            {
              path : 'order',
              name : 'order',
              component : () => import("@/views/member/components/UserOrder.vue")
            }
          ]
        }
      ]
    },
    {
      path : "/login",
      component : () => import("@/views/login/LoginView.vue")
    },
    {
      path : '/register',
      component : () => import("@/views/register/register.vue")
    }
  ],
  // router behavior to scroll to top when navigating between routes
  scrollBehavior(){
    return {top:0}
  }
})

export default router
