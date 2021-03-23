import Vue from 'vue'
import VueRouter from 'vue-router'
import Students from '../components/Students.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/students',
    name: 'students',
    component: Students
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router