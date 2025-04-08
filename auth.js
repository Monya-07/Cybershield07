document.addEventListener("DOMContentLoaded", function() {
  const logoutBtn = document.getElementById("logout-btn");
  
  // Firebase Authentication State Check
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      console.log("No user logged in. Redirecting to login...");
      window.location.href = "login.html"; // Force login if not authenticated
    } else {
      console.log("User logged in:", user.email);
    }
  });
  
  // Logout Function
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
      firebase.auth().signOut().then(() => {
        console.log("User logged out successfully.");
        window.location.href = "login.html"; // Redirect after logout
      }).catch(error => {
        console.error("Logout Error:", error);
      });
    });
  } else {
    console.error("Logout button not found!");
  }
});