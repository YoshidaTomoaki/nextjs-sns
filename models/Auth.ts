/* eslint-disable */
import firebase from 'lib/firebaseInit'

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
          return user
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
        router.push("/Top")
      })
    }
  })

}

type SignInWithEmail = {
  accountId: string
  displayName: string
  email: string
  password: string
}

// メール新規登録
export const signUpWithEmail = async(data) => {

  const { accountId, displayName, email, password } = data

  // firebase authにユーザー登録
  const { user } = 
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    
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

type SignInWithEmailInput = {
  email: string
  password: string
}

// メールログイン
export async function signInWithEmail(email, password){

  return await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
}

// firestoreからuserの取得
export async function getUser(uid: string){
  return await firebase.firestore().collection("users").doc(uid).get().then(async(user)=>{
    console.log('getUser',user)
    return await user.data()
  })
}

type UpdateUser = {
  uid?: string,
  displayName?: string,
  accountId?: string,
  introduction?: string,
  avatarUrl?: string
}

export async function updateUser(user: UpdateUser){
  const userDocRef = firebase.firestore().collection('users').doc(user.uid)

  await userDocRef.update({
    uid: user.uid,
    displayName: user.displayName,
    accountId: user.accountId,
    introduction: user.introduction,
    avatarUrl: user.avatarUrl
  }).then((result)=>{
    console.log('updateSuccess!', result)
    return result
  })

  if(!user?.avatarUrl) return
  updateAvatar(user.uid, user.avatarUrl)
}


export async function updateAvatar(uid: string,avatarUrl: string){
  const userDocRef = firebase.firestore().collection('users').doc(uid)

  await userDocRef.update({
    avatarUrl: avatarUrl
  }).then((result)=>{
    console.log('updateSuccess!', result)
    return result
  })
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
