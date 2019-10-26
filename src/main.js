import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  vuetify,
  render: h => h(App),
  icons: {
    iconfont: 'md'
  }
}).$mount('#app')
