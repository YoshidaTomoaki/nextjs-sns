/* eslint-disable */
import firebase from 'lib/firebaseInit'

const postColRef = firebase.firestore().collection('posts')

export const newPost = async(user, value) => {

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

  let allPosts = []

  await postColRef
    .orderBy('createdAt', 'desc')
    .get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        allPosts.push({... doc.data(), id: doc.id})
      })
    })
  
  return allPosts

}

export const deletePost = async(postId) => {
  await postColRef
    .doc(postId)
    .delete()
    .then(()=>console.log('post delete success'))
    .catch((e)=>{console.log('post delete error: ', e)})
  
}