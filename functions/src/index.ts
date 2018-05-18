import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// TODO(DEVELOPER): Import the Cloud Functions for Firebase and the Firebase Admin modules here.

// TODO(DEVELOPER): Write the addWelcomeMessages Function here.

// TODO(DEVELOPER): Write the blurOffensiveImages Function here.

// TODO(DEVELOPER): Write the sendNotifications Function here.

// (OPTIONAL) TODO(DEVELOPER): Write the annotateMessages Function here.

const config = {
    apiKey: "AIzaSyA0qvbVS8i8IdbzFpPQSrQEZSPXLdY9t7I",
    authDomain: "firetrix-project-mendiola.firebaseapp.com",
    databaseURL: "https://firetrix-project-mendiola.firebaseio.com",
    projectId: "firetrix-project-mendiola",
    storageBucket: "",
    messagingSenderId: "31127316738"
};

admin.initializeApp(config);

export const sayHelloToNewUsers = functions
.auth
.user()
.onCreate( user => {
    const fulName = user.displayName;
    return admin.database().ref('messages').push({
            name: 'Firetrix bot',
            photoUrl: '/images/firebase-logo.png',
            text: `${fulName} has just joined.`
    }).then( () => console.log('Welcome message written'));
});