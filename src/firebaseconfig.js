import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCthM3eARZcBFkknlXywcBu_TnCl-fW6WU',
    authDomain: 'medsoft-c2460.firebaseapp.com',
    projectId: 'medsoft-c2460',
    storageBucket: 'medsoft-c2460.appspot.com',
    messagingSenderId: '541698131332',
    appId: '1:541698131332:web:63cd5b480de660f83d89d1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
