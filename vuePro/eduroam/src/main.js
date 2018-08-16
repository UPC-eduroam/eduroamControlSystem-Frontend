// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/reset.css'
import store from './store'
import Resource from 'vue-resource'

Vue.use(Element)
Vue.use(Resource)
Vue.config.productionTip = false

Vue.http.options.emulateHTTP = true
Vue.http.options.headers = {
  'Authorization': localStorage.getItem('token')
}

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if(!isEmptyObject(store.state.data)) {
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  }else {
    next()
  }
})

function isEmptyObject(obj) {
  for(let key in obj) {
    return false
  }
  return true
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
