import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
	apiKey: "AIzaSyCdgdrXJkoKXNOTLdCPTq3Lp-Sd6T2QKEk",
    authDomain: "manthan-7bde3.firebaseapp.com",
    databaseURL: "https://manthan-7bde3.firebaseio.com",
    projectId: "manthan-7bde3",
    storageBucket: "manthan-7bde3.appspot.com",
    messagingSenderId: "621320571970",
    appId: "1:621320571970:web:fd82acd8ea305e915631db",
    measurementId: "G-K80FM4H6F6"
    
});
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const rtdb = firebase.database();
export const analytics = firebase.analytics();
export const [user] = useAuthState(auth);
