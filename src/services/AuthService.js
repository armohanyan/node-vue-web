import axios from "axios";

const url = "http://localhost:3000/";

class AuthService {

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
                .then(res => {
                    localStorage.accesToken = res.data.data.token;
                    resolve(res);
                })
                .catch(err => reject(err));
        })
    }

    verifyEmail(confirmationToken) {
        return new Promise((resolve, reject) => {
            axios.get(`${url}verify-email`, {
                    params: {
                        confirmationToken
                    }
                })  
                .then(res => resolve(res))
                .catch(err => reject(err))
        });
    }
}

export default AuthService;