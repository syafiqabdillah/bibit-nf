<template>
  <div id="nav">
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>Bantu Bisnis Teman</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <router-link to="/">Home</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/about">About</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
#nav a {
  font-weight: bold;
  color: #50A3B9;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
