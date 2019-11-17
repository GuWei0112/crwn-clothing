import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyC7pl2jZxHQhSJyFa2l8Lh_zWc-_sOSUjQ",
    authDomain: "crwn-db-22388.firebaseapp.com",
    databaseURL: "https://crwn-db-22388.firebaseio.com",
    projectId: "crwn-db-22388",
    storageBucket: "crwn-db-22388.appspot.com",
    messagingSenderId: "820822275889",
    appId: "1:820822275889:web:60ef636c6b5cc6e6256210"
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return null

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapshot = await userRef.get()
    if (!snapshot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            }) /*create the data */
        } catch (error) {
            console.log('error', error.message)
        }
    }
    
    return userRef
}
export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebase