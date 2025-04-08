import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";  
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";  

// ✅ Export `firebaseConfig` so it can be imported in other files
export const firebaseConfig = {
     apiKey: "AIzaSyD-qLET4b_OaAHEr_iF0ycFmX9_Mn4SLQU",
    authDomain: "cybershield-af42e.firebaseapp.com",
    projectId: "cybershield-af42e",
    storageBucket: "cybershield-af42e.firebasestorage.app",
    messagingSenderId: "693884471197",
    appId: "1:693884471197:web:7a0813000572110bafd174"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
const auth = getAuth(app);  
const provider = new GoogleAuthProvider();  

// ✅ Correctly export all necessary variables
export { app, auth, provider };