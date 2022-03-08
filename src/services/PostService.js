import axios from "axios";

const url = "http://localhost:3000/posts/"

class PostService {

    // Get Post 
    static getPosts() {
        return new Promise((resolve, reject) => {
            axios.get(url, { withCredentials: true }).then((res) => {
                resolve(res.data);
            })
                .catch((err) => { reject(err) })
        });
    }
    
    // Create Post
    static insertPost(text, title) {
        return axios.post(url, { text, title })
    }

    // Delete Post 
    static deletePost(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default PostService;