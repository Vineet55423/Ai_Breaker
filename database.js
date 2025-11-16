// Firebase Authentication:

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3YmYxGImkv1lzQU9bVy9E8gC-l0JSsag",
  authDomain: "ai-breaker-s.firebaseapp.com",
  databaseURL: "https://ai-breaker-s-default-rtdb.firebaseio.com",
  projectId: "ai-breaker-s",
  storageBucket: "ai-breaker-s.firebasestorage.app",
  messagingSenderId: "632955331376",
  appId: "1:632955331376:web:22cb4ee9fd706796309ef5",
  measurementId: "G-2XW8XMYMX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// window.auth = auth;

//input

// submit button
// const logSubmit = document.getElementById('logSubmit');

document.addEventListener("DOMContentLoaded", () => {

    const logSubmit = document.getElementById('logButton');

    logSubmit.addEventListener("click", function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                window.location.href = "main.html";
                console.log("Account Created....")
            })
            .catch((error) => {
                alert(error.message);
            });
    });

});


// Firebase Realtime Database :

import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const db = getDatabase(app);

// Form Submit Listener
document.getElementById('signupForm').addEventListener('submit', submitform);

// Submit Function
function submitform(e) {
    e.preventDefault();

    const signupName = getElementVal('signup-name');
    const signupEmail = getElementVal('signup-email');
    const signupPass = getElementVal('signup-password');
    const signupConfirmPass = getElementVal('signup-confirm-password');
    
    saveMess(signupName, signupEmail, signupPass, signupConfirmPass);
}

// Save Message to Firebase
function saveMess(signupName, signupEmail, signupPass, signupConfirmPass) {
    const myprojectRef = ref(db, "signupForm/");
    const newPostRef = push(myprojectRef);

    set(newPostRef, {
        signupName: signupName,
        signupEmail: signupEmail,
        signupPass: signupPass,
        signupConfirmPass: signupConfirmPass
    });
}

// Helper Function
function getElementVal(id) {
    return document.getElementById(id).value;
}