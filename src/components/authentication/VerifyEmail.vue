<template>
  <b-container class="pt-4">
    <div v-if="isSuccessVerified">
      <b-row class="mb-3">
        <b-col class="text-center">
          <b-icon
            variant="success"
            icon="check2-circle"
            font-scale="5"
          ></b-icon>

          <div class="mt-3">
            <h5 class="font-weight-bold">Thank you!</h5>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-3 justify-content-center text-center">
        <p class="mx-3 w-100">Your account has been verified</p>
        <div class="mt-3">
          <span
            ><router-link :to="{ name: 'sign-in' }" class="btn-sign-in">
              Login
            </router-link></span
          >
        </div>
      </b-row>
    </div>
    <div v-if="userNotFound">
      <b-row class="mb-3">
        <b-col class="text-center">
          <b-icon
            icon="x-circle"
            scale="2"
            variant="danger"
            font-scale="2"
          ></b-icon>
          <div class="mt-5">
            <h5 class="font-weight-bold">Invalid or expired token</h5>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-3 justify-content-center text-center">
        <div class="mt-3">
          <span
            ><router-link :to="{ name: 'sign-up' }" class="btn-sign-in">
              Register
            </router-link></span>
        </div>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import AuthSerive from "../../services/AuthService";

export default {
  name: "VerifyEmail",
  data() {
    return {
      isSuccessVerified: false,
      userNotFound: false,
    };
  },
  mounted() {
    this.verifyEmail();
  },
  methods: {
    verifyEmail() {
      new AuthSerive()
        .verifyEmail(this.$route.query.email, this.$route.query.token)
        .then(() => this.isSuccessVerified = true)
        .catch(() => this.userNotFound = true);
    },
  },
};
</script>
<style scoped>
.btn-sign-in {
  color: white;
  padding: 10px 20px;
  background-color: #000;
  border-radius: 5px;
}
</style>
