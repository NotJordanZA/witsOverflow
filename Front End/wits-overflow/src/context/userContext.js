//for user context
import { createContext, useEffect, useState } from "react";
import {firebaseConfig, auth } from "../firebase-config/firebase";
import { onAuthStateChanged } from "firebase/auth";


export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

    return <UserContext.Provider value = {currentUser}>{children}</UserContext.Provider>
};