<template>
  <div>
    <div class="jumbo">
      <h2 class="jumbo-title">
        <b-icon class="seen-icon" icon="shop"></b-icon>
        <span class="title-nama-toko"> {{ toko.nama }}</span>
      </h2>
    </div>

    <div v-if="loading" align="center">
      <b-spinner class="mt-4" variant="primary"></b-spinner>
    </div>

    <div class="profile-container">
      <b-row>
        <b-col cols="12" md="12" lg="5">
          <StoreProfile :profile="toko" />
        </b-col>
        <b-col cols="12" md="12" lg="7">
          <StoreListProduct :listProduct="listProduct" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "../../config/index.js";
import axios from "axios";
import StoreProfile from "./StoreProfile";
import StoreListProduct from "./StoreListProduct";
export default {
  name: "Store",
  components: {
    StoreProfile,
    StoreListProduct
  },
  data() {
    return {
      toko: {
        nama: "",
        id: "",
      },
      listProduct: [],
      loading: true,
    };
  },
  created() {
    axios
      .get(`${baseUrl}/view-toko/${this.$route.params.id}`)
      .then((res) => (this.toko = res.data.data))
      .finally(() => {
        axios
          .get(`${baseUrl}/products/${this.$route.params.id}`)
          .then((res) => {
            this.listProduct = res.data.data;
          })
          .catch((e) => {
            alert(e);
          })
          .finally(() => (this.loading = false));
      });
  },
};
</script>

<style scoped>
/* Header */
.jumbo {
  background-color: #424874;
  padding-bottom: 16px;
  padding-top: 16px;
  color: white;
}
.jumbo-title {
  font-size: 3rem;
}
</style>
