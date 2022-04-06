<template>
  <b-container class="mt-5 w-25">
    <div v-if="!showSuccessScreen && !isRouteResetPassword">
      <div class="text-center"><h3>Forgot Password</h3></div>
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

        <div>
          <small class="text-danger" v-if="error">
            Incorrect email
          </small>
        </div>
        <div class="mt-4 text-center">
          <b-button variant="primary" @click="onSubmit">Submit</b-button>
        </div>
      </b-form-group>
      <div>
        <router-link :to="'/sign-in'" class="text-primary btn">Sign in</router-link>
      </div>
      <div>
        <router-link :to="'/sign-up'" class="text-primary btn">Sign up</router-link>
      </div>
    </div>

    <div v-if="showSuccessScreen">
      <b-row class="mb-3">
        <b-col class="text-center">
          <b-icon
              variant="success"
              icon="check2-circle"
              font-scale="5"
          ></b-icon>
        </b-col>
      </b-row>
      <b-row class="mb-3 justify-content-center text-center fs-1_2">
        <p class="mx-3 w-100">
          Verification email has been sent
          to your registered email address.
        </p>
        <p class="mx-3 w-100">
          <b
          >Please click on the verification link included in the resend password.</b
          >
        </p>
      </b-row>
      <div class="text-center">
        <em class="font-weight-bold">Resend email token <span v-if="isDisableResendButton">{{
            currentTimer
          }}</span>
        </em>
        <p>
          <b-button v-if="!isDisableResendButton" size="sm" variant="primary" @click="resendToken()">Resend</b-button>
          <b-button v-if="isDisableResendButton" disabled size="sm">Resend</b-button>
        </p>
      </div>
    </div>
    <div v-if="isRouteResetPassword">
      <div class="text-center"><h3>Reset Password</h3></div>
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
      </b-form-group>
      <b-form-group
          id="confirmPassword"
          label="confirm password"
          label-for="confirmPassword"
          class="mt-3"
      >
        <b-form-input
            id="confirmPassword"
            v-model="$v.form.confirmPassword.$model"
            :state="validateState('confirmPassword')"
            type="password"
            placeholder="confirm password"
        ></b-form-input>

        <b-form-invalid-feedback id="confirmPassword">
          <span v-if="!$v.form.confirmPassword.required">
            This is a required field.
          </span>
          <span v-else-if="!$v.form.confirmPassword.sameAsPassword">
              Password does not match
          </span>
        </b-form-invalid-feedback>
      </b-form-group>
      <div>
        <small class="text-danger" v-if="error">
          {{ error }}
        </small>
      </div>
      <div class="mt-4 text-center">
        <b-button variant="primary" @click="onSubmitResetPassword">Reset</b-button>
      </div>
      <div>
        <router-link :to="'/sign-in'" class="text-primary btn">Sign in</router-link>
      </div>
    </div>
  </b-container>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import AuthService from '../../services/AuthService'
import { validationMixin } from 'vuelidate'

export default {
  mixins: [validationMixin],
  data () {
    return {
      showSuccessScreen: false,
      isRouteResetPassword: false,
      error: null,
      form: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      isDisableResendButton: true,
      currentTimer: '',
      minute: 1,
      sec: 60
    }
  },
  validations: {
    form: {
      email: { required, email, minLength: minLength(5) },
      password: { required, minLength: minLength(1) }, // for testing backend validation
      confirmPassword: { required, sameAsPassword: sameAs('password') }
    },
  },
  watch: {
    form: {
      handler () {
        this.error = null
      },
      deep: true,
    },
  },
  mounted () {
    if (this.$route.name === 'reset-password') this.isRouteResetPassword = true
  },
  methods: {
    validateState (name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onSubmit (event) {
      event.preventDefault()
      if (this.$v.form.email.$invalid) {
        this.$v.$touch()
        return false
      } else {
        this.requestResendPassword()
      }
    },
    onSubmitResetPassword (event) {
      event.preventDefault()
      if (this.$v.form.confirmPassword.$invalid) {
        this.$v.$touch()
        return false
      } else {
        this.ResetPassword()
      }
    },
    requestResendPassword () {
      new AuthService().requestResendPassword(this.form.email)
          .then(() => {
              this.setTimer()
              this.showSuccessScreen = true
          })
          .catch(err => {
            this.error = true
            throw err
          })
    },
    ResetPassword () {
      new AuthService().resetPassword(this.$route.query.email, this.form.password, this.$route.query.token)
          .then(() => {
            this.$router.push({ name: 'sign-in' })
          })
          .catch(err => {
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
