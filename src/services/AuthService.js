import axios from 'axios';

const url = 'http://localhost:3000/api/auth/';

class AuthService {

  static signUp(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}sign-up`, data, {
        withCredentials: true
      })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

  static signIn(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}sign-in`, data, {
        withCredentials: true
      })
           .then(res => {
             resolve(res);
           })
           .catch(err => reject(err));
    });
  }

  verifyEmail(email, token) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}verify-email`, {
        email,
        token
      })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

  resendToken(email) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}resend-token`, {
        email
      })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

  requestResendPassword(email) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}request-reset-password`, {
        email
      })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

  resetPassword(email, password, token) {
    console.log(token);
    return new Promise((resolve, reject) => {
      axios.post(`${url}reset-password`,
        {
          email,
          password
        },
        {
          headers: {
            authorization: 'Bearer ' + token
          }
        })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }
}

export default AuthService;
