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
        :img-src="product.imageUrl"
      >
        <div align="left">
          <span class="product-name">{{ product.namaProduk }}</span>
          <div class="product-price">{{ product.harga > 0 ? 'Rp ' + priceFormat(product.harga) : "Tanya penjual" }}</div>
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
          namaProduk: "Garam Himalaya",
          namaToko: "Roemah Sehat Bontang",
          harga: 0,
          lokasi: "Bontang",
          id: "1",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753"
        },
        {
          namaProduk: "Lemonilo",
          namaToko: "Roemah Sehat Bontang",
          harga: 0,
          lokasi: "Bontang",
          id: "2",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.11.jpeg?alt=media&token=de2f1722-5c58-4091-ba1b-dee6088c4c04"
        },
        {
          namaProduk: "Chia Seed",
          namaToko: "Roemah Sehat Bontang",
          harga: 0,
          lokasi: "Bontang",
          id: "3",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.11%20(1).jpeg?alt=media&token=1cdd6b2c-cde7-4004-8f60-c8e6750f63fb"
        },
        {
          namaProduk: "Product 456",
          namaToko: "Toko JKL",
          harga: 60000,
          lokasi: "Bontang",
          id: "4",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753"
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: 70000,
          lokasi: "Bontang",
          id: "5",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753"
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: 70000,
          lokasi: "Bontang",
          id: "6",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753"
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: 70000,
          lokasi: "Bontang",
          id: "7",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753"
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: 70000,
          lokasi: "Bontang",
          id: "8",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753"
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: 70000,
          lokasi: "Bontang",
          id: "9",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753"
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: 70000,
          lokasi: "Bontang",
          id: "10",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753"
        },
        {
          namaProduk: "Product 567",
          namaToko: "Toko MNO",
          harga: 70000,
          lokasi: "Bontang",
          id: "11",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753"
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
        const queryInNamaProduk = product.namaProduk.toLowerCase().includes(this.searchQuery);
        const queryInNamaToko = product.namaToko.toLowerCase().includes(this.searchQuery);
        return queryInNamaProduk || queryInNamaToko;
      });
    },
  },
  methods: {
    showDetail(product) {
      console.log(product);
    },
    priceFormat(price) {
      return new Intl.NumberFormat().format(price)
    }
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
  padding-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}
.product-item {
  margin-bottom: 20px;
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
