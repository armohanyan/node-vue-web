import axios from "axios";

const url = "http://localhost:8000/";

class AuthRepository {

    static signUp(data) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}sign-up`, data, {
                withCredentials: true
            })
            .then(res => resolve(res))
            .catch(err => reject(err))  
        })
    }

    static signIn(data) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}sign-in`, data, {
                withCredentials: true
            })
            .then( res =>resolve(res))
            .catch(err => reject(err));
        })
    }
}

export default AuthRepository;