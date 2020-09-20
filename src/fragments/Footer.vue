<template>
  <div class="footer" :style="'background-color:' + colors.primary">
    <div id="copyright">
      © 2020, Bantuin Bisnis Teman.
    </div>
    <div id="contact">
      Developer contact: abdillah.syafiq@gmail.com
    </div>
  </div>
</template>

<script>
import { colorPalette } from "../config"
export default {
  name: "Footer",
  computed: {
    colors() {
      return colorPalette
    }
  }
};
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
  font-size: 0.75rem;
  padding-top: 4px;
  padding-bottom: 4px;
}
#copyright,
#contact {
  flex-grow: 1;
}

@media (max-width: 480px) {
  .footer {
    flex-direction: column;
  }
}
</style>
