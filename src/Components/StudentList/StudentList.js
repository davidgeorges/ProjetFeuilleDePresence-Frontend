import './StudentList.css'
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import DownloadIcon from '@mui/icons-material/Download';

const StudentList = (props) => {


    const getStudentList = () => {

        let studentList = [];

        props.data.map((element, index) => {
            studentList.push(<tr key={"id" + index}>
                <td className='firstName'>{element["first_name"]}</td>
                <td className='lastName'>{element["last_name"]}</td>
                <td className='email'>{element["email"]}</td>
            </tr>)
        })

        return studentList;
    }


    return (
        <div> <Header />
            <div className='h'>
            <p className='titleStudent'>FICHE DE PRESENCE</p>
            <DownloadIcon/>
            </div>
            <div className="mainBodyStudent">
                <Table striped bordered hover className='studentTable'>
                    <thead>
                        <tr>
                            <th className='firstName' >First Name</th>
                            <th className='lastName' >Last Name</th>
                            <th className='email' >Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getStudentList()}
                    </tbody>
                </Table>
            </div>
            <Footer />
        </div>
    );

}

export default StudentList;
