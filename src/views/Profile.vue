<template>
  <div class="profile">
    <div class="jumbo">
      <h1 class="jumbo-title">
        <b-icon class="seen-icon" icon="shop"></b-icon>
        Profile Toko <br />
        "{{ profile.nama }}"
      </h1>
    </div>

    <div class="profile-container">
      <b-row>
        <b-col cols="12" md="4" lg="4">
          <div class="my-shop">
            <b-card>
              <b-img
                src="https://placekitten.com/300/300"
                height="150px"
                alt="Responsive image"
              ></b-img>

              <div class="profile-toko">
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
            </b-card>
          </div>
        </b-col>

        <b-col cols="12" md="8" lg="8">
          <div class="product-list">
            <b-card>
              <div align="center">
                <b-button class="add-product" v-on:click="showFormAddProduct()">
                  <b-icon class="add-product-icon" icon="plus"></b-icon>Tambah
                  Produk
                </b-button>
              </div>
              <div class="product-container">
                <b-card
                  class="product-item"
                  v-for="product in productList"
                  :key="product.id"
                  v-on:click="showDetail(product)"
                  :img-src="product.imageUrl"
                >
                  <div align="left">
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
      @show="resetModal"
      @ok="onSubmit"
      @cancel="resetModal"
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
            label="Harga"
            label-for="add-produk-image"
          >
            <b-form-file
              class="upload-file"
              id="add-produk-image"
              v-model="formAddProduct.image"
              placeholder="Pilih gambar..."
              drop-placeholder="Taruh gambar..."
            ></b-form-file>
          </b-form-group>
        </b-form>
      </div>
    </b-modal>

    <b-modal ref="modal-uploading" centered hide-header hide-footer>
      <b-spinner>{{ uploadProgress.state }}</b-spinner>
    </b-modal>

    <b-modal ref="update-toko" centered hide-header hide-footer>
      <div align="center">
        <b-spinner>Update Toko...</b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { isLoggedIn, getCookie, parseJwt } from "../mixins/index";
import { storage } from "../firebase/index";
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
        harga: "",
        image: null,
      },
      productList: [
        {
          namaProduk: "Garam Himalaya",
          namaToko: "Roemah Sehat Bontang",
          harga: 0,
          lokasi: "Bontang",
          id: "1",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753",
        },
        {
          namaProduk: "Lemonilo",
          namaToko: "Roemah Sehat Bontang",
          harga: 0,
          lokasi: "Bontang",
          id: "2",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.11.jpeg?alt=media&token=de2f1722-5c58-4091-ba1b-dee6088c4c04",
        },
        {
          namaProduk: "Chia Seed",
          namaToko: "Roemah Sehat Bontang",
          harga: 0,
          lokasi: "Bontang",
          id: "3",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.11%20(1).jpeg?alt=media&token=1cdd6b2c-cde7-4004-8f60-c8e6750f63fb",
        },
        {
          namaProduk: "Garam Himalaya",
          namaToko: "Roemah Sehat Bontang",
          harga: 0,
          lokasi: "Bontang",
          id: "4",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.12.jpeg?alt=media&token=fb6b8d98-03ef-4399-bd01-e1b368080753",
        },
        {
          namaProduk: "Lemonilo",
          namaToko: "Roemah Sehat Bontang",
          harga: 0,
          lokasi: "Bontang",
          id: "5",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.11.jpeg?alt=media&token=de2f1722-5c58-4091-ba1b-dee6088c4c04",
        },
        {
          namaProduk: "Chia Seed",
          namaToko: "Roemah Sehat Bontang",
          harga: 0,
          lokasi: "Bontang",
          id: "6",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/bantu-bisnis-teman.appspot.com/o/WhatsApp%20Image%202020-08-26%20at%2019.49.11%20(1).jpeg?alt=media&token=1cdd6b2c-cde7-4004-8f60-c8e6750f63fb",
        },
      ],
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
        .get(`http://localhost:5000/toko/${user_id}`)
        .then((res) => {
          // console.log(res.data.data)
          this.profile = res.data.data;
          this.profile.toko_id = toko_id;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  methods: {
    updateToko(e) {
      e.preventDefault();
      const data = this.profile;
      this.$refs["update-toko"].show();
      axios
        .post("http://localhost:5000/update-toko", this.profile)
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
              this.uploadProgress.imageUrl = url;
            });
        }
      );
    },
    onReset(e) {
      e.preventDefault();
    },
    showFormAddProduct() {
      this.$refs["modal-add-product"].show();
    },
    resetModal() {
      this.formAddProduct.namaProduk = "";
      this.formAddProduct.namaToko = "";
      this.formAddProduct.harga = "";
    },
  },
};
</script>

<style>
.upload-file {
  text-align: left;
}
.add-product {
  width: 50%;
  background-color: #424874;
  color: white;
  margin-top: 8px;
  border: 0px;
}
.add-product:active,
.add-product:active,
.add-product:focus {
  background-color: #424874;
}
.add-product:hover {
  background-color: #e11d74;
}
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 170px);
  justify-content: space-between;
  padding-bottom: 20px;
  column-gap: 4px;
  margin-top: 20px;
}
.product-item {
  margin-bottom: 20px;
}
.product-item:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
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
.my-shop {
  margin-bottom: 16px;
}
.profile-toko {
  margin-top: 16px;
}
.profile-input {
  margin-left: 4px;
}
.avatar-toko {
  border: 0px;
}
.jumbo {
  background-color: #424874;
  padding-bottom: 32px;
  padding-top: 16px;
  color: white;
}
.jumbo-title {
  font-size: 3.5rem;
}
.profile-container {
  margin: 32px;
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
</style>
