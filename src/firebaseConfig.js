import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyC4sScaNw4l4G_l7uK54dw0eQcJjSk70UA',
  authDomain: 'christian-manager.firebaseapp.com',
  databaseURL: 'https://christian-manager.firebaseio.com',
  projectId: 'christian-manager',
  storageBucket: 'christian-manager.appspot.com',
  messagingSenderId: '286250341384'
}

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()

const settings = {
  timestampsInSnapshots: true
}

db.settings(settings)

export {
  db,
  auth
}
