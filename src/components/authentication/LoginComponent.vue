<template>
  <b-container class="mt-5 w-25">
    <!-- Content here -->
    <b-form @submit="onSubmit">

      <!-- email -->
      <b-form-group id="email" label="email" label-for="input-1">
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          type="text"
          placeholder="email"
        ></b-form-input>

        <b-form-invalid-feedback id="email">
          <span v-if="!$v.form.email.required">
            This is a required field.
          </span>
          <span v-else-if="!$v.form.email.minLength">
            Must be at least 5 characters
          </span>
          <span v-else> This field is only for email ! </span>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- password -->
      <b-form-group
        id="password"
        label="Password"
        label-for="password"
        class="mt-3"
      >
        <b-form-input
          id="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          placeholder="password"
        ></b-form-input>

        <b-form-invalid-feedback id="password">
          <span v-if="!$v.form.password.required">
            This is a required field.
          </span>
          <span v-else-if="!$v.form.password.minLength">
            Must be at least 6 characters
          </span>
        </b-form-invalid-feedback>
      </b-form-group> 

      <!-- submit -->
      <div class="mt-4 text-center">
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import AuthRepository from "../../repositories/AuthReposotory";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
        minLength: minLength(5),
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit(event) {
      event.preventDefault();
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      } else {
        this.createUser();
      }
    },
    createUser(){
      console.log(this.form);
       AuthRepository.signUp(this.form).then( () => {
         console.log("success");
       })
       .catch( err => {
         console.log(err);
       })
    }
  },
};
</script>