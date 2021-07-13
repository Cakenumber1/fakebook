import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	locationID: process.env.REACT_APP_FIREBASE_LOC_ID
};


const myApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const str = firebase.storage();
export const fieldValue = firebase.firestore.FieldValue;
export const auth = myApp.auth();
export const mess = firebase.messaging();
export default myApp;
