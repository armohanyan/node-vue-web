<template>
  <div class="container-fluid mt-4 w-50 mt-5">
    <h4>Create post</h4>
    <!-- title -->
    <div class="form-group mt-3">
      <label for="exampleInputEmail1">title</label>
      <b-form-input
          id="title-live-feedback"
          v-model="$v.title.$model"
          :state="validateState('title')"
          placeholder="title"
      ></b-form-input>

      <b-form-invalid-feedback id="title-live-feedback"
      >This is a required field and must be at least 3
        characters.
      </b-form-invalid-feedback
      >
    </div>
    <!-- description -->
    <div class="form-group mt-2">
      <label for="exampleInputPassword1">description</label>
      <b-form-input
          id="body-live-feedback"
          v-model="$v.body.$model"
          :state="validateState('body')"
          placeholder="description"
      ></b-form-input>
      <b-form-invalid-feedback id="body-live-feedback"
      >This is a required field and must be at least 5
        characters.
      </b-form-invalid-feedback
      >
    </div>
    <!-- file -->
    <div class="custom-file mt-2">
      <b-form-file
          id="body-live-feedback"
          v-model="FILE"
          ref="file"
          :state="validateState('FILE')"
          class="mt-3"
          plain
          @change="handleFileUpload"
      ></b-form-file>
      <b-form-invalid-feedback id="body-live-feedback"
      >This is a required field
      </b-form-invalid-feedback>
    </div>
    <div v-if="error" class="mt-3 text-center">
      <small class="text-danger">{{error}}</small>
    </div>
    <div class="mt-3 text-center">
      <button @click="onSubmit()" class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import PostService from '@/services/PostService';
import { validationMixin } from 'vuelidate';
import moment from 'moment';

export default {
  name: 'CreatePostComponent',
  mixins: [validationMixin],
  data() {
    return {
      title: '',
      body: '',
      FILE: [],
      error: ''
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(3)
    },
    body: {
      required,
      minLength: minLength(6)
    },
    FILE: {
      required
    }
  },
  methods: {
    moment,
    validateState(name) {
      const { $dirty, $error } = this.$v[name];
      return $dirty ? !$error : null;
    },
    handleFileUpload() {
      this.FILE = this.$refs.file.files[0];
    },
    onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      this.createPost();
    },
    createPost() {
      let formData = new FormData();

      formData.append('file', this.FILE);
      formData.append('title', this.title);
      formData.append('body', this.body);

      new PostService().create(formData)
                       .then(() => {
                         this.$router.push({ name: 'home' });
                       })
                       .catch(err => {
                         const error = err.response.data;

                         if (error.message) {
                           this.error = error.message
                         } else {
                           this.error = `${error.validationError.property}:  ${error.validationError.message}`
                         }

                         throw err;
                       });

    }
  }
};
</script>

<style scoped>
</style>
