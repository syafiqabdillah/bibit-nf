<template>
  <div class="home">
    <div class="jumbo">
      <h1 class="jumbo-title">
        <b-icon class="title-icon" icon="cart3"></b-icon>Bantuin Bisnis Teman
      </h1>
      <p class="jumbo-subtitle">
        Kalau bisa beli lewat teman sendiri, kenapa nggak?
      </p>
      <b-form>
        <b-form-input
          id="search-query"
          v-model="searchQuery"
          placeholder="Cari produk, toko, atau nama teman kamu"
        ></b-form-input>
      </b-form>
      <div class="categories">
        <span v-for="category in productCategory" :key="category">
          <a class="category" href="#">{{ category }}</a>
        </span>
      </div>
    </div>

    <div class="product-container">
      <b-card
        class="product-item"
        v-for="product in computedProductList"
        :key="product.id"
        v-on:click="showDetail(product.idToko)"
      >
        <div class="product-img-container">
          <img :src="product.imageUrl" :alt="product.namaProduk" />
        </div>

        <div align="left" id="product-detail">
          <span class="product-name">{{ product.namaProduk }}</span>
          <div class="product-price">
            {{
              product.harga > 0
                ? "Rp " + priceFormat(product.harga)
                : "Tanya penjual"
            }}
          </div>
          <div class="product-store">{{ product.namaToko }}</div>
          <div class="product-store">
            <b-icon icon="person-fill"></b-icon>
            {{ product.namaSeller }}
          </div>
          <div class="product-seen">
            <b-icon class="seen-icon" icon="eye-fill"></b-icon>Telah dilihat 45
            kali
          </div>
        </div>
      </b-card>
      <b-modal ref="popup-kontak-toko" hide-header hide-footer centered>
        <div align="center">
          <KontakToko
            :id="selectedToko.id"
            :nama="selectedToko.nama"
            :alamat="selectedToko.alamat"
            :nohp="selectedToko.nohp"
            :shopee="selectedToko.shopee"
            :tokopedia="selectedToko.tokopedia"
            :instagram="selectedToko.instagram"
          />
        </div>
      </b-modal>
    </div>

    <div v-if="loading">
      <b-spinner>Loading...</b-spinner>
    </div>
    <div class="mt-4" align="center">
      <b-button id="see-more" v-on:click="seeMore">see more</b-button>
    </div>
  </div>
</template>

<script>
import KontakToko from "@/components/KontakToko.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    KontakToko,
  },
  data() {
    return {
      searchQuery: "",
      awaitingSearch: false,
      productList: [],
      productCategory: [
        "All",
        "Makanan & Minuman",
        "Elektronik",
        "Snack",
        "Aksesoris",
        "Perawatan Tubuh",
        "Office & Stationery",
        "Hobi",
        "Mainan",
      ],
      listKategori: [],
      selectedToko: {
        id: null,
        nama: null,
        alamat: null,
        nohp: null,
        shopee: null,
        tokopedia: null,
        instagram: null,
      },
      loading: true,
    };
  },
  watch: {
    searchQuery() {
      if (!this.awaitingSearch) {
        setTimeout(() => {
          if (this.searchQuery !== "") {
            this.loading = true;
            axios
              .get(`http://localhost:5000/search-products/${this.searchQuery}`)
              .then((res) => {
                this.productList = res.data.data;
              })
              .catch((e) => {
                alert(e);
              })
              .finally(() => (this.loading = false));
          } else {
            this.loadnig = true;
            axios
              .get(`http://localhost:5000/products`)
              .then((res) => {
                this.productList = res.data.data;
              })
              .catch((e) => {
                alert(e);
              })
              .finally(() => (this.loading = false));
          }
          this.awaitingSearch = false;
        }, 1000); // 1 sec delay
      }
      this.awaitingSearch = true;
    },
  },
  created() {
    // get all kategori
    axios
      .get("http://localhost:5000/kategori")
      .then((res) => {
        this.listKategori = res.data.data;
      })
      .catch((e) => {
        alert(e);
      });
    // get all products
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        this.productList = res.data.data;
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => (this.loading = false));
  },
  computed: {
    computedProductList() {
      return this.productList.filter((product) => {
        const queryInNamaProduk = product.namaProduk
          .toLowerCase()
          .includes(this.searchQuery);
        const queryInNamaToko = product.namaToko
          .toLowerCase()
          .includes(this.searchQuery);
        const queryInNamaSeller = product.namaSeller
          .toLowerCase()
          .includes(this.searchQuery);
        return queryInNamaProduk || queryInNamaToko || queryInNamaSeller;
      });
    },
  },
  methods: {
    showDetail(toko_id) {
      // show toko detail in a modal
      this.$refs["popup-kontak-toko"].show();
      // play spinner while sending request
      axios
        .get(`http://localhost:5000/kontak-toko/${toko_id}`)
        .then((res) => {
          this.selectedToko = res.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    priceFormat(price) {
      if (price !== "0") {
        return new Intl.NumberFormat(["ban", "id"]).format(price);
      }
      return "Tanya penjual";
    },
    seeMore() {
      this.loading = true;
      // load more products
      axios
        .get("http://localhost:5000/products")
        .then((res) => {
          this.productList = this.productList.concat(res.data.data);
        })
        .catch((e) => {
          alert(e);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style lang="css" scoped>
.product-price {
  font-size: 0.875rem;
  color: #fa591d;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 22px;
}
.product-store {
  font-size: 12px;
  color: #6c757d;
}
.product-seen {
  font-size: 12px;
  color: #6c757d;
}
.seen-icon {
  margin-right: 3px;
}
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: space-around;
  margin-left: 108px;
  margin-right: 108px;
  margin-top: 32px;
}
.product-item {
  margin-bottom: 20px;
}
#product-detail {
  padding: 20px;
  padding-top: 10px;
}
.card-body {
  padding: 0px;
}
.product-img-container {
  display: flex;
  justify-content: center;
  height: 150px;
  background-color: white;
}
.product-img-container img {
  object-fit: cover;
  width: 100%;
  max-height: 150px;
}
.product-item:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.categories {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}
.category {
  margin-right: 12px;
  font-size: 12px;
  font-weight: 200;
  letter-spacing: 0.5px;
}
.category:hover {
  color: #c3aed6;
}
a:link {
  color: white;
}
a:visited {
  color: white;
}
/* Header */
.jumbo {
  background-color: #424874;
  padding: 128px;
  padding-top: 16px;
  padding-bottom: 16px;
  color: white;
}
@media (max-width: 800px) {
  .jumbo {
    padding: 32px;
  }
  .product-container {
    margin-left: 32px;
    margin-right: 32px;
  }
}
.jumbo-title {
  font-size: 3.5rem;
}
.title-icon {
  margin-right: 10px;
}
.jumbo-subtitle {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1.5px;
}
#see-more {
  margin-bottom: 32px;
  background-color: #424874;
}
</style>
