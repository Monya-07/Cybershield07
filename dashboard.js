import { auth } from "./firebase-config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Toggle Menu for Mobile
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    userName.textContent = `Welcome, ${user.displayName || "User"}`;
    userEmail.textContent = `Your email: ${user.email}`;
  } else {
    window.location.href = "login.html"; // Redirect to login if not authenticated
  }
});

// Logout Function
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "login.html"; // Redirect after logout
  } catch (error) {
    console.error("Logout Error:", error);
  }
});