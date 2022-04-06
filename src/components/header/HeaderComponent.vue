<template>
  <div>
    <b-navbar type="dark" variant="dark" class="pl-2">
      <b-navbar-nav class="mx-auto w-75">
        <b-nav-item v-for="(page, index) in pages" :key="index" :to="page">
          {{ page.label }}</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="mx-auto">
        <b-nav-item @click="logout()">Log out</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "IndexComponent",
  data() {
    return {
      pages: [
        { name: "home", label: "Home" },
        { name: "create", label: "Create" }
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("setCurrentUser", null);
      this.$cookies.remove("accessToken");
      this.$router.push({ name: "sign-in"});
    },
  },
};
</script>
<style scoped>
.search form {
  display: flex;
}
</style>
