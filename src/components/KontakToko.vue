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
      <div id="tokopedia" v-if="linkValid('tokopedia', tokopedia)">
        <img
          v-on:click="open('tokopedia', tokopedia)"
          class="logo"
          :src="imgTokopedia"
          alt="tokopedia logo"
        />
      </div>
      <div id="shopee" v-if="linkValid('shopee', shopee)">
        <img
          v-on:click="open('shopee', shopee)"
          class="logo"
          :src="imgShopee"
          alt="shopee logo"
        />
      </div>
      <div id="instagram" v-if="linkValid('instagram', instagram)">
        <img
          v-on:click="open('instagram', instagram)"
          class="logo"
          :src="imgInstagram"
          alt="instagram logo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "KontakToko",
  data() {
    return {
      imgTokopedia: require("@/assets/img/tokopedia.png"),
      imgShopee: require("@/assets/img/shopee.png"),
      imgInstagram: require("@/assets/img/instagram.png"),
      baseOlshopUrl: {
        tokopedia: "https://tokopedia.com/",
        shopee: "https://shopee.co.id/",
        instagram: "https://instagram.com/",
      },
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
    linkValid(olshop, username) {
      if (username === "" || username === "-") {
        return false;
      }
      try {
        new URL(`${this.baseOlshopUrl[olshop]}${username}`);
      } catch {
        return false;
      }
      return true;
    },
    open(olshop, username) {
      window.open(`${this.baseOlshopUrl[olshop]}${username}`, "_blank");
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
