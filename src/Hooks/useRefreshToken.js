import { refreshToken } from "../Services/token.service";
import useAuth from "../Hooks/useAuth";

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        
        try {
            const res = await refreshToken();
            setAuth({
                id: res.data.id,
                role: [res.data.role]
            })
            return res;
        } catch (error) {
            setAuth({
                id : "",
                role: [""]
            })
            return false;
        }   
    }

    return refresh;
}

export default useRefreshToken;