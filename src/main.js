import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {
  store
} from './store'
const fb = require('./firebaseConfig.js')

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
const unsubscribe = fb.auth.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
