import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

import "./ValidateToken.css"

const ValidateToken = () => {

    const axiosPrivate = useAxiosPrivate();
    const [message, setMessage] = useState("")
    const [dailyToken, setDailyToken] = useState(null);

    const handleChange = (event) => {
        //event.target.name = name of our attributes of the interface
        setDailyToken(event.target.value)
    };

    const setStatus = async () => {
        try {
            //Get the teacher promo
            if (dailyToken === ""){
                setDailyToken(null)
            }
            const res = await axiosPrivate.get(`api/student/setMyStatus/${dailyToken}`);
            if(res.status === 202){
                setMessage(res.data)
            }else{
                if(message.length >0){
                    setMessage("")
                }
                setMessage("You have declared your presence with success")
            }
        } catch (error) {
            console.log(error);
            if (error.message === "Network") {
                setMessage( "Error with the API while trying get teacher promo.");
            } else {
                setMessage(error.message);
            }
        }
        finally{
            setTimeout(() => {
                setMessage("")
              }, "5000")
        }
    }

    return (
        <div>

            <Header/>

            <div className="mainBody">

                <div className="ValidateTokenWindow">

                    <p className="tokenText">Token</p>

                    <div>
                        <TextField className="tokenInput" label="Token" variant="outlined" onChange={handleChange}/>
                        {message.length >0 ? message === "You have declared your presence with success" ? <p className="messageValidateToken">{message}</p> : <p className="errorMessageValidateToken">{message}</p> : ""}
                        
                    </div>

                    <Button variant="contained" className="buttonToken" onClick={ async () => {
                        
                        await setStatus();
                        
                    }}>Validate</Button>

                </div>

            </div>

            <Footer />

        </div>
    );

}

export default ValidateToken;
