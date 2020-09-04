<template>
  <div>
    <b-card>
      <ModalAddProduct v-bind:profile="profile" />

      <div class="product-container">
        <b-card
          class="product-item"
          v-for="product in listProduct"
          :key="product.id"
        >
          <div class="product-img-container" v-if="product.status === 'active'">
            <img :src="product.imageUrl" :alt="product.nama" />
          </div>
          <div class="product-img-container-grey" v-if="product.status === 'inactive'">
            <img :src="product.imageUrl" :alt="product.nama" />
          </div>

          <div align="left" id="product-detail">
            <div class="product-name">{{ product.nama }}</div>
            <div class="product-price">
              {{
                product.harga > 0
                  ? "Rp " + priceFormat(product.harga)
                  : "Tanya penjual"
              }}
            </div>
            <div class="product-seen">
              <b-icon class="seen-icon" icon="eye-fill"></b-icon>Telah dilihat
              45 kali
            </div>
          </div>
        </b-card>
      </div>
    </b-card>

  </div>
</template>

<script>
import ModalAddProduct from "./ModalAddProduct";
import axios from "axios";
import { baseUrl } from "../../config/index.js";
export default {
  name: "ListProdukToko",
  components: {
    ModalAddProduct,
  },
  data() {
    return {
      
    };
  },
  props: {
    listProduct: Array,
    profile: Object
  },
  mounted() {
    
  },
  methods: {
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
.product-item {
  margin-bottom: 20px;
}
.product-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: inherit;
}
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 170px);
  justify-content: space-around;
  margin: 20px;
  margin-left: 32px;
  margin-right: 32px;
}
.product-img-container {
  display: flex;
  height: 150px;
  justify-content: center;
  background-color: white;
}
.product-img-container img {
  object-fit: cover;
  width: 100%;
}
.product-img-container-grey img {
  object-fit: cover;
  width: 100%;
  filter: grayscale(100%);
}
.card-body {
  padding: 0px;
}
/* Isi tulisan dalam item */
#product-detail {
  padding: 20px;
}
/* Efek hover item  */
.product-item:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
/* Tulisan-tulisan dalam detail item */
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
</style>
