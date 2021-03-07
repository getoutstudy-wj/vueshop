import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import welcome from '@/components/welcome'
import users from '@/components/user/users'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: login },
    {
      path: "/home", component: home, redirect: '/welcome',
      children: [
        { path: '/welcome', component: welcome },
        { path: '/users', component: users },

      ]

    }
  ]
})


//路由导航守卫
router.beforeEach((to, from, next) => {

  if (to.path === '/login') return next()
  //检查token是否存在，若不存在则切换路由
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()

})

export default router