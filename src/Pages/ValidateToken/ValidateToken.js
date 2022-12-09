import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'

import "./ValidateToken.css"

const ValidateToken = () => {

    const navigate = useNavigate()

    return (
        <div>

            <Header/>

            <div className="mainBody">

                <div className="ValidateTokenWindow">

                    <p className="tokenText">Token</p>

                    <div>
                        <TextField className="tokenInput" label="Token" variant="outlined" />
                        <p className="errorMessageValidateToken">Error message</p>
                    </div>

                    <Button variant="contained" className="buttonToken" onClick={() => {navigate("/SuccessValidation")}}>Validate</Button>

                </div>

            </div>

            <Footer />

        </div>
    );

}

export default ValidateToken;
