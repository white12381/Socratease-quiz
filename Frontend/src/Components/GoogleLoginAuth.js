import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGzQnv3hq7wLaJuIywThq_f8MNbRDXzE4",
  authDomain: "socratease-94fde.firebaseapp.com",
  projectId: "socratease-94fde",
  storageBucket: "socratease-94fde.appspot.com",
  messagingSenderId: "297600822447",
  appId: "1:297600822447:web:6bcb02e7e2bcc0653e385a",
  measurementId: "G-8W5N58EJXZ"
};
const app = initializeApp(firebaseConfig); 
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const signIn = async () =>{
signInWithPopup(auth, provider)
  .then((result) => {
     const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const name = result.user.displayName;
    const email = result.user.email;
    localStorage.setItem('name',name);
    localStorage.setItem('email',email);
    // console.log(name, email);
  }).catch((error) => { 
    const errorCode = error.code;
    const errorMessage = error.message; 
    const email = error.customData.email; 
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}
const GoogleLoginAuth = () => {

  return signIn
}

export default GoogleLoginAuth;