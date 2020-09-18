<template>
  <div class="login">
    <div class="login-container">
      <b-row>
        <b-col cols="12" md="12" lg="6">
          <div class="login-image">
            <h2>Punya Saran buat Bibit?</h2>
            <p>titip saran untuk bibit yang lebih baik</p>
            <br />
            <img :src="imageSource" alt="Two humans" />
          </div>
        </b-col>
        <b-col cols="12" md="12" lg="6">
          <b-card>
            <div class="form-saran">
              <b-form @submit="onSubmit" @reset="onReset">
                <b-form-textarea
                  placeholder="Tulis saran kamu di sini..."
                  v-model="form.saran"
                  rows="4"
                  :state="form.saran.length <= 140 ? null : false"
                >
                </b-form-textarea>
                <div align="right">
                  <small>{{ form.saran.length }}/140</small>
                </div>
                <b-button class="btn-saran" block type="submit">Kirim</b-button>
              </b-form>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <b-modal ref="modal-loading" centered hide-footer hide-header>
      <div align="center">
        <b-spinner label="Spinning" class="spinner"></b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { parseJwt, setCookie } from "../../mixins";
import { baseUrl } from "../../config";

export default {
  name: "Saran",
  data() {
    return {
      form: {
        saran: "",
      },
      imageChoices: [
        require("../../assets/img/saran1.png"),
        require("../../assets/img/saran2.png"),
      ],
    };
  },
  computed: {
    imageSource() {
      const randomIdx = Math.floor(Math.random() * this.imageChoices.length);
      return this.imageChoices[randomIdx];
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (this.form.saran.length <= 140) {
        alert(`kirim saran: ${this.form.saran}`);
      } else {
        alert("karakter melebihi batas");
      }
    },
    onReset() {},
    getGoogleToken() {
      this.$gAuth
        .getAuthCode()
        .then((res) => {
          console.log(`dari google auth ${res}`);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="css" scoped>
.title {
  margin: 32px;
}
.form-saran {
  text-align: left;
  padding: 16px;
  padding-bottom: 0px;
}
.login-container {
  margin: 128px;
}
.btn-saran {
  background-color: #424874;
  border: 0;
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 1.5rem;
}
.btn-saran:hover {
  background-color: #8675a9;
}
.register-now {
  text-align: center;
  font-size: 14px;
}
.register-now a {
  color: #424874;
}
.login-image {
  padding-top: 16px;
  padding-bottom: 16px;
  color: #424874;
}
.login-image img {
  height: 180px;
}
@media (max-width: 480px) {
  .login-container {
    margin: 4px;
  }
  .login-image {
    margin: 4px;
  }
  .login-image img {
    height: 150px;
  }
}
.spinner {
  color: #c3aed6;
}
</style>
