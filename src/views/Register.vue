<template>
  <div class="login">
    <div class="login-container">
      <b-row>
        <b-col cols="12" md="6" lg="6">
          <div class="login-image">
            <h2>Bantuin Bisnis Teman</h2>
            <p>Kalau bisa beli lewat teman sendiri, kenapa nggak?</p>
            <img :src="imageSource" alt="One person" />
          </div>
        </b-col>
        <b-col cols="12" md="6" lg="6">
          <b-card>
            <div class="form-login">
              <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                  id="input-group-password-confirm"
                  label="Nama:"
                  label-for="input-4"
                >
                  <b-form-input
                    id="input-4"
                    v-model="form.nama"
                    required
                    placeholder="Your name"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-email"
                  label="Email:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Your email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-password"
                  label="Password:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Your password"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-password-confirm"
                  label="Confirm Password:"
                  label-for="input-3"
                >
                  <b-form-input
                    id="input-3"
                    v-model="form.passwordConfirmation"
                    type="password"
                    required
                    placeholder="Confirm password"
                  ></b-form-input>
                </b-form-group>

                <b-button class="btn-login" block type="submit"
                  >Register</b-button
                >
              </b-form>
              <div class="login-now">
                <a href="/login">Sudah punya akun? Login sekarang</a>
              </div>
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
import { parseJwt, setCookie } from "../mixins/index.js";
import { baseUrl } from "../config/index.js";

export default {
  name: "Register",
  data() {
    return {
      form: {
        nama: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      imageChoices: [
        require("../assets/img/register1.png"),
        require("../assets/img/register2.png"),
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
      this.$refs["modal-loading"].show();
      axios
        .post(`${baseUrl}/register`, {
          nama: this.form.nama,
          email: this.form.email,
          password: this.form.password,
        })
        .then((res) => {
          const jwt = res.data.jwt;
          const data = parseJwt(jwt);
          setCookie("token", jwt, 1);
          location.href = "/";
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.$refs["modal-loading"].hide();
        });
    },
    onReset() {},
  },
};
</script>

<style lang="css" scoped>
.title {
  margin: 32px;
}
.form-login {
  text-align: left;
  padding: 16px;
}
.btn-login {
  background-color: #424874;
  border: 0;
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: 1.5rem;
}
.btn-login:hover {
  background-color: #8675a9;
}
.login-image {
  padding: 24px;
  color: #424874;
}
.login-image img{
  height: 300px;
}
.login-container {
  margin: 128px;
  margin-top: 64px;
}
.spinner {
  color: #c3aed6;
}
.login-now {
  text-align: center;
  font-size: 14px;
}
.login-now a{
  color: #424874;
}
</style>
