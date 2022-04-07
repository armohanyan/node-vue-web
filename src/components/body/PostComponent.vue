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
            <div v-for="(post) in posts" :key="post.id" class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img
                    class="card-img-top"
                    data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                    alt="Thumbnail [100%x225]"
                    style="height: 225px; width: 100%; display: block"
                    :src="imagePath(post.img)"
                    data-holder-rendered="true"
                />
                <div class="card-body">
                  <h4>{{ post.title }}</h4>
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
                          @click="viewPost(post.id)"
                      >
                        View
                      </button>
                      <div v-if="getCurrentUser.role === 'admin'">
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                            @click="onEditPassword(post.id)"
                        >
                          Edit
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click="deletePost(post.id)"
                        >
                          delete
                        </button>
                      </div>
                    </div>
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
import PostService from '../../services/PostService';
import moment from 'moment';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
      title: ''
    };
  },
  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser;
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    moment,
    getPosts() {
      new PostService().getPosts()
                       .then((response) => {
                         this.posts = response.data.data.posts;
                       })
                       .catch(error => {
                         throw error;
                       });
    },
    deletePost(id) {
      new PostService().delete(id)
                       .then(() => {
                         this.getPosts();
                       })
                       .catch(error => {
                         throw error;
                       });
    },
    onEditPassword(id) {
      this.$router.push({ name: 'update-post', params: { id } });
    },
    viewPost(id) {
      this.$router.push({ name: 'show', params: { id } });
    },
    imagePath(image) {
      if(image) {
        return process.env.VUE_APP_SERVER_URL + 'images/' + image;
      }

      return 'https://themesfinity.com/wp-content/uploads/2018/02/default-placeholder.png';
    }

  }
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
