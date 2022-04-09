import axios from 'axios';
import Cookie from 'js-cookie';

const url = 'api/account/';

class AccountService {

  getCurrent() {
    return new Promise((resolve, reject) => {
      if(Cookie.get('accessToken')) {
        this.get()
            .then(account => {
              resolve(account);
            })
            .catch(err => {
              this.reset();
              reject(err);
            });
      } else {
        this.reset();
        reject()
      }
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}current`, {
        withCredentials: true
      })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

  reset() {
    Cookie.remove("accessToken")
  }
}



export default AccountService;
