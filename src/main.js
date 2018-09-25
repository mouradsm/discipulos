import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import firebase from 'firebase'

Vue.use(Vuetify)
firebase.initializeApp({
  apiKey: 'AIzaSyC4sScaNw4l4G_l7uK54dw0eQcJjSk70UA',
  authDomain: 'christian-manager.firebaseapp.com',
  databaseURL: 'https://christian-manager.firebaseio.com',
  projectId: 'christian-manager',
  storageBucket: 'christian-manager.appspot.com',
  messagingSenderId: '286250341384'

})

Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
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
