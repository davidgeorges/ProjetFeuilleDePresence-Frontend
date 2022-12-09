import './Unauthorized.css'
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Unauthorized = () => {

    return (
        <div> <Header />
            <div className="mainBody">
                <span className='errorMessage'>Unauthorized - Missing right access</span>
            </div>
            
            <Footer />
        </div>
    );

}

export default Unauthorized;
