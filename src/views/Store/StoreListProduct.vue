<template>
  <div class="list-product">
    <b-card>
      <div class="product-container">
        <b-card
          class="product-item"
          v-for="product in listProduct"
          :key="product.id"
        >
          <!-- Profuct Item -->
          <ProductItem :product="product" />
        </b-card>
      </div>
    </b-card>
  </div>
</template>

<script>
import ProductItem from "../ProfilePage/ProductItem";
export default {
  name: "StoreListProduct",
  components: {
    ProductItem,
  },
  props: {
    listProduct: Array,
  },
};
</script>

<style scoped>
.list-product {
  margin: 32px;
  margin-left: 0px;
}
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 170px);
  row-gap: 8px;
  justify-content: space-around;
  margin: 32px;
}
.card-body {
  padding: 0px;
}
@media (max-width: 480px) {
  .list-product {
    margin: 8px;
  }
  .product-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 170px);
    row-gap: 18px;
    justify-content: space-around;
    margin: 8px;
    margin-bottom: 16px;
  }
}
</style>
