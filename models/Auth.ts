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
          router.push("/DashBoard")
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
export const signUpWithEmail = (data ,router, setError) => {

  const { firstName, lastName, email, password } = data

  firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async (res) => {
        console.log("success", res)
        const { user } = res
        // [todo]firestoreへユーザーDocを作成
        await firebase.firestore().collection('users').doc(user.uid).set({
          firstName,
          lastName,
          email,
          password,
          createdAt: new Date
        })
      })
      .then(()=>router.push("/DashBoard"))
      .catch(function (error) {
        console.log(error)
        setError(error)
        // [todo]エラーハンドリング
        const errorCode = error.code
        const errorMessage = error.message
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