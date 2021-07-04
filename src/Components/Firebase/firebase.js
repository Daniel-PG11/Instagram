import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA9EYyfoSkwTUd_l_nZAUqnMoiO_J8SEAM",
    authDomain: "danie-instagram.firebaseapp.com",
    projectId: "danie-instagram",
    storageBucket: "danie-instagram.appspot.com",
    messagingSenderId: "150292102983",
    appId: "1:150292102983:web:2609c2148eec9c17151662",
    measurementId: "G-TRW9X3DEHJ"
});



const db = firebaseApp.firestore();
const auth   =  firebase.auth();
const storage = firebase.storage();

export { db,auth,storage };
//   export default db;