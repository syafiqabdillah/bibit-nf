<template>
  <div id="app">
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from "@/fragments/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  text-align: center;
  font-family: "Alata", Helvetica, Arial;
  background-color: #f3e6e3;
  min-height: 100%;
  overflow: hidden;
}
@font-face {
  font-family: "Alata";
  src: url("./assets/fonts/Alata-Regular.ttf") format("truetype");
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-2em);
}
.fade-enter-active, .face-leave-active {
  transition: all .5s ease;
}
</style>
