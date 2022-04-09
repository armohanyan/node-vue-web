<template>
  <b-container class="mt-5 w-25">
    <div v-if="!isShowVerifyEmailContent">
      <div class="text-center"><h3>Sign in</h3></div>
      <b-form @submit.prevent="onSubmit">
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
        </b-form-group>
        <div>
          <small class="text-danger" v-if="error">
            {{ error }}
          </small>
        </div>
        <div class="mt-4 text-center">
          <b-button type="submit" variant="primary">Submit</b-button>
        </div>
      </b-form>
    </div>

    <div v-if="isShowVerifyEmailContent && !showEmailVerificationMessage">
      <div class="text-center"><h3>Email verification</h3></div>
      <b-form @submit.prevent="onEmailVerification">
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
          </b-form-invalid-feedback>
          <div>
            <small class="text-danger" v-if="emailVerificationErrorMessage">
              {{ emailVerificationErrorMessage }}
            </small>
          </div>
        </b-form-group>

        <div class="mt-4 text-center">
          <b-button type="submit" variant="primary">Submit</b-button>
        </div>
      </b-form>
    </div>
    <div v-if="showEmailVerificationMessage">
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
        <em class="font-weight-bold">Resend email token <span v-if="isDisableResendButton">
            {{ currentTimer }}
          </span>
        </em>
        <p>
          <b-button v-if="!isDisableResendButton" size="sm" variant="primary" @click="resendToken()">Resend</b-button>
          <b-button v-if="isDisableResendButton" disabled size="sm">Resend</b-button>
        </p>
      </div>
    </div>
    <div>
      <div v-if="isShowVerifyEmail">
        <b-button variant="primary" @click="onVerifyEmail()">Verify account</b-button>
      </div>
      <router-link :to="'/sign-up'" class="text-primary btn">Sign up</router-link>
      <p>
        <router-link :to="'/on-reset-password'" class="text-primary btn">Forgot Password</router-link>
      </p>
    </div>

  </b-container>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import AuthService from '../../services/AuthService';
import { validationMixin } from 'vuelidate';

export default {
  mixins: [validationMixin],
  data() {
    return {
      error: null,
      loading: false,
      isShowVerifyEmail: false,
      isShowVerifyEmailContent: false,
      showEmailVerificationMessage: false,
      emailVerificationErrorMessage: '',
      form: {
        email: '',
        password: ''
      },
      isDisableResendButton: true,
      currentTimer: '',
      minute: 1,
      sec: 60
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
        minLength: minLength(5)
      },
      password: {
        required,
        minLength: minLength(1)
      }
    }
  },
  watch: {
    form: {
      handler() {
        this.error = null;
      },
      deep: true
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return false;
      } else {
        this.login();
      }
    },
    onEmailVerification() {
      if(this.$v.form.email.$invalid) {
        this.$v.$touch();
        return false;
      }
      this.requestVerifyEmail();
    },
    login() {
      new AuthService().signIn(this.form)
                       .then(({ data }) => {
                         this.$store.dispatch('setCurrentUser', data.data.user);
                         this.$router.push({ name: 'home' });
                       })
                       .catch((err) => {
                         const data = err.response.data;

                         if(data.statusCode === 401) {
                           return this.isShowVerifyEmail = true;
                         }

                         if(data.message) {
                           this.error = data.message;
                         } else {
                           this.error = `${data.validationError.property}:  ${data.validationError.message}`;
                         }
                         throw err;
                       });
    },
    requestVerifyEmail() {
      new AuthService().requestVerifyEmail({ email: this.form.email })
                       .then(() => {
                         this.showEmailVerificationMessage = true;
                         this.setTimer();
                       })
                       .catch((err) => {
                         this.emailVerificationErrorMessage = err.response.data.message;
                         throw err;
                       });
    },
    onVerifyEmail() {
      this.isShowVerifyEmailContent = true;
      this.isShowVerifyEmail = false;
    },
    resendToken() {
      new AuthService().resendToken(this.form.email);
      this.isDisableResendButton = true;
      this.currentTimer = '';
      this.minute = 1;
      this.sec = 60;
    },
    setTimer() {
      setInterval(() => {
        if(this.sec <= 10) {
          this.currentTimer = this.minute + ' : ' + "0" + this.sec;
        } else {
          this.currentTimer = this.minute + ' : ' + this.sec;
        }

        if(this.sec !== 0) {
          if(this.sec === 0 && this.minute !== 0) {
            this.minute--;
            this.sec = 60;
          }
        } else {
          this.isDisableResendButton = false;
        }
      }, 1000);
    }
  }
};
</script>
