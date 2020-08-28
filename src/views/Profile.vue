<template>
  <div class="profile">
    <div class="jumbo">
      <h1 class="jumbo-title">
        Profile Toko
      </h1>
    </div>

    <div class="login-container">
      <b-row>
        <b-col cols="4">
          <div class="my-shop">
            <b-card>

              <b-img src="https://placekitten.com/300/300" height="150px" alt="Responsive image"></b-img>

              <div class="profile-toko">
                <b-form @submit="onSubmit" @reset="onReset">
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
                      v-model="profile.noHp"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label-cols="4"
                    label-cols-lg="3"
                    label="Shopee"
                    label-for="profile-shopee-toko"
                  >
                    <b-form-input
                      id="profile-shopee-toko"
                      v-model="profile.shopee"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label-cols="4"
                    label-cols-lg="3"
                    label="Tokopedia"
                    label-for="profile-tokopedia-toko"
                  >
                    <b-form-input
                      id="profile-tokopedia-toko"
                      v-model="profile.tokopedia"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label-cols="4"
                    label-cols-lg="3"
                    label="Instagram"
                    label-for="profile-instagram-toko"
                  >
                    <b-form-input
                      id="profile-instagram-toko"
                      v-model="profile.instagram"
                    ></b-form-input>
                  </b-form-group>

                  <b-button class="btn-update" block type="submit"
                    >Update Toko</b-button
                  >
                </b-form>
              </div>
            </b-card>
          </div>
        </b-col>
        <b-col cols="8">
          <div class="form-login">
            <b-card> </b-card>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      profile: {
        nama: "Toko Kita Maju",
        alamat: "Jl. Jalan No. 69",
        noHp: "0812345678909",
        tokopedia: "https://www.tokopedia.com/enterkomputer",
        shopee: "https://shopee.co.id/adataxpg_officialshop",
        instagram: "https://www.instagram.com/syafiq.au/",
        lain: "",
      },
    };
  },
  methods: {
    onSubmit() {
      e.preventDefault();
    },
    onReset(e) {
      e.preventDefault();
    },
  },
};
</script>

<style>
.profile-toko {
  margin-top: 16px;
}
.profile-input {
  margin-left: 4px;
}
.avatar-toko {
  border: 0px;
}
.jumbo {
  background-color: #424874;
  padding: 32px;
  padding-top: 32px;
  color: white;
}
.jumbo-title {
  font-size: 3.5rem;
}
.login-container {
  margin: 32px;
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
</style>
