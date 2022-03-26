import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.performance = true
Vue.config.performance = process.env.NODE_ENV !== 'production'

new Vue({
  render: h => h(App),
}).$mount('#app')
