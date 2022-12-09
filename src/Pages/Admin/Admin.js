import React, { useState, useEffect } from "react";
import "./Admin.css"
import StudentListEditable from "../../Components/StudentListEditable/StudentListEditable";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";


const Admin = () => {

    const [canDisplay, setCanDisplay] = useState(false)
    const [studentList, setStudentList ] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {

         const getStudentList = async () => {
            try {
                const res = await axiosPrivate.get("api/teacher/getMyPromo");
                setStudentList(res.data.payload_student_list);
                setCanDisplay(true)
            } catch (error) {
                if (error.message === "Network") {
                    setErrorMessage( "Error with the API while trying get teacher promo.");
                } else {
                    setErrorMessage(error.message);
                }
                setCanDisplay(false)
            }
        }
        
        getStudentList();

    }, []);

    return (
        <div>
            {canDisplay ?<StudentListEditable data={studentList} />: <p>{errorMessage}</p>}
        </div>
    );

}

export default Admin;
