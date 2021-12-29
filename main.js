import App from './App'
// #ifndef VUE3

import store from './store' 
Vue.prototype.$store = store
import Vue from 'vue'
Vue.config.productionTip = false
console.log('111')
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif