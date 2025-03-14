import { useContext } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            console.log(res.data)
            return res.data;
        }
    })
   
    return [isAdmin,isAdminLoading]
};

export default useAdmin;

