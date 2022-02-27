<template>
  <b-container class="mt-5 w-25">
    <div class="text-center"><h3>Sign up</h3></div>
    <b-form @submit="onSubmit">
      <!-- firstname -->
      <b-form-group
        id="firstname"
        label="firstname"
        label-for="firstname"
        class="mt-3"
      >
        <b-form-input
          id="firstname"
          v-model="$v.form.firstName.$model"
          :state="validateState('firstName')"
          type="text"
          placeholder="firstname"
        ></b-form-input>

        <b-form-invalid-feedback id="firstname">
          <span v-if="!$v.form.firstName.required">
            This is a required field.
          </span>
          <span v-else-if="!$v.form.firstName.minLength">
            Must be at least 3 characters
          </span>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- lastname -->
      <b-form-group
        id="lastname"
        label="lastname"
        label-for="lastname"
        class="mt-3"
      >
        <b-form-input
          id="lastname"
          v-model="$v.form.lastName.$model"
          :state="validateState('lastName')"
          type="text"
          placeholder="lastname"
        ></b-form-input>

        <b-form-invalid-feedback id="lastname">
          <span v-if="!$v.form.lastName.required">
            This is a required field.
          </span>
          <span v-else-if="!$v.form.lastName.minLength">
            Must be at least 3 characters
          </span>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- email -->
      <b-form-group id="email" label="email" label-for="email" class="mt-3">
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
        </b-form-invalid-feedback>
        <small class="text-danger" v-if="errors.email">
          {{ errors.email }}
        </small>
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
          type="password"
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
        <small class="text-danger" v-if="errors.password">
          {{ errors.password }}
        </small>
      </b-form-group>

      <!-- submit -->
      <div class="mt-4 text-center">
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
    <router-link :to="'/sign-in'">Sign in</router-link>
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
      errors: [],
      form: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
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
        minLength: minLength(1), // This is just for testing the backend validation !!
      },
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
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
    createUser() {
      AuthRepository.signUp(this.form)
        .then(({ data }) => {
          if (data.errors) {
            this.errors = data.errors;
            console.log(this.errors);
          } else {
            this.$router.push({ name: "sign-in" });
          }
        })
        .catch((err) => {
          throw err;
        });
    },
  },  
};
</script>