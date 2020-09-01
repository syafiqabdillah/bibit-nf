<template>
  <div>
    <h4>{{ nama }}</h4>
    <p>{{ alamat }}</p>
    <p>
      <b-icon icon="telephone-fill"></b-icon>
      <span id="nohp">
        {{ nohp }}
      </span>
    </p>
    <div class="social-media">
      <div id="tokopedia" v-if="tokopediaValid(tokopedia)">
        <img
          v-on:click="open(tokopedia)"
          class="logo"
          :src="imgTokopedia"
          alt="tokopedia logo"
        />
      </div>
      <div id="shopee" v-if="shopeeValid(shopee)">
        <img
          v-on:click="open(shopee)"
          class="logo"
          :src="imgShopee"
          alt="shopee logo"
        />
      </div>
      <div id="instagram" v-if="instagramValid(instagram)">
        <img
          v-on:click="open(instagram)"
          class="logo"
          :src="imgInstagram"
          alt="instagram logo"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KontakToko",
  data() {
    return {
      imgTokopedia: require("@/assets/img/tokopedia.png"),
      imgShopee: require("@/assets/img/shopee.png"),
      imgInstagram: require("@/assets/img/instagram.png"),
    };
  },
  props: {
    id: Number,
    nama: String,
    alamat: String,
    nohp: String,
    shopee: String,
    tokopedia: String,
    instagram: String,
  },
  methods: {
    tokopediaValid(url) {
      return url.includes("tokopedia.com");
    },
    shopeeValid(url) {
      return url.includes("shopee.co.id");
    },
    instagramValid(url) {
      return url.includes("instagram.com");
    },
    open(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="css" scoped>
.social-media {
  display: flex;
  justify-content: space-around;
}
.logo {
  width: 40px;
  object-fit: fill;
}
.logo:hover {
  cursor: pointer;
}
#icon-copy:hover {
  cursor: pointer;
}
</style>
