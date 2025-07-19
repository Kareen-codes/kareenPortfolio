
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";


  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword}  from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js"
  import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js"

  const firebaseConfig = {
    apiKey: "AIzaSyBAejlI0ddEYezxLj_462-cMAcK8Faq-7Y",
    authDomain: "kareen-portfolio.firebaseapp.com",
    projectId: "kareen-portfolio",
    storageBucket: "kareen-portfolio.firebasestorage.app",
    messagingSenderId: "51740715434",
    appId: "1:51740715434:web:715f5f30186703bc8f23d3",
    measurementId: "G-LERLKLLMKS"
  };


  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

 window.addEventListener("DOMContentLoaded", () => {
  function showMessage(message, divId) {
    const divMessage = document.getElementById(divId);
    if (!divMessage) return;
    divMessage.style.display = "block";
    divMessage.innerHTML = message;
    divMessage.style.opacity = 1;
    setTimeout(() => {
      divMessage.style.opacity = 0;
      setTimeout(() => {
        divMessage.style.display = "none";
      }, 500);
    }, 4000);
  }

  window.showMessage = showMessage;

  // ✅ SIGN UP logic
  const signUp = document.getElementById("signUpBtn");
  if (signUp) {
    signUp.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("rEmail").value;
      const password = document.getElementById("passwrd").value;
      const firstName = document.getElementById("fname").value;
      const lastName = document.getElementById("lname").value;

      const auth = getAuth();
      const db = getFirestore();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
          };

          showMessage("Account created successfully", "signUpMessage");

          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, userData)
            .then(() => {
              window.location.href = "signIn.html";
            })
            .catch((error) => {
              console.log("error writing document", error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            showMessage("Email Address Already Exists!!!", "signUpMessage");
          } else {
            showMessage("Unable to Create User", "signUpMessage");
          }
        });
    });
  }

  // ✅ SIGN IN logic
  const signIn = document.getElementById("signInBtn");
  if (signIn) {
    signIn.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("Email").value;
      const password = document.getElementById("passW").value;

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          showMessage("Login is successful", "signInMessage");
          const user = userCredentials.user;

          localStorage.setItem("loggedInUserId", user.uid);
          window.location.href = "index.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log("Firebase error:", errorCode);
          if (errorCode === "auth/invalid-credential") {
            showMessage("Invalid Username or Password", "signInMessage");
          } else {
            showMessage("Account does not exist", "signInMessage");
          }
        });
    });
  } else {
    console.log("Sign In button not found in DOM");
  }
});
