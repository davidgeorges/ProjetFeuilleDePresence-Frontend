import useAuth from "../Hooks/useAuth";
import { logout } from "../Services/auth.service";
import { useNavigate } from 'react-router-dom'

const useLogout = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logoutUser = async () => {

        try {
            await logout();
            setAuth({
                id : "",
                role: [""]
            })
            navigate('/');
            return true;
        } catch (error) {
            console.log("Error while user deconnect");
            return false;
        }
    }

    return logoutUser;

}

export default useLogout;