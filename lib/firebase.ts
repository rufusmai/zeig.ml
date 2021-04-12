import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCbzm1e57mh4NF0IA3qGqFsYFP45HhPIbM',
  authDomain: 'zeig-ml.firebaseapp.com',
  databaseURL: 'https://zeig-ml.firebaseio.com',
  projectId: 'zeig-ml',
  storageBucket: 'zeig-ml.appspot.com',
  messagingSenderId: '103562936467',
  appId: '1:103562936467:web:5da1c3b37fd8c9a5ce4d66',
  measurementId: 'G-4507QNJ6LY'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db: firebase.database.Database = firebase.database()
const auth: firebase.auth.Auth = firebase.auth()

if (process.env.NODE_ENV === 'development') {
  db.useEmulator('localhost', 9000)
  auth.useEmulator('http://localhost:9099')
}

export const getUserOrCreate = async (): Promise<firebase.User> => {
  if (!auth.currentUser) {
    await auth.signInAnonymously()
  }

  return <firebase.User> await auth.currentUser
}

export const getRoute = (slug: string): firebase.database.Reference => {
  return db.ref(`routes/${slug}/visits`)
}
