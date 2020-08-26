<template>
  <div id="nav">
    <b-navbar class="navbar" toggleable="sm" type="dark">
      <b-navbar-toggle
        class="navbar-toggle"
        target="nav-collapse"
      ></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/">Beranda</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/login">Login</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
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

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
