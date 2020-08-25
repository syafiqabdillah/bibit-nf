<template>
  <div class="home">
    <b-jumbotron
      header="Bantu Bisnis Teman"
      bg-variant="info"
      text-variant="white"
      lead="Platform jualan antar teman"
    >
      <b-form>
        <b-form-input
          id="search-query"
          v-model="searchQuery"
          placeholder="Cari toko, produk, atau nama penjual"
        ></b-form-input>
      </b-form>
    </b-jumbotron>

    <div class="product-container">
      <b-card
        class="product-item"
        v-for="product in computedProductList"
        :key="product"
        img-src="https://picsum.photos/600/300/?image=25"
      >
        <div align="left">
          <h4>{{ product.namaProduk }}</h4>
          <span id="harga">{{ product.harga }}</span>
          <h5>{{ product.namaToko }}</h5>
          <b-card-text class="small text-muted"
            >Last updated 3 mins ago</b-card-text
          >
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
  components: {
    HelloWorld,
  },
  data() {
    return {
      searchQuery: "",
      productList: [
        {
          namaProduk: "Product 123",
          namaToko: "Toko ABC",
          harga: "Rp 30.000",
          lokasi: "Bontang",
        },
        {
          namaProduk: "Product 234",
          namaToko: "Toko DEF",
          harga: "Rp 40.000",
          lokasi: "Bontang",
        },
        {
          namaProduk: "Product 345",
          namaToko: "Toko GHI",
          harga: "Rp 50.000",
          lokasi: "Bontang",
        },
        {
          namaProduk: "Product 456",
          namaToko: "Toko JKL",
          harga: "Rp 60.000",
          lokasi: "Bontang",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
          lokasi: "Bontang",
        },
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
};
</script>

<style>
#products {
  margin: 30px;
}
#harga {
  font-size: 14px;
  font-weight: bold;
  color: rgb(250, 89, 29);
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 22px;
}
.product-container {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-auto-rows: 300px;
  margin: 30px;
}
.product-item {
  margin: 10px;
}
</style>
