import './Header.css'
import cyLogo from "../../Images/cyLogo.png"

const Header = () => {

    return (
        <div className="header">
            <img className="cyLogoHeader" src={cyLogo}></img>
        </div>
    );

}

export default Header;
