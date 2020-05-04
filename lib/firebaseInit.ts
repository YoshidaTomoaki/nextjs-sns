import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"
import clientCredentials from "credentials/client"

// firebase project　初期化
if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)
} else {
  firebase.app()
}

export default firebase

