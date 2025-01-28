import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:7000'
})

const useAxiosPublic = () => {
    return axiosSecure
};

export default useAxiosPublic;