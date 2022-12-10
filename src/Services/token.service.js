import axios from "axios";

export const refreshToken = async () => {
    return new Promise(async (resolve, reject) => {
       
        try {

            const res = await axios.get('http://localhost:8000/api/auth/refreshToken',{withCredentials: true});
            resolve(res);

        } catch (error) {

            reject(error);
            
        }

    });
}