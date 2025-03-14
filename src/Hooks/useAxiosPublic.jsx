import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:7000'
})
// https://blood-donation-server-side-project.vercel.ap
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;


