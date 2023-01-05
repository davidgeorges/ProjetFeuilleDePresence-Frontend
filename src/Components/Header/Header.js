import './Header.css'
import cyLogo from "../../Images/cyLogo.png"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logout } from '../../Services/auth.service';
import { useNavigate } from 'react-router-dom'
import useAuth from "../../Hooks/useAuth";
import { useLocation } from "react-router-dom"

const Header = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()

    return (
        <div className="header">
            <img className="cyLogoHeader" src={cyLogo}></img>
            {location.pathname === '/' ? null : <ExitToAppIcon className='disconnectLogo' fontSize="large" onClick={async () => {

                try {

                    //Logout the user
                    await logout();

                    //Set auth context empty
                    setAuth({
                        id: "",
                        role: [""]
                    })

                    //Redirect it via the path that the backend send
                    navigate('/');

                } catch (err) {

                }

            }} />}


        </div>
    );

}

export default Header;
