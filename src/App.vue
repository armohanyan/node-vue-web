<template>
  <div id="app">  
     <header-component />
      <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/header/HeaderComponent.vue';


export default {
  name: 'App',
  components: { HeaderComponent }
}
</script>

<style>
</style>
