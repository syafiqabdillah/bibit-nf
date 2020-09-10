<template>
  <div class="footer">
      <div id="copyright">
          © 2020, Bantuin Bisnis Teman. 
      </div>
      <div id="contact">
          Developer contact: abdillah.syafiq@gmail.com
      </div>
  </div>
</template>

<script>
export default {
    name: "Footer",
}
// f3e6e3
</script>

<style lang="css" scoped>
.footer {
    background-color: #424874;
    color: white;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 300;
}
#copyright {
    flex-grow: 1;
}
#contact {
    flex-grow: 1;
}
</style>