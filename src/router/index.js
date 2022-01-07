import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test Random game',
    component: () => import(/* webpackChunkName: "about" */ '../views/RandomTest.vue')
  },
  {
    path: '/testnn',
    name: 'Test NN game',
    component: () => import(/* webpackChunkName: "about" */ '../views/NNTest.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
