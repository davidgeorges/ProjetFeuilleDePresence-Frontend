import React, { useState, useEffect } from "react";
import "./Teacher.css"
import StudentList from "../../Components/StudentList/StudentList";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";


const Teacher = () => {

    const [canDisplay, setCanDisplay] = useState(false)
    const [studentList, setStudentList ] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {

        const getStudentList = async () => {
            try {
                //Get the teacher promo
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
            {canDisplay ?<StudentList data={studentList} />: <p>{errorMessage}</p>}
        </div>
    );

}

export default Teacher;
