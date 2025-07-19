
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

  import {getAuth,onAuthStateChanged, signOut}  from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js"
  import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js"

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

  const auth = getAuth();

  const db=getFirestore(app);

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
      .then((docSnap)=>{
        if(docSnap.exists()){
          const userData = docSnap.data();
          document.getElementById('userName').innerText=userData.firstName + " " + userData.lastName;
        }else{
          console.log("No document found matching id");
        }
      })
      .catch((error)=>{
          console.log("Error getting document");
      })
    }
    else{
      console.log("User Id not found in local storage");
    }
  })
