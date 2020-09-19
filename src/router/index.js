import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue";
import RiskDash from "../views/RiskDash";
import HolderDash from "../views/HolderDash";

Vue.use(VueRouter)


const routes = [

  {
    path: '/',
    name: 'Login',
    component: Login
  },

  {
    path: '/dashr',
    name: 'DashR',
    component: RiskDash
  },

  {
    path: '/dashh',
    name: 'DashH',
    component: HolderDash
  },
]

const router = new VueRouter({
  routes
})

export default router
