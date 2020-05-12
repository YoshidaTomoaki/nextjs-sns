/* eslint-disable */
import firebase from 'lib/firebaseInit'

const usersColRef = firebase.firestore().collection('users')


export const getAllUsers = async() => {

  const querySnap = await usersColRef.get()
  return await Promise.all(
    querySnap.docs.map(doc => doc.exists ?
      ({...doc.data(), uid: doc.id}) 
      : null
    )
  )
}

