<template>
  <div class="profile">
    <div class="jumbo">
      <h2 class="jumbo-title">
        <b-icon class="seen-icon" icon="shop"></b-icon>
        Profil Toko <br />
        <span class="title-nama-toko"> "{{ profile.nama }}"</span>
      </h2>
    </div>

    <div class="profile-container">
      <b-row>
        <b-col cols="12" md="4" lg="4">
          <div id="kiri">
            <b-card>
              <div class="profile-toko">
                <b-img
                  src="https://placekitten.com/300/300"
                  height="150px"
                  alt="Responsive image"
                  id="avatar-toko"
                ></b-img>

                <div>
                  <b-form @submit="updateToko">
                    <b-form-group
                      label-cols="4"
                      label-cols-lg="3"
                      label="Nama"
                      label-for="profile-nama-toko"
                    >
                      <b-form-input
                        id="profile-nama-toko"
                        v-model="profile.nama"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols="4"
                      label-cols-lg="3"
                      label="Alamat"
                      label-for="profile-alamat-toko"
                    >
                      <b-form-input
                        id="profile-alamat-toko"
                        v-model="profile.alamat"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols="4"
                      label-cols-lg="3"
                      label="No HP"
                      label-for="profile-hp-toko"
                    >
                      <b-form-input
                        id="profile-hp-toko"
                        v-model="profile.nohp"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols="4"
                      label-cols-lg="3"
                      label="Shopee"
                      label-for="profile-shopee-toko"
                    >
                      <b-form-input
                        id="profile-shopee-toko"
                        v-model="profile.shopee"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols="4"
                      label-cols-lg="3"
                      label="Tokopedia"
                      label-for="profile-tokopedia-toko"
                    >
                      <b-form-input
                        id="profile-tokopedia-toko"
                        v-model="profile.tokopedia"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label-cols="4"
                      label-cols-lg="3"
                      label="Instagram"
                      label-for="profile-instagram-toko"
                    >
                      <b-form-input
                        id="profile-instagram-toko"
                        v-model="profile.instagram"
                      ></b-form-input>
                    </b-form-group>

                    <b-button class="btn-update" block type="submit"
                      >Update Toko</b-button
                    >
                  </b-form>
                </div>
              </div>
            </b-card>
          </div>
        </b-col>

        <b-col cols="12" md="8" lg="8">
          <div>
            <b-card>
              <div align="center">
                <b-button class="add-product" block v-on:click="showFormAddProduct()">
                  <b-icon class="add-product-icon" icon="plus"></b-icon>Tambah
                  Produk
                </b-button>
              </div>

              <div class="product-container">
                <b-card
                  class="product-item"
                  v-for="product in listProduct"
                  :key="product.id"
                  v-on:click="showDetail(product)"
                >
                  <div class="product-img-container">
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
                      <b-icon class="seen-icon" icon="eye-fill"></b-icon>Telah
                      dilihat 45 kali
                    </div>
                  </div>
                </b-card>
              </div>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </div>

    <b-modal
      ref="modal-add-product"
      title="Tambah Produk"
      @ok="onSubmit"
      centered
    >
      <div align="center">
        <b-form>
          <b-form-group
            label-cols="4"
            label-cols-lg="3"
            label="Nama Produk"
            label-for="add-produk-nama"
          >
            <b-form-input
              id="add-produk-nama"
              v-model="formAddProduct.namaProduk"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="3"
            label="Kategori"
            label-for="add-produk-kategori"
          >
            <b-form-select
              v-model="formAddProduct.kategoriId"
              :options="computedListKategori"
            >
            </b-form-select>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="3"
            label="Harga"
            label-for="add-produk-harga"
          >
            <b-form-input
              id="add-produk-harga"
              type="number"
              v-model="formAddProduct.harga"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="3"
            label="Gambar"
            label-for="add-produk-image"
          >
            <b-form-file
              class="upload-file"
              id="add-produk-image"
              v-model="formAddProduct.image"
              placeholder="Pilih gambar..."
              drop-placeholder="Taruh gambar..."
            ></b-form-file>
            <div id="image-preview">
              <img
                :src="imagePreviewUrl"
                v-if="formAddProduct.image !== null"
                alt="Image preview"
              />
            </div>
          </b-form-group>
        </b-form>
      </div>
    </b-modal>

    <b-modal ref="modal-uploading" centered hide-header hide-footer>
      <div align="center">
        <b-spinner class="spinner">{{ uploadProgress.state }}</b-spinner>
        <p v-if="uploadProgress.state === 'Uploading Image'">
          Uploaded {{ uploadProgress.percentage }}%
        </p>
      </div>
    </b-modal>

    <b-modal ref="update-toko" centered hide-header hide-footer>
      <div align="center">
        <b-spinner class="spinner">Update Toko...</b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { isLoggedIn, getCookie, parseJwt } from "../mixins/index";
import { storage } from "../firebase/index";
import { baseUrl } from "../config/index.js";
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      uploadProgress: {
        state: "",
        percentage: 0,
        imageUrl: "",
      },
      profile: {
        toko_id: "",
        nama: "",
        alamat: "",
        nohp: "",
        tokopedia: "",
        shopee: "",
        instagram: "",
      },
      formAddProduct: {
        namaProduk: "",
        kategoriId: "",
        harga: "",
        image: null,
      },
      listProduct: [],
      listKategori: [],
      productList: [],
    };
  },
  created() {
    if (!isLoggedIn()) {
      alert("You need to logged in");
      location.href = "/login";
    } else {
      // get data from jwt
      const token = getCookie("token");
      const toko_id = parseJwt(token).toko_id;
      const user_id = parseJwt(token).user_id;
      // get profile data
      axios
        .get(`${baseUrl}/toko/${user_id}`)
        .then((res) => {
          this.profile = res.data.data;
          this.profile.toko_id = toko_id;
        })
        .catch((e) => {
          console.log(e);
        });

      // get produk
      axios
        .get(`${baseUrl}/products/${toko_id}`)
        .then((res) => {
          this.listProduct = res.data.data;
        })
        .catch((e) => {
          alert(e);
        });

      // get kategori
      axios
        .get(`${baseUrl}/kategori`)
        .then((res) => {
          this.listKategori = res.data.data;
        })
        .catch((e) => {
          alert(e);
        });
    }
  },
  methods: {
    updateToko(e) {
      e.preventDefault();
      const data = this.profile;
      this.$refs["update-toko"].show();
      axios
        .post(`${baseUrl}/update-toko`, this.profile)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          alert(e);
        })
        .finally(() => {
          this.$refs["update-toko"].hide();
          location.reload();
        });
    },
    onSubmit(e) {
      e.preventDefault();
      console.log(this.formAddProduct);
      if (
        this.formAddProduct.namaProduk !== "" &&
        this.formAddProduct.harga !== "" &&
        this.formAddProduct.image !== null
      ) {
        // show modal spinner for uploading image
        this.uploadProgress.state = "Uploading Image";
        this.$refs["modal-uploading"].show();

        const imageName = `${Date.now()}-${this.formAddProduct.image.name}`;
        const uploadTask = storage
          .ref(`images/${imageName}`)
          .put(this.formAddProduct.image);
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
                console.log(url);
                this.uploadProgress.state = "Adding Product to Database";
                this.uploadProgress.imageUrl = url;
                // add product to database
                axios
                  .post(`${baseUrl}/add-product`, {
                    toko_id: this.profile.toko_id,
                    nama: this.formAddProduct.namaProduk,
                    harga: this.formAddProduct.harga,
                    kategori_id: this.formAddProduct.kategoriId,
                    imageUrl: url,
                  })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((e) => {
                    console.log(e);
                    alert("adding product failed");
                  })
                  .finally(() => {
                    this.$refs["modal-uploading"].hide();
                    location.reload();
                  });
              });
          }
        );
      }
    },
    onReset(e) {
      e.preventDefault();
    },
    showFormAddProduct() {
      this.$refs["modal-add-product"].show();
    },
    priceFormat(price) {
      if (price !== "0") {
        return new Intl.NumberFormat().format(price);
      }
      return "Tanya penjual";
    },
  },
  computed: {
    imagePreviewUrl() {
      if (this.formAddProduct.image) {
        return URL.createObjectURL(this.formAddProduct.image);
      }
      return null;
    },
    computedListKategori() {
      return this.listKategori.map((kategori) => {
        return {
          value: kategori.id,
          text: kategori.nama,
        };
      });
    },
  },
};
</script>

<style lang="css" scoped>
/* Modal */
#image-preview {
  display: flex;
  margin-top: 8px;
}
#image-preview img {
  height: 150px;
  width: auto;
}
.upload-file {
  text-align: left;
}
/* Profile Toko (sebelah kiri) */
.profile-container {
  margin: 32px;
}
.profile-toko {
  margin: 32px;
}
#avatar-toko {
  margin-bottom: 20px;
}
.btn-update {
  background-color: #424874;
  color: white;
  margin-top: 8px;
  border: 0px;
}
.btn-update:hover {
  background-color: #e11d74;
}
.btn-update:active {
  background-color: #424874;
}
.spinner {
  color: #c3aed6;
}
/* List Product (sebelah kanan) */

/* Tombol Tambah Produk */
.add-product,
.add-product:active,
.add-product:active,
.add-product:focus {
  width: 50%;
  background-color: #424874;
  color: white;
  margin-top: 32px;
  border: 0px;
}
.add-product:hover {
  background-color: #e11d74;
}

/* List Produk */
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  justify-content: space-around;
  column-gap: 4px;
  margin: 20px;
  margin-left: 32px;
  margin-right: 32px;
}
/* Item */
.product-item {
  margin-bottom: 20px;
}
.product-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
  width: inherit;
}
/* Gambar dalam item */
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
/* Supaya card bootstrapnya gaada padding */
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
.title-nama-toko {
  font-size: 2.75rem;
}
@media (max-width: 800px) {
  .profile-container {
    margin: 4px;
  }
  .jumbo-title {
    font-size: 2rem;
  }
  .title-nama-toko {
    font-size: 1.5rem;
  }
  #kiri {
    margin-bottom: 8px;
  }
  .add-product {
    width: 75%;
    margin: 8px;
    margin-top: 32px;
  }
  .product-container {
    grid-template-columns: repeat(auto-fill, 200px);
  }
}
</style>
