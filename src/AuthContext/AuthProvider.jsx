import { useEffect, useState } from 'react';

// import { createUserWithEmailAndPassword,  GoogleAuthProvider,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';

import AuthContext from './AuthContext';
import auth from '../firebase.init';


// const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(user)
    // create user
    const createUser =(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //updateUserProfile
    const updateUserProfile=(updatedData)=>{
        return updateProfile(auth.currentUser, updatedData)
    }
    // // sign in user
    const signInUser = (email , password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // //sing in with google 
    // const singWithGoogle =()=>{
    //     setLoading(true)
    //     return signInWithPopup(auth,provider)
    // }
    // sing out user
    const singOutUser = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const donationRequests = [
        // Sample requests
        { id: 1, recipientName: 'John Doe', recipientDistrict: 'Dhaka', recipientUpazila: 'Uttara', bloodGroup: 'A+', donationDate: '2025-02-01', donationTime: '10:00 AM', status: 'pending' },
        // Add more sample requests here...
      ];

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            // console.log(currentUser)
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[])



    const authInfo = {
        user,
        setUser, 
        loading,
        createUser,
        updateUserProfile,
        signInUser,
        singOutUser,
        donationRequests
        // singWithGoogle
    }



    return (
        <AuthContext.Provider value={authInfo}  >
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;