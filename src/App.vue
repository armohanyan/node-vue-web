<template>
  <div id="app">  
      <index-component />
      <router-view></router-view>
  </div>
</template>

<script>
// import M ainComponent from './components/MainComponent.vue'
import IndexComponent from './components/header/IndexComponent.vue';


export default {
  name: 'App',
  components: { IndexComponent },

}
</script>

<style>
</style>
