//class for storing the data for the user, data should be fetched from database
//other classes access the user data from here
import { auth } from "../firebase-config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../firebase-config/firebase";
import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';


// var email = auth.currentUser.email;
// var count = 0;

// firebaseConfig.auth().onAuthStateChanged(auth, (user) => {
//     if (user && count === 0) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const userAuth = auth.currentUser;
//       email = userAuth.email;
//     }
//   });


export class UserData{
    constructor(userEmail, name, pronouns, qualifications, bio) {
        this.userEmail = userEmail;
        this.name = name;
        this.pronouns = pronouns;
        this.qualifications = qualifications;
        this.bio = bio;
    }

    get Email() {
        return this.userEmail;
    }

    get Name() {
        return this.name;
    }

    get Pronouns() {
        return this.pronouns;
    }

    get Qualifications() {
        return this.qualifications;
    }

    get Bio() {
        return this.bio;
    }
}


// export const UserData = [
//     {
//         email: auth?.currentUser?.email,
//         name: "Name",
//         bio: "I strongly believe that one of the keys to success is to nurture a genuine interest in the work one performs and that through this process a passion will develop. When one is passionate about what they do this allows them to achieve their true potential. My personal fulfillment comes from seeing other’s potential being realised. ",
//         pronouns: "he/him",
//         qualifications: "3rd year undergraduate",
//     }
// ];

export default UserData;