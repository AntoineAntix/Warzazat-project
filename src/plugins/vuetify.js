import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: 'blue-grey',
        secondary: 'light-blue',
        error: 'red'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
