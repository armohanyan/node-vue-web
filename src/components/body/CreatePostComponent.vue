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
        characters.</b-form-invalid-feedback
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
        characters.</b-form-invalid-feedback
      >
    </div>
    <!-- file -->
    <div class="custom-file mt-2">
      <b-form-file
        id="body-live-feedback"
        v-model="file"
        :state="validateState('file')"
        class="mt-3"
        @change="file = $event.target.file"
      ></b-form-file>
      <b-form-invalid-feedback id="body-live-feedback"
        >This is a required field</b-form-invalid-feedback
      >
    </div>
    <div class="mt-3 text-center">
      <button @click="createPost()" class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>

<script>
// import PostService from "../../PostServer";
import { required, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import moment from "moment";

export default {
  name: "CreatePostComponent",
  mixins: [validationMixin],
  data() {
    return {
      title: "",
      body: "",
      file: [],
      error: "",
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(3),
    },
    body: {
      required,
      minLength: minLength(6),
    },
    file: {
      required,
    },
  },

  methods: {
    moment,
    validateState(name) {
      const { $dirty, $error } = this.$v[name];
      return $dirty ? !$error : null;
    },
    createPost() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
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
