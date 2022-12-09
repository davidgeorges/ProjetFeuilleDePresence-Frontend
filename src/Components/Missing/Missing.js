import './Missing.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Missing = () => {

    return (
        <div> <Header />
            <div className="mainBody">
                <span className='errorMessage'>Unknown path - This page does not exist.</span>
            </div>
            
            <Footer />
        </div>
    );

}

export default Missing;
