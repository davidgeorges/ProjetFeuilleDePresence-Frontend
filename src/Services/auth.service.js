import axios from "axios";

const validateFormValue = (loginReceive) => {

    const anyError = {
        loginMessage: "",
        passwordMessage: "",
    };
    
    //Regex email and password
    const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const regexPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}$/);

    //Regex check
    if (!regexEmail.test(loginReceive.email)) {
        anyError.loginMessage = "Please complete this field.";
    } else {
        if (!regexPassword.test(loginReceive.password)) {
        anyError.passwordMessage = "Please complete this field with 8-40 alphanumeric characters.";
        }
    }

    return anyError;

}

export const login = async (loginReceive) => {

    return new Promise(async (resolve, reject) => {
        
        const error = {
            message: ""
        }

        //First check if the data are valid
        const anyError = validateFormValue(loginReceive);
        
        //If data are valid
        if (anyError.loginMessage.length <= 0 && anyError.passwordMessage.length <= 0) {

            //Check if the login credentials are good
            try {

                const res = await axios.post("http://localhost:8000/api/auth/login", loginReceive,{withCredentials: true});
                resolve(res);

            } catch (err) {

                if(err.message === 'Network Error'){
                    error.message = "Error with the API while trying to connect.";
                }else{
                    error.message = err.response.data.message;
                }
                reject(error);
            }

        }
        reject(anyError);
    });
}

export const logout = async () => {

    return new Promise(async (resolve, reject) => {

        const error = {
            message: ""
        }

        try {

            const res = await axios.post("http://localhost:8000/api/auth/logout", null, { withCredentials: true });
            resolve(res);

        } catch (err) {

            if (err.message === 'Network Error') {
                error.message = "Error with the API while trying to disconnect.";
            } else {
                error.message = err.response.data.message;
            }
            reject(error);
        }

    });
}
