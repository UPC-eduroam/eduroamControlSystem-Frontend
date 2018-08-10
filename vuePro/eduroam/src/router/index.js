import Vue from 'vue'
import Router from 'vue-router'
import Login from '../../src/pages/components/login/login'
import Home from '../pages/components/main/home'
import Student from '../pages/components/main/student'
import Teacher from '../pages/components/main/teacher'
import Readmes from '../pages/components/main/components/readMes'
import Watchlist from '../pages/components/main/components/watchList'
import Operation from '../pages/components/main/components/operationRecord'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true
      },
      component: Home,
      children: [
        {
          path: '/home/student',
          component: Student
        },
        {
          path: '/home/teacher',
          component: Teacher,
          children: [
            {
              path: '/home/teacher/read',
              component: Readmes
            },
            {
              path: '/home/teacher/watch',
              component: Watchlist
            },
            {
              path: '/home/teacher/operation',
              component: Operation
            }
          ],
          redirect: '/home/teacher/read'
        }
      ]
    }
  ]
})
