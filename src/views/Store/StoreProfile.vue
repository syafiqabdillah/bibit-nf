<template>
  <div class="profile">
    <b-card>
      <div class="profile-toko">
        <div>
          <b-form @submit="() => {}">

            <b-form-group
              label-cols="3"
              label-cols-lg="3"
              label="Alamat"
              label-for="profile-alamat-toko"
              :label-size="isMobileScreen? 'sm' : 'md'"
            >
              <b-form-input
                id="profile-alamat-toko"
                v-model="profile.alamat"
                disabled
                :size="isMobileScreen? 'sm':'md'"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="3"
              label-cols-lg="3"
              label="No HP"
              label-for="profile-hp-toko"
              :label-size="isMobileScreen? 'sm' : 'md'"
            >
              <b-form-input
                id="profile-hp-toko"
                v-model="profile.nohp"
                disabled
                :size="isMobileScreen? 'sm':'md'"
              ></b-form-input>
            </b-form-group>

            <div class="social-media">
              <div
                id="tokopedia"
                v-if="linkValid('tokopedia', profile.tokopedia)"
              >
                <img
                  v-on:click="open('tokopedia', profile.tokopedia)"
                  class="logo"
                  :src="imgTokopedia"
                  alt="tokopedia logo"
                />
              </div>
              <div id="shopee" v-if="linkValid('shopee', profile.shopee)">
                <img
                  v-on:click="open('shopee', profile.shopee)"
                  class="logo"
                  :src="imgShopee"
                  alt="shopee logo"
                />
              </div>
              <div
                id="instagram"
                v-if="linkValid('instagram', profile.instagram)"
              >
                <img
                  v-on:click="open('instagram', profile.instagram)"
                  class="logo"
                  :src="imgInstagram"
                  alt="instagram logo"
                />
              </div>
            </div>
          </b-form>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { isMobile } from "../../mixins";
export default {
  nama: "StoreProfile",
  props: {
    profile: Object,
  },
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
  computed: {
    imageFromUrl() {
      return require(this.product.imageUrl);
    },
    isMobileScreen() {
      return isMobile();
    },
  },
};
</script>

<style scoped>
.profile {
  margin: 32px;
  margin-right: 0px;
}
.profile-toko {
  margin: 0px;
}
.spinner {
  color: #c3aed6;
}
#logo-toko {
  color: #424874;
  margin-bottom: 16px;
}
.social-media {
  display: flex;
  justify-content: space-around;
}
.logo {
  width: 50px;
  object-fit: fill;
}
.logo:hover {
  cursor: pointer;
}
@media (max-width: 480px) {
  .profile {
    margin: 8px;
  }
  .profile-toko {
    margin: 0px;
  }
}
</style>
