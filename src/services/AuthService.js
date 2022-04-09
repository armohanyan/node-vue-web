import axios from 'axios';
import Cookie from 'js-cookie';

const url = 'api/auth/';

class AuthService {

  signUp(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}sign-up`, data, {
        withCredentials: true
      })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

  signIn(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}sign-in`, data, {
        withCredentials: true
      })
           .then(res => {
             Cookie.set("accessToken", res.data.data.token, { expires: 1 });
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
           .then(res   => resolve(res))
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

  requestVerifyEmail(data) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}request-verify-email`, data, {
        withCredentials: true
      })
           .then(res =>  resolve(res))
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
