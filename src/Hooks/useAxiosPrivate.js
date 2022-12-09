import axios from "axios";
import { useEffect } from "react";
import useRefreshToken from "../Hooks/useRefreshToken"
import useAuth from "./useAuth";
import useLogout from "./useLogout";

const useAxiosPrivate = () => {

    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const logout = useLogout()
    const axiosPrivate = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })

    useEffect(() => {

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
                return response;
            },
            (async (error) => {
                console.log(error.response.data.message);
                const previousRequest = error.config;
                if (error.response.status === 401 && !previousRequest.sent) {
                    switch (error.response.data.message) {
                        case "Error access_token expired.":
                        case "No access - Missing access_token.":
                            await refresh();
                            previousRequest.sent = true;
                            previousRequest.headers = { ...previousRequest.headers };
                            return axiosPrivate(previousRequest);
                        case "Error refresh_token expired.":
                        case "No access - Missing refresh_token.":
                            await logout();
                            break;
                        default:
                            break;
                    }
                } else {
                    return Promise.reject(error)
                }



            })
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;