<template>
  <div id="kiri">
    <b-card>
      <div class="profile-toko">
        <div>
          <b-form @submit="updateToko">
            <b-form-group
              label-cols="3"
              label-cols-lg="3"
              label="Nama"
              label-for="profile-nama-toko"
              :label-size="isMobileScreen ? 'sm' : 'md'"
            >
              <b-form-input
                id="profile-nama-toko"
                v-model="profile.nama"
                :size="isMobileScreen ? 'sm' : 'md'"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="3"
              label-cols-lg="3"
              label="Alamat"
              label-for="profile-alamat-toko"
              :label-size="isMobileScreen ? 'sm' : 'md'"
            >
              <b-form-input
                id="profile-alamat-toko"
                v-model="profile.alamat"
                :size="isMobileScreen ? 'sm' : 'md'"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="3"
              label-cols-lg="3"
              label="No HP"
              label-for="profile-hp-toko"
              :label-size="isMobileScreen ? 'sm' : 'md'"
            >
              <b-form-input
                id="profile-hp-toko"
                v-model="profile.nohp"
                :size="isMobileScreen ? 'sm' : 'md'"
              ></b-form-input>
            </b-form-group>

            <hr />

            <b-form-group
              :label-cols="isMobileScreen ? 0 : '4'"
              label-cols-lg="3"
              :label="isMobileScreen ? '' : 'Shopee'"
              label-for="profile-shopee-toko"
              :label-size="isMobileScreen ? 'sm' : 'md'"
            >
              <b-input-group size="sm" prepend="https://shopee.co.id/">
                <b-form-input
                  id="profile-shopee-toko"
                  v-model="profile.shopee"
                  placeholder="username"
                  :size="isMobileScreen ? 'sm' : 'md'"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group
              :label-cols="isMobileScreen ? 0 : '4'"
              label-cols-lg="3"
              :label="isMobileScreen ? '' : 'Tokopedia'"
              label-for="profile-tokopedia-toko"
              :label-size="isMobileScreen ? 'sm' : 'md'"
            >
              <b-input-group size="sm" prepend="https://tokopedia.com/">
                <b-form-input
                  id="profile-tokopedia-toko"
                  v-model="profile.tokopedia"
                  placeholder="username"
                  :size="isMobileScreen ? 'sm' : 'md'"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group
              :label-cols="isMobileScreen ? 0 : '4'"
              label-cols-lg="3"
              :label="isMobileScreen ? '' : 'Instagram'"
              label-for="profile-instagram-toko"
              :label-size="isMobileScreen ? 'sm' : 'md'"
            >
              <b-input-group size="sm" prepend="https://instagram.com/">
                <b-form-input
                  id="profile-instagram-toko"
                  v-model="profile.instagram"
                  placeholder="username"
                  :size="isMobileScreen ? 'sm' : 'md'"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-button class="btn-update bibit-btn-small" block type="submit"
              >Update Toko</b-button
            >
          </b-form>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { isMobile } from "../../mixins";
export default {
  name: "ProfileToko",
  props: {
    profile: Object,
    updateToko: Function,
  },
  computed: {
    isMobileScreen() {
      return isMobile();
    },
  },
};
</script>

<style lang="css" scoped>
@import '../../assets/css/style.css';

#kiri {
  margin-bottom: 16px;
}

.profile-toko {
  margin: 32px;
}
#avatar-toko {
  margin-bottom: 20px;
}
.btn-update {
  margin-top: 8px;
}

#logo-toko {
  color: #424874;
  margin-bottom: 16px;
}
@media (max-width: 480px) {
  .profile-toko {
    margin: 0px;
  }
}
</style>
