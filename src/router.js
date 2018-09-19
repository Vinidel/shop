import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerOptions = [
  { path: '*', component: 'NotFound' },
  { path: '/', component: 'Landing' },
  { path: '/signin', component: 'Signin' },
  { path: '/signup', component: 'Signup' },
  { path: '/home', component: 'Home', meta: {requiresAuth: true}}
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // const isAuthenticated = firebase.auth().currentUser
  // Check if user is authenticated
  const token = localStorage.getItem('usertoken')
  if (requiresAuth && !token) {
    next('/signin')
  } else {
    next()
  }
})

export default router
