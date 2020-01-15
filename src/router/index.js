import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [{
  path: '*',
  component: 'NotFound'
},
{
  path: '/',
  component: 'Home',
  meta: {
    requiresAuth: true
  }
},
{
  path: '/signin',
  component: 'Signin'
},
{
  path: '/signup',
  component: 'Signup'
},
{
  path: '/home',
  component: 'Home',
  meta: {
    requiresAuth: true
  }
},
{
  path: '/cadastrar',
  component: 'Cadastrar',
  meta: {
    requiresAuth: true
  }
},
{
  path: '/discipulos',
  component: 'Discipulos',
  meta: {
    requiresAuth: true
  }
},
{
  path: '/vinculos/:uid',
  component: 'Vinculos',
  meta: {
    requiresAuth: true
  }
},
{
  path: '/add-vinculo/:uid',
  component: 'NovoVinculo',
  meta: {
    requiresAuth: true
  }
},
{
  path: '/detalhe/:uid',
  component: 'Detalhe',
  meta: {
    requiresAuth: true
  }
}
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () =>
      import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  }
  next()
})

export default router
