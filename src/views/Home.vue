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

    <div id="products">
      <b-card-group columns>
        <b-card v-for="product in computedProductList" :key="product">
          <div align="left">
            <h4>{{ product.namaProduk }}</h4>
            <p>{{ product.namaToko }}</p>
            <span>{{ product.harga }}</span>
          </div>
        </b-card>
      </b-card-group>
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
        },
        {
          namaProduk: "Product 234",
          namaToko: "Toko DEF",
          harga: "Rp 40.000",
        },
        {
          namaProduk: "Product 345",
          namaToko: "Toko GHI",
          harga: "Rp 50.000",
        },
        {
          namaProduk: "Product 456",
          namaToko: "Toko JKL",
          harga: "Rp 60.000",
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: "Rp 70.000",
        },
      ],
    };
  },
  computed: {
    computedProductList() {
      return this.productList.filter(product => {
        return product.namaProduk.includes(this.searchQuery)
      })
    }
  }
};
</script>

<style>
#products {
  margin: 30px;
}
</style>
