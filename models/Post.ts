/* eslint-disable */
import firebase from 'lib/firebaseInit'

const postColRef = firebase.firestore().collection('posts')

export const newPost = async(user, value) => {

  await postColRef.doc().set({
    user: { 
      uid: user.uid,
      email: user.email
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
        allPosts.push({... doc.data()})
      })
    })
  
  return allPosts

}