import firebase, { User } from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

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
    .get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        allPosts.push({... doc.data()})
      })
    })
  
  return allPosts

}