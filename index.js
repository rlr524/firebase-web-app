require("dotenv").config();

// document elements
const startRsvpButton = document.getElementById("startRsvp");
const guestbookContainer = document.getElementById("guestbook-container");
const form = document.getElementById("leave-message");
const input = document.getElementById("message");
const guestbook = document.getElementById("guestbook");
const numberAttending = document.getElementById("number-attending");
const rsvpYes = document.getElementById("rsvp-yes");
const rsvpNo = document.getElementById("rsvp-no");
var rsvpListener = null;
var guestbookListener = null;
// add Firebase project config object
var firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "emiya-firebase-web-app-meetups.firebaseapp.com",
  databaseURL: "https://emiya-firebase-web-app-meetups.firebaseio.com",
  projectId: "emiya-firebase-web-app-meetups",
  storageBucket: "emiya-firebase-web-app-meetups.appspot.com",
  messagingSenderId: "960578610606",
  appId: "1:960578610606:web:0abc03dc5866e3e690943f"
};

firebase.initializeApp(firebaseConfig);
// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // email / password provider
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // handle sign in
      // return false to avoid redirect
      return false;
    }
  }
};
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// listen on RSVP button clicks
startRsvpButton.addEventListener("click", () => {
  if (firebase.auth().currentUser) {
    // user is signed in; allow user to sign out
    firebase.auth().signOut();
  } else {
    // no user is signed in; allow user to sign in
    ui.start("#firebaseui-auth-container", uiConfig);
  }
});

// listen to the current auth state
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    startRsvpButton.textContent = "LOGOUT";
  } else {
    startRsvpButton.textContent = "RSVP";
  }
});
