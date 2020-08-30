<template>
  <div id="nav">
    <b-navbar class="navbar" toggleable="sm" type="dark">
      <b-navbar-toggle
        class="navbar-toggle"
        target="nav-collapse"
      ></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="greetings" v-if="isLoggedIn()">
            <router-link to="/profile">Halo, {{ nama }}</router-link>
          </b-nav-item>

          <b-nav-item v-if="isLoggedIn()">|</b-nav-item>

          <b-nav-item>
            <router-link to="/">Beranda</router-link>
          </b-nav-item>

          <b-nav-item v-if="!isLoggedIn()">
            <router-link to="/register">Register</router-link>
          </b-nav-item>

          <b-nav-item v-if="!isLoggedIn()">
            <router-link to="/login">Login</router-link>
          </b-nav-item>

          <b-nav-item v-on:click="logout" v-else>
            Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {
  getCookie,
  checkCookie,
  parseJwt,
  setCookie,
  isLoggedIn,
} from "../mixins/index";
export default {
  name: "Navbar",
  computed: {
    nama() {
      if (isLoggedIn()) {
        return parseJwt(getCookie("token"))["nama"];
      }
    },
  },
  methods: {
    logout() {
      setCookie("token", "", new Date());
      location.href = "/";
    },
    isLoggedIn() {
      return isLoggedIn();
    }
  },
};
</script>

<style scoped>
#nav {
  background-color: #424874;
  color: white;
}
#nav a {
  font-weight: normal;
  color: #c3aed6;
}

#nav a:hover {
  color: #dea5a4;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
.greetings {
  color: #f3e6e3;
}
</style>
