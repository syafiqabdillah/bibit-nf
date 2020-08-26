<template>
  <div id="app">
    <Navbar />
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
  font-family: "Alata", Helvetica, Arial;
  background-color: #f3e6e3;
  height: 100%;
}
@font-face {
  font-family: "Alata";
  src: url("./assets/fonts/Alata-Regular.ttf") format("truetype");
}
html, body {
  height: 100%;
}
</style>
