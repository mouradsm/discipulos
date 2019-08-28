import firebase from 'firebase/app'
import firebaseConfig from '../configs/firebase.conf'

export default ({ Vue }) => {
  firebase.initializeApp(firebaseConfig)

  Vue.prototype.$firebase = firebase
}
