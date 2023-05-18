import './StudentList.css'
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import DownloadIcon from '@mui/icons-material/Download';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const StudentList = () => {

    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [promoName, setPromoName] = useState('');
    const [dateList, setDateList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    const handleChange = async (event) => {
        setDate(event.target.value);
        const resStudentList = await axiosPrivate.get(`api/teacher/getAllPromo/${event.target.value}`);
        setStudentList(resStudentList.data)
    };

    const getStudentList = () => {
        let studentListTable = [];
        studentList.map((element, index) => {
            studentListTable.push(<tr key={"id" + index}>
                <td className='firstName'>{element["first_name"]}</td>
                <td className='lastName'>{element["last_name"]}</td>
                <td className='email'>{element["email"]}</td>
                <td className='status' style={{ color: element["status"][date] === undefined ? "black" : element["status"][date].toUpperCase() === "PRESENT" ? "green" : "red" }}>{element["status"][date] === undefined ? "WAITING" : element["status"][date].toUpperCase()}</td>

            </tr>)
        })
        return studentListTable;
    }

    const getDateListMenu = () => {
        let dateListMenu = [];
        dateList.map((element, index) => {
            dateListMenu.push(<MenuItem key={index} value={element}>{element}</MenuItem>)
        })
        return dateListMenu;
    }

    useEffect(() => {
        const getDateList = async () => {
            try {
                const resWeekday = await axiosPrivate.get("api/teacher/getWeekday");
                if (!resWeekday.data.includes("weekends")) {
                    setDateList(resWeekday.data)
                    setDate(resWeekday.data[resWeekday.data.length - 1])
                    const resStudentList = await axiosPrivate.get(`api/teacher/getAllPromo/${resWeekday.data[resWeekday.data.length - 1]}`);
                    setStudentList(resStudentList.data)
                }else{
                    setMessage("You cannot access this view on weekends.")
                }
                const resPromoName = await axiosPrivate.get(`api/teacher/getPromoName`);
                setPromoName(resPromoName.data)
                setIsLoading(false)
            } catch (error) {
                setMessage(error.response.data)
                setIsLoading(false)
            }
        }
        getDateList();
    }, []);


    return (
        <div>
            <Header />
            <p className='titleStudent'>FICHE DE PRESENCE - {promoName}</p>
            <div className='selectAndDownload'>
                {dateList.length > 0 ? <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
                    <InputLabel >Date</InputLabel>
                    <Select
                        value={date}
                        label="Date"
                        onChange={handleChange}
                    >
                        {getDateListMenu()}
                    </Select>
                </FormControl> : null}
                {studentList.length >0 ? <DownloadIcon onClick={async () => {
                    try {
                        const res = await axiosPrivate.get(`api/teacher/download/summary/${date}`, { responseType: 'blob' });
                        var url = window.URL.createObjectURL(res.data)
                        var dlFile = document.createElement('a')
                        dlFile.href = url
                        dlFile.download = date + '-' + promoName + '.pdf'
                        dlFile.click()
                    } catch (error) {
                        console.log(error);
                    }
                }} /> : null}
            </div>
            <div className="mainBodyStudent">
                {isLoading ? <p>loading</p> : message.length > 0 ? <p className='message'>{message}</p> : <Table striped bordered hover className='studentTable'>
                    <thead>
                        <tr>
                            <th className='firstName' >First Name</th>
                            <th className='lastName' >Last Name</th>
                            <th className='email' >Email</th>
                            <th className='status' >Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getStudentList()}
                    </tbody>
                </Table>}
            </div>
            <Footer />
        </div>
    );

}

export default StudentList;
