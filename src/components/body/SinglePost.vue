<template>
  <b-container>
    <div class="w-100 mt-5">
      <b-img :src="imagePath(post.img)" width="800px"/>
    </div>
    <div class="mt-3">
      <div class="mt-4">
        <h3>{{ post.title }}</h3>
      </div>
      <div>
        {{ post.body }}
      </div>
    </div>

  </b-container>
</template>

<script>
import PostService from '@/services/PostService';

export default {
  name: 'SinglePost',
  data(){
    return {
     post: {}
    }
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      new PostService().getPost(this.$route.params.id)
                       .then(({ data }) => {
                         this.post = data.data.post;
                       })
                       .catch(error => {
                         throw error;
                       });
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

</style>
