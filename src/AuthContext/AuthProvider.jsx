import { useEffect, useState } from 'react';

// import { createUserWithEmailAndPassword,  GoogleAuthProvider,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';

import AuthContext from './AuthContext';
import auth from '../firebase.init';
import useAxiosPublic from '../Hooks/useAxiosPublic';


// const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();
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
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
            }
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[axiosPublic])



    const authInfo = {
        user,
        setUser, 
        loading,
        setLoading,
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