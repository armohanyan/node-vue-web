<template>
  <b-container class="mt-5 w-25">
    <div v-if="!showSuccessScreen">
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
          <small class="text-danger" v-if="error">
            {{ error }}
          </small>
        </b-form-group>

        <!-- submit -->
        <div class="mt-4 text-center">
          <b-button type="submit" variant="primary">Submit</b-button>
        </div>
      </b-form>
      <router-link :to="'/sign-in'">Sign in</router-link>
    </div>
    <div v-if="showSuccessScreen">
      <b-row class="mb-3">
        <b-col class="text-center">
          <b-icon
              variant="success"
              icon="check2-circle"
              font-scale="5"
          ></b-icon>

          <div class="mt-3">
            <h5 class="font-weight-bold">You're all set!</h5>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-3 justify-content-center text-center fs-1_2">
        <p class="mx-3 w-100">
          Your account has been created and a verification email has been sent
          to your registered email address.
        </p>
        <p class="mx-3 w-100">
          <b
          >Please click on the verification link included in the email to
            verify your account.</b
          >
        </p>
      </b-row>
      <div class="text-center">
        <em class="font-weight-bold">Resend email token <span v-if="isDisableResendButton">{{
            currentTimer
          }}</span></em>
        <p>
          <b-button v-if="!isDisableResendButton" size="sm" variant="primary" @click="resendToken()">Resend</b-button>
          <b-button v-if="isDisableResendButton" disabled size="sm">Resend</b-button>
        </p>
      </div>
    </div>
  </b-container>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import AuthService from '../../services/AuthService'

export default {
  mixins: [validationMixin],
  data () {
    return {
      error: null,
      showSuccessScreen: false,
      form: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      },
      isDisableResendButton: true,
      currentTimer: '',
      minute: 1,
      sec: 60
    }
  },
  watch: {
    form: {
      handler () {
        this.error = null
      },
      deep: true,
    },
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
    validateState (name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onSubmit (event) {
      event.preventDefault()
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      } else {
        this.createUser()
      }
    },
    createUser () {
      new AuthService().signUp(this.form)
          .then(() => {
              this.setTimer()
              this.showSuccessScreen = true
          })
          .catch((err) => {
            const error = err.response.data
            if (error.message) {
              this.error = error.message
            } else {
              this.error = `${error.validationError.property}:  ${error.validationError.message}`
            }

            throw err
          })
    },
    resendToken () {
      new AuthService().resendToken(this.form.email)
      this.isDisableResendButton = true
      this.currentTimer = ''
      this.minute = 1
      this.sec = 60
    },
    setTimer () {
      setInterval(() => {
        if(this.sec <= 10) {
          this.currentTimer = this.minute + ' : ' + "0" + this.sec;
        } else {
          this.currentTimer = this.minute + ' : ' + this.sec;
        }

        if (this.sec !== 0) {
          this.sec--
          if (this.sec === 0 && this.minute !== 0) {
            this.minute--
            this.sec = 60
          }
        } else {
          this.isDisableResendButton = false
        }
      }, 1000)
    }
  },
}
</script>
