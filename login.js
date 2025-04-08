// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { firebaseConfig } from "/firebase-config.js"; // Make sure firebase-config.js exports firebaseConfig

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {
// UI Animation for switching forms
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => container.classList.add('active'));
loginBtn.addEventListener('click', () => container.classList.remove('active'));

// Google Login
document.getElementById("google-login").addEventListener("click", function() {
signInWithPopup(auth, provider)
.then((result) => {
console.log("Login Successful!", result.user);
alert("Login Successful!");
window.location.href = "dashboard.html";
})
.catch((error) => {
console.error("Google Sign-in Error:", error.message);
alert("Error: " + error.message);
});
});

// Email/Password Login
document.getElementById("login-form").addEventListener("submit", function(event) {
event.preventDefault();

// Fetch values correctly  
const email = document.getElementById("login-email").value;  
const password = document.getElementById("login-password").value;  
  
signInWithEmailAndPassword(auth, email, password)  
  .then((userCredential) => {  
    console.log("Login Successful!", userCredential.user);  
    alert("Login Successful!");  
    window.location.href = "dashboard.html";  
  })  
  .catch((error) => {  
    console.error("Login Error:", error.message);  
    alert("Error: " + error.message);  
  });

});

// Registration
document.getElementById("register-form").addEventListener("submit", function(event) {
event.preventDefault();

const email = document.getElementById("register-email").value;  
const password = document.getElementById("register-password").value;  
  
createUserWithEmailAndPassword(auth, email, password)  
  .then((userCredential) => {  
    console.log("Registration Successful!", userCredential.user);  
    alert("Registration Successful! You can now log in.");  
    container.classList.remove('active'); // Switch to login view  
  })  
  .catch((error) => {  
    console.error("Registration Error:", error.message);  
    alert("Error: " + error.message);  
  });

});

// Redirect if user is already logged in
onAuthStateChanged(auth, (user) => {
if (user) {
window.location.href = "dashboard.html";
}
});
});

