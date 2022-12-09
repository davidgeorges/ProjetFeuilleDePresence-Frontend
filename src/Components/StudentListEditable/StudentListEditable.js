import './StudentListEditable.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentListEditable = (props) => {


    const getStudentList = () => {

        let studentList = [];

        props.data.map((element, index) => {
            studentList.push(<tr key={"id" + index}>
                <td>{element["first_name"]}</td>
                <td>{element["last_name"]}</td>
                <td>{element["email"]}</td>
            </tr>)
        })

        return studentList;
    }


    return (
        <div> <Header />
            <div className="mainBody">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
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

export default StudentListEditable;
