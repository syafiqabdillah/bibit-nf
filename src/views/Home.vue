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
        img-src="https://picsum.photos/600/300/?image=25"
      >
        <div align="left">
          <span class="product-name">{{ product.namaProduk }}</span>
          <div class="product-price">{{ product.harga }}</div>
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

export default {
  name: "Home",
  data() {
    return {
      searchQuery: "",
      productList: [
        {
          namaProduk: "Product 123",
          namaToko: "Toko ABC",
          harga: "Rp 30.000",
          lokasi: "Bontang",
          id: "1",
        },
        {
          namaProduk: "Product 234",
          namaToko: "Toko DEF",
          harga: "Rp 40.000",
          lokasi: "Bontang",
          id: "2",
        },
        {
          namaProduk: "Product 345",
          namaToko: "Toko GHI",
          harga: "Rp 50.000",
          lokasi: "Bontang",
          id: "3",
        },
        {
          namaProduk: "Product 456",
          namaToko: "Toko JKL",
          harga: "Rp 60.000",
          lokasi: "Bontang",
          id: "4",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
          id: "5",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
          id: "6",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
          id: "7",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
          id: "8",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
          id: "9",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
          id: "10",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
          id: "11",
        },
      ],
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
  computed: {
    computedProductList() {
      return this.productList.filter((product) => {
        return product.namaProduk.includes(this.searchQuery);
      });
    },
  },
  methods: {
    showDetail(product) {
      console.log(product);
    },
  },
};
</script>

<style>
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
  margin: 20px;
}
.product-item {
  margin-bottom: 10px;
}
.product-item:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.home {
  font-family: "Alata", Helvetica, Arial;
  background-color: #f3e6e3;
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
  padding-top: 64px;
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
