import { useContext } from "react";
import AuthContext from "../AuthContext/AuthContext";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useVolunteer = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data: isVolunteer, isPending: isVolunteerLoading} = useQuery({
        queryKey: [user?.email, 'volunteer'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            // console.log(res.data)
            return res.data
        }
    })
   
    // console.log(isVolunteer)
    return [isVolunteer,isVolunteerLoading]
};

export default useVolunteer;