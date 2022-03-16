<template>
  <div class="container-fluid mt-4">
    <main role="main">
      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Posts</h1>
          <p class="lead text-muted">
            You can create your own post !
          </p>
          <p>
            <router-link :to="{name: 'create'}" class="btn btn-primary my-2">Create</router-link>
          </p>
        </div>
      </section>

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div v-for="(post, index) in posts" :key="index" class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img
                  class="card-img-top"
                  data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                  alt="Thumbnail [100%x225]"
                  style="height: 225px; width: 100%; display: block"
                  src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17ef2076128%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17ef2076128%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.7265625%22%20y%3D%22120.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                  data-holder-rendered="true"
                />
                <div class="card-body">
                  <h4>{{ post.title  }}</h4>
                  <p class="card-text">
                    {{ post.body }}
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-danger  "
                      >
                        delete
                      </button>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import PostService from "../../services/PostService";
import moment from "moment";
import AccountService from '@/services/AccountService';

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
      title: "",
    };
  },
  computed: {
    getCurrentProfile(){
      return this.$store.getters.getCurrentUser;
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
      console.log(this.posts);
    } catch (error) {
      this.error = error.message;
    }
  },
  mounted() {
    new AccountService().current();
  },
  methods: {
    moment,
    async createPost() {
      await PostService.insertPost(this.text, this.title);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
  },
};
</script>
<style scoped>
body {
  background: #f4f4f4;
}

.banner {
  background: #a770ef;
  background: -webkit-linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b);
  background: linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b);
}
</style>
