<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/fragments/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  text-align: center;
}
@font-face {
  font-family: "Alata";
  src: url("./assets/fonts/Alata-Regular.ttf") format("truetype");
}
</style>
