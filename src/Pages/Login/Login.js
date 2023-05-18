import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import useAuth from "../../Hooks/useAuth";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { login } from "../../Services/auth.service";
import "./Login.css"


const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });

    const [formError, setformError] = useState({ loginMessage: "", passwordMessage: "" });

    const [loginError, setLoginError] = useState("");

    const handleChange = (event) => {
        //event.target.name = name of our attributes of the interface
        setLoginCredentials({ ...loginCredentials, [event.target.name]: event.target.value });
    };

    

    return (

        <div className="t">

            <Header />

            <div className="mainBody">

                <div className="loginWindow">

                    <p className="connectionLogin">Connection</p>

                    <div>
                        <TextField className="mailInputLogin" label="Email" name="email" variant="outlined" onChange={handleChange} />
                        <p className="loginMessage">{formError.loginMessage.length > 0 ? formError.loginMessage : ""}</p>
                        <TextField className="passwordInputLogin" label="Password" name="password" variant="outlined" onChange={handleChange} type="password" />
                        <p className="passwordMessage">{formError.passwordMessage.length > 0 ? formError.passwordMessage : ""}</p>
                        <p className="errorMessageLogin">{loginError.length > 0 ? loginError : ""}</p>
                    </div>

                    <p className="forgotPasswordLogin">Forgot your password ?</p>

                    <Button variant="contained" className="buttonLogin" onClick={async () => {

                        
                        try {
                            //Login the user
                            const res = await login(loginCredentials);

                            //Set data in auth context
                            setAuth({
                                id: res.data.id,
                                role: [res.data.role]
                            })
                            
                            //Redirect it via the path that the backend send
                            navigate(`${res.data.role}`);

                        } catch (err) {

                            //If this message is not undefined that mean we have a login form error
                            if(err.message !== undefined ){

                                if(formError.loginMessage.length >0 || formError.passwordMessage.length >0){
                                    setformError({ loginMessage: "", passwordMessage: "" })
                                }
                                setLoginError(err.message)

                            }else{
                                
                                if(loginError.length >0){
                                    setLoginError("")
                                }
                                setformError({ loginMessage: err.loginMessage, passwordMessage: err.passwordMessage })

                            }  
                            
                        }

                    }}>Connection</Button>

                </div>

            </div>

            <Footer />

        </div>
    );

}

export default Login;
