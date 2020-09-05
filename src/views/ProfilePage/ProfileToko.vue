<template>
  <div id="kiri">
    <b-card>
      <div class="profile-toko">
        <div id="logo-toko">
          <b-icon icon="shop" font-scale="5"></b-icon>
        </div>
        <div>

          <b-form @submit="updateToko">
            <b-form-group
              label-cols="4"
              label-cols-lg="3"
              label="Nama"
              label-for="profile-nama-toko"
            >
              <b-form-input
                id="profile-nama-toko"
                v-model="profile.nama"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="3"
              label="Alamat"
              label-for="profile-alamat-toko"
            >
              <b-form-input
                id="profile-alamat-toko"
                v-model="profile.alamat"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="3"
              label="No HP"
              label-for="profile-hp-toko"
            >
              <b-form-input
                id="profile-hp-toko"
                v-model="profile.nohp"
              ></b-form-input>
            </b-form-group>

            <hr />

            <b-form-group
              label-cols="4"
              label-cols-lg="3"
              label="Shopee"
              label-for="profile-shopee-toko"
            >
              <b-input-group size="sm" prepend="https://shopee.co.id/">
                <b-form-input
                  id="profile-shopee-toko"
                  v-model="profile.shopee"
                  placeholder="username"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="3"
              label="Tokopedia"
              label-for="profile-tokopedia-toko"
            >
              <b-input-group size="sm" prepend="https://tokopedia.com/">
                <b-form-input
                  id="profile-tokopedia-toko"
                  v-model="profile.tokopedia"
                  placeholder="username"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group
              label-cols="4"
              label-cols-lg="3"
              label="Instagram"
              label-for="profile-instagram-toko"
            >
              <b-input-group size="sm" prepend="https://instagram.com/">
                <b-form-input
                  id="profile-instagram-toko"
                  v-model="profile.instagram"
                  placeholder="username"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-button class="btn-update" block type="submit"
              >Update Toko</b-button
            >
          </b-form>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ProfileToko",
  props: {
    profile: Object,
    updateToko: Function,
  },
};
</script>

<style lang="css" scoped>
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
  background-color: #424874;
  color: white;
  margin-top: 8px;
  border: 0px;
}
.btn-update:hover {
  background-color: #e11d74;
}
.btn-update:active {
  background-color: #424874;
}
.spinner {
  color: #c3aed6;
}
#logo-toko {
  color: #424874;
  margin-bottom: 16px;
}
</style>
