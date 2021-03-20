import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA9M9k32oqlE5wkO8G22nN5JZdyrxUlS20",
  authDomain: "rideshare-c77d0.firebaseapp.com",
  projectId: "rideshare-c77d0",
  storageBucket: "rideshare-c77d0.appspot.com",
  messagingSenderId: "746561657728",
  appId: "1:746561657728:web:b47165bb293dffd0f8ff65",
});

export const auth = app.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const GithubProvider = new firebase.auth.GithubAuthProvider();

export const signUpWithEmail = async (
  email,
  password,
  userName,
  redirect,
  setError
) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    await updateUserName(userName);
    await redirect();
  } catch (error) {
    const err = await error;
    const errCode = err.code;
    const errMsg = err.message;
    setError({
      isError: true,
      errCode,
      errMsg,
    });
    console.log(err);
  }
};

const updateUserName = async (userName) => {
  try {
    await auth.currentUser.updateProfile({
      displayName: userName,
    });
  } catch (error) {
    const err = await error;
    console.log(err);
  }
};

export const signInWithEmail = async (email, password, redirect, setError) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    await redirect();
  } catch (error) {
    const err = await error;
    const errCode = err.code;
    const errMsg = err.message;
    setError({
      isError: true,
      errCode,
      errMsg,
    });
    console.log(err);
  }
};

export const socialMediaLogin = async (providerName, setError) => {
  try {
    await auth.signInWithPopup(providerName);
  } catch (error) {
    const err = await error;
    const errCode = err.code;
    const errMsg = err.message;
    setError({
      isError: true,
      errCode,
      errMsg,
    });
    console.log(err);
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    const err = await error;
    console.log(err);
  }
};

export const verifyEmail = () => {
  auth.currentUser
    .sendEmailVerification()
    .then(() => {
      alert("Verification email send successful check your inbox!");
    })
    .catch(function (error) {
      console.log(error);
    });
};

// export const forgetPassword = () => {
//   auth
//     .sendEmailVerification(auth.currentUser.email)
//     .then(() => {
//       alert("email send successful check your inbox!");
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

export default app;
