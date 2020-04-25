/* eslint-disable */
import firebase, { User } from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

// ログインチェック
export const checkLogin = (setUser, router) => {

  firebase.auth().onAuthStateChanged((user) => {
    console.log("login user: ", user)

    if (user) {
      setUser(user)
      return user
        .getIdToken()
        .then((token) => {
          // eslint-disable-next-line no-undef
          return fetch("/api/login", {
            method: "POST",
            // eslint-disable-next-line no-undef
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ token }),
          })
        })
        .then((res) => {
          console.log("OK!", res)
          //router.push("/DashBoard")
        })
    } else {
      setUser(null)
      // eslint-disable-next-line no-undef
      fetch("/api/logout", {
        method: "POST",
        credentials: "same-origin",
      }).then((res) => {
        console.log("NG!", res)
        //router.push("/Top")
      })
    }
  })

}

// メール新規登録
export const signUpWithEmail = async(data) => {

  const { accountId, displayName, email, password } = data

  // firebase authにユーザー登録
  const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
    
  await user.updateProfile({
    displayName,
    photoURL: null
  })

  // firestoreへユーザー情報を格納
  await firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      accountId,
      displayName,
      email,
      password,
      createdAt: new Date
    })

}

// メールログイン
export const signInWithEmail = (data, router) => {
  const { email, password} = data

  firebase
      .auth()
      .signInWithEmailAndPassword(data.email,data.password)
      .then(()=>router.push('/DashBoard'))
      .catch((e)=>console.log(e))

}

// ログアウト
export const logout = async() => {

  // then SSR
  if(typeof window !== 'undefined'){
    await fetch('api/logout',{
      method: 'POST',
      credentials: 'same-origin'
    })
  }

  await firebase.auth().signOut()
    .catch((e)=>{console.log(e)})

  return
}
