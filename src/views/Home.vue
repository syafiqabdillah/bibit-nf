<template>
  <div class="home">
    <div class="jumbo">
      <h1 class="jumbo-title">
        <b-icon class="title-icon" icon="cart3"></b-icon>Bantu Bisnis Teman
      </h1>
      <p class="jumbo-subtitle">Yuk beli jualan teman!</p>
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
        v-on:click="showDetail(product)"
      >
      <div class="product-img-container">
        <img
          :src="product.imageUrl"
          :alt="product.namaProduk"
        />
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
          <div class="product-seen">
            <b-icon class="seen-icon" icon="eye-fill"></b-icon>Telah dilihat 45
            kali
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios';

export default {
  name: "Home",
  data() {
    return {
      listProduct: [],
      searchQuery: "",
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
    };
  },
  created() {
    axios.get('http://localhost:5000/products')
    .then(res => {
      this.productList = res.data.data;
    })
    .catch(e => {
      alert(e)
    })

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
        return queryInNamaProduk || queryInNamaToko;
      });
    },
  },
  methods: {
    showDetail(product) {
      console.log(product);
    },
    priceFormat(price) {
      if (price !== "0") {
        return new Intl.NumberFormat().format(price);
      }
      return "Tanya penjual";
    },
  },
};
</script>

<style lang="css" scoped>
.product-price {
  font-size: 14px;
  font-weight: bold;
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
  padding-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}
.product-item {
  margin-bottom: 20px;
}
#product-detail {
  padding: 20px;
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
.jumbo {
  background-color: #424874;
  padding: 32px;
  padding-top: 32px;
  color: white;
}
.jumbo-title {
  font-size: 3.5rem;
}
.title-icon {
  margin-right: 10px;
}
.jumbo-subtitle {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 48px;
  letter-spacing: 2px;
}
</style>
