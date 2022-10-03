import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";

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



const GoogleLoginAuth = () => {
  const navigate = useNavigate();
  const signIn = async () =>{
    signInWithPopup(auth, provider)
      .then((result) => { 
        const name = result.user.displayName;
        const email = result.user.email;
        localStorage.setItem('name',name);
        localStorage.setItem('email',email); 
        navigate("/");
      
      }).catch((error) => { 
        const errorCode = error.code;
        const errorMessage = error.message; 
        const email = error.customData.email; 
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
    }

    const signout = async () => {
      signOut(auth).then(() => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");  
        navigate("/");  
      }).catch((error) => {
        console.log(error);
      });
    }
    
  return {signIn, signout}
}

export default GoogleLoginAuth;