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

export const addCollectionAndItems = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()
        batch.set(newDocRef, obj)
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data()
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, items
        }
    })
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth)
        }, reject)
    })
}
export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)
export default firebase