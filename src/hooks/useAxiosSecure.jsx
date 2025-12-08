import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
});

export default function useAxiosSecure() {
    const { logOut } = useAuth();

    useEffect(() => {
        // REQUEST
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // RESPONSE
        const resInterceptor = axiosSecure.interceptors.response.use(
            res => res,
            async error => {
                const status = error?.response?.status;

                if (status === 401 || status === 403) {
                    await logOut();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [logOut]);

    return axiosSecure;
}