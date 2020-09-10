<template>
  <div id="app">
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/fragments/Navbar.vue";
import Footer from "@/fragments/Footer.vue"
export default {
  components: {
    Navbar,
    Footer
  },
  beforeCreate() {
    if (location.protocol != "https:" && process.env.NODE_ENV == "production") {
      location.href =
        "https:" +
        window.location.href.substring(window.location.protocol.length);
    }
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
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
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-2em);
}
.fade-enter-active,
.face-leave-active {
  transition: all 0.5s ease;
}
</style>
