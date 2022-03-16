<template>
  <b-container class="mt-5 w-25">
    <scale-loader class="custom-class" :color="'#212529'" :loading="loading" :width="5" :height="17" sizeUnit="px"></scale-loader>

    <div>
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
      <div>
        <router-link :to="'/sign-up'" class="text-primary btn">Sign up</router-link>
        <p>
          <router-link :to="'/on-reset-password'" class="text-primary btn">Forgot Password</router-link>
        </p>
      </div>
    </div>
  </b-container>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import AuthService from '../../services/AuthService'
import { ScaleLoader } from '@saeris/vue-spinners'
import { validationMixin } from 'vuelidate'

export default {
  mixins: [validationMixin],
  components: {
    ScaleLoader
  },
  data () {
    return {
      error: null,
      loading: false,
      form: {
        email: '',
        password: '',
      },
    }
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
        minLength: minLength(1),
      },
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
  methods: {
    validateState (name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      } else {
        this.login()
      }
    },
    login () {
      AuthService.signIn(this.form)
          .then(({ data }) => {
            if (data.success) {
              this.$store.dispatch('setCurrentUser', data.data.user);
              this.$router.push({ name: 'home' })
            } else {
              return
            }
          })
          .catch((err) => {
            const error = err.response.data.validationError
            if (err.response.data.message) {
              this.error = err.response.data.message
            } else {
              this.error = `${error.property}:  ${error.message}`
            }
            throw err
          })
    }
  },
}
</script>
