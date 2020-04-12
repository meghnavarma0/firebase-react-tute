import firebase from 'firebase';

var firebaseConfig = {
	apiKey: 'AIzaSyAwetYCBABhG-uIVQ4PtyOrHOgIMd8beMU',
	authDomain: 'fun-food-friends-4f4cf.firebaseapp.com',
	databaseURL: 'https://fun-food-friends-4f4cf.firebaseio.com',
	projectId: 'fun-food-friends-4f4cf',
	storageBucket: 'fun-food-friends-4f4cf.appspot.com',
	messagingSenderId: '608121489336',
	appId: '1:608121489336:web:80a762c7bad0e90829b14d',
	measurementId: 'G-1L427794VQ'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();

export default firebase;
