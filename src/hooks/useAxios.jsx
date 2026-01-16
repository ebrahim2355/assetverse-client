import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://assetverse-server.vercel.app"
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;