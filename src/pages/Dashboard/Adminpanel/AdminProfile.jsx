import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../AuthContext/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const AdminProfile = () => {
    const [loadedUser, setLoadedUser] = useState([])
    const AxiosSecure = useAxiosSecure()

    const {user} =useContext(AuthContext)
    // console.log(user.email)
    const email = user?.email


    useEffect(()=>{
        AxiosSecure.get(`/user`, {params: {email: email}} )
            .then(res =>{
                setLoadedUser(res.data)
            })
    },[AxiosSecure,email])

    console.log(loadedUser)
    return (
        <div>
            <h1>Welcome to profile</h1>
        </div>
    );
};

export default AdminProfile;