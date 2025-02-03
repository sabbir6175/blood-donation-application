import { useContext } from "react";
import AuthContext from "../AuthContext/AuthContext";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useDonor = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data: isDonor, isPending: isDonorLoading} = useQuery({
        queryKey: [user?.email, 'donor'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/donor/${user.email}`);
            console.log(res.data)
            return res.data?.donar;
        }
    })
   
    return [isDonor,isDonorLoading]
};

export default useDonor;