// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3y2C0kwNzhTD9JeEfyO47DEfSmg0MhKg",
    authDomain: "quiz-9d4a8.firebaseapp.com",
    projectId: "quiz-9d4a8",
    storageBucket: "quiz-9d4a8.appspot.com",
    messagingSenderId: "521597603039",
    appId: "1:521597603039:web:a8672d83a1f73466336d6a",
    measurementId: "G-3D9PZ93JSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);