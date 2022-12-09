import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CircularProgress from '@mui/material/CircularProgress';
import './Loading.css'

const Loading = () => {

    return (
        <div> <Header />
            <div className="mainBody">
                <CircularProgress />
            </div>
            <Footer />
        </div>
    );

}

export default Loading;
