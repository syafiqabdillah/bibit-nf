<template>
  <div>
    <b-card>
      <ModalAddProduct v-bind:profile="profile" />

      <div class="product-container">
        <b-card
          class="product-item"
          v-for="product in listProduct"
          :key="product.id"
          v-on:click="showDetail(product)"
        >
          <div :class="product.status === 'active' ? 'product-img-container': 'product-img-container-grey'">
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

    <b-modal title="Ubah Produk" ref="product-detail-modal" @ok="updateProduk">
      <b-form>
        <b-form-group
          label-cols="4"
          label-cols-lg="3"
          label="Nama Produk"
          label-for="add-produk-nama"
        >
          <b-form-input
            id="add-produk-nama"
            v-model="selectedProduct.nama"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="3"
          label="Kategori"
          label-for="add-produk-kategori"
        >
          <b-form-select
            v-model="selectedProduct.kategori_id"
            :options="computedListKategori"
            required
          >
          </b-form-select>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="3"
          label="Harga"
          label-for="add-produk-harga"
          description="Masukkan 0 bila harga tidak menentu"
        >
          <b-form-input
            id="add-produk-harga"
            type="number"
            v-model="selectedProduct.harga"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols="4"
          label-cols-lg="3"
          label="Gambar"
          label-for="add-produk-image"
        >
          <b-form-file
            class="upload-file text-nowrap text-truncate"
            id="add-produk-image"
            v-model="new_image"
            placeholder="Ganti gambar..."
            drop-placeholder="Taruh gambar..."
            accept="image/*"
            required
          ></b-form-file>
          <div id="image-preview">
            <img
              :src="selectedProduct.imageUrl"
              v-if="new_image === null"
              alt="Image preview"
            />
            <img
              :src="imagePreviewUrl"
              v-if="new_image !== null"
              alt="Image preview"
            />
          </div>
        </b-form-group>
        <div align="right">
          <b-form-checkbox
            id="add-product-status"
            v-model="selectedProduct.status"
            value="active"
            unchecked-value="inactive"
            switch
            >Active</b-form-checkbox
          >
        </div>
      </b-form>
    </b-modal>

    <b-modal ref="modal-uploading" centered hide-header hide-footer>
      <div align="center">
        <b-spinner class="spinner">{{ uploadProgress.state }}</b-spinner>
        <p v-if="uploadProgress.state === 'Uploading Image'">
          Uploaded {{ uploadProgress.percentage }}%
        </p>
      </div>
    </b-modal>

  </div>
</template>

<script>
import ModalAddProduct from "./ModalAddProduct";
import axios from "axios";
import { baseUrl } from "../../config/index.js";
import { storage } from "../../firebase/index";
export default {
  name: "ListProdukToko",
  components: {
    ModalAddProduct,
  },
  data() {
    return {
      selectedProduct: {
        nama: "",
        harga: "",
        kategori_id: "",
        imageUrl: "",
        new_image: null,
      },
      new_image: null,
      listKategori: [],
      uploadProgress: {
        state: "",
        percentage: 0,
        imageUrl: "",
      },
    };
  },
  props: {
    listProduct: Array,
    profile: Object,
  },
  mounted() {
    // get kategori
    axios
      .get(`${baseUrl}/kategori`)
      .then((res) => {
        this.listKategori = res.data.data;
      })
      .catch((e) => {
        alert(e);
      });
  },
  computed: {
    computedListKategori() {
      return this.listKategori.map((kategori) => {
        return {
          value: kategori.id,
          text: kategori.nama,
        };
      });
    },
    imagePreviewUrl() {
      return URL.createObjectURL(this.new_image);
    },
  },
  methods: {
    priceFormat(price) {
      if (price !== "0") {
        return new Intl.NumberFormat().format(price);
      }
      return "Tanya penjual";
    },
    showDetail(product) {
      this.selectedProduct = product;
      this.$refs["product-detail-modal"].show();
    },
    updateProduk(e) {
      e.preventDefault();
      // validasi form gak dikosongin
      if (
        this.selectedProduct.nama !== "" &&
        this.selectedProduct.kategori_id !== "" &&
        this.selectedProduct.harga !== "" &&
        (this.selectedProduct.imageUrl || this.new_image !== null)
      ) {
        this.uploadProgress.state = "Processing"
        this.$refs["modal-uploading"].show();
        // kalo nambahin gambar baru, upload dulu ke firebase buat daperin imageUrl baru
        if (this.new_image !== null) {
          this.uploadProgress.state = "Uploading Image";
          // upload
          const imageName = `${Date.now()}-${this.selectedProduct.nama}`;
          const uploadTask = storage
            .ref(`images/${imageName}`)
            .put(this.new_image);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              this.uploadProgress.percentage =
                (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
            },
            (error) => {
              alert(error);
            },
            () => {
              storage
                .ref("images")
                .child(imageName)
                .getDownloadURL()
                .then((url) => {
                  this.selectedProduct.imageUrl = url;
                  axios
                    .post(`${baseUrl}/update-product`, this.selectedProduct)
                    .then(() => {})
                    .catch((e) => alert(e))
                    .finally(() => location.reload());
                });
            }
          );
        } else {
          axios
            .post(`${baseUrl}/update-product`, this.selectedProduct)
            .then(() => {})
            .catch((e) => alert(e))
            .finally(() => location.reload());
        }
      } else {
        alert('Lengkapi form')
      }
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
.product-img-container, .product-img-container-grey {
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
  filter: grayscale(100%);
  object-fit: cover;
  width: 100%;
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
#image-preview img {
  height: 150px;
  width: auto;
  margin-top: 8px;
}
</style>
