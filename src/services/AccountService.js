import axios from 'axios';

const url = 'http://localhost:3000/api/account/';

class AccountService {

  current() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}current`, {
        withCredentials: true
      })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }
}

export default AccountService;
