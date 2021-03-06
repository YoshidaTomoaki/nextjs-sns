/* eslint-disable */
import firebase from 'lib/firebaseInit'

const postColRef = firebase.firestore().collection('posts')

type User = {
  uid: string
  displayName: string
  accountId: string
  avatarUrl: string
} & any

export const newPost = async(user: User, value: string) => {

  await postColRef.doc().set({
    user: { 
      uid: user.uid,
      displayName: user.displayName,
      accountId: user.accountId,
      avatarUrl: user.avatarUrl
    },
    text: value,
    createdAt: new Date
  }).then(()=>{
    console.log('post success!!')
  }).catch((e)=>{
    console.error(e)
    throw e
  })

  return
}

export const getAllPosts = async() => {
  const querySnap = await postColRef.get()
  return await Promise.all(
    querySnap.docs.map(doc => doc.exists ?
      ({ ...doc.data(), id: doc.id })
      : null
    )
  )
}

export const deletePost = async(postId: string) => {
  await postColRef
    .doc(postId)
    .delete()
    .then(()=>console.log('post delete success'))
    .catch((e)=>{console.log('post delete error: ', e)})
  
}