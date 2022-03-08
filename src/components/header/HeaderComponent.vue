<template>
  <div>
    <b-navbar type="dark" variant="dark" class="pl-2">
      <b-navbar-nav class="mx-auto w-75">
        <b-nav-item v-for="(page, index) in pages" :key="index" :to="page">{{
          page.label
        }}</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="mx-auto">
        <b-nav-form class="search">
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit"
            >Search</b-button
          >
        </b-nav-form>
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
        { name: "create", label: "Create" },
        { name: "about", label: "About" },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("setCurrentUser", null);
      localStorage.removeItem("accesToken");
      this.$router.push({ name: "sign-in"})
    },
  },
};
</script> 
<style scoped>
.search form {
  display: flex;
}
</style>