import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../views/Home/index.vue'),
    redirect:'/appmain',
    children:[
      {
        path:'appmain',
        name:'appmain',
        component:() => import('../components/AppMain')
      },
      {
        path:'details',
        name:'details',
        component:() => import('../components/Details')
      }
    ]

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index')
  },
  {
    path: '*',
    name: 'login',
    component: () => import('../components/AppMain')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to,from,next) => {
  NProgress.start()
  const hasToken = getToken()
  if(to.path == '/login'){
    next()
    NProgress.done()
  }else {
    if(hasToken){
      next()
      NProgress.done()
    }else {
      next('/login')
      NProgress.done()
    }
  }
})



export default router
