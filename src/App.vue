<template>
  <div id="app">
     <header-component v-if="getCurrentUser"/>
      <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/header/HeaderComponent.vue';

export default {
  name: 'App',
  components: { HeaderComponent },
  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser;
    }
  },

  mounted() {
    if(!this.$cookies.get("accessToken")) this.$store.dispatch("setCurrentUser", null);
  }

}
</script>

<style>
</style>
