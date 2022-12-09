import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

import "./SuccessValidation.css"

import cross from "../../Images/cross.png"
import valid from "../../Images/valid.png"

const SuccessValidation = () => {

    return (

        <div>

            <Header />

            <div className="mainBody">

                <div className="SuccessValidationWindow">
                    <img src={cross} className="exitBtn" />

                    <div className="validAndText" >
                        <img src={valid}  className="validImg"/>
                        <p className="tokenTextSuccessValidation">Présence validée.</p>
                    </div>


                </div>

            </div>

            <Footer />

        </div>
    );

}

export default SuccessValidation;
