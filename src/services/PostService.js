import axios from 'axios';

const url = 'api/posts';

class PostService {

  getPosts() {
    return new Promise((resolve, reject) => {
      axios.get(url,
        { withCredentials: true })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

  getPost(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/show/${id}`,
        { withCredentials: true })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

  create(formData) {
    return new Promise((resolve, reject) => {
      axios.post(
        url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      )
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      axios.delete(url, {
        data: { id },
        withCredentials: true
      })
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

  update(formData) {

    return new Promise((resolve, reject) => {
      axios.put(
        url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      )
           .then(res => resolve(res))
           .catch(err => reject(err));
    });
  }

}

export default PostService;
