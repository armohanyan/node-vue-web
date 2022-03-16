import axios from "axios";

const url = "http://localhost:3000/api/posts/"

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
}

export default PostService;
