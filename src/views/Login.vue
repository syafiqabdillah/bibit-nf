<template>
  <div class="login">
    <div class="login-container">
      <b-row>
        <b-col cols="12" md="6" lg="6">
          <div class="login-image">
            <img src="../assets/img/login.png" alt="Two humans" />
          </div>
        </b-col>
        <b-col cols="12" md="6" lg="6">
          <b-card>
            <div class="form-login">
              <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                  id="input-group-email"
                  label="Email address:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
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
                <b-button class="btn-login" block type="submit">Login</b-button>
              </b-form>
              <div class="register-now">
                <a href="/register">Belum punya akun? Daftar sekarang</a>
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

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$refs["modal-loading"].show();
      axios
        .post("http://localhost:5000/login", this.form)
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
.register-now {
  text-align: center;
  font-size: 14px;
}
.register-now a {
  color: #424874;
}
.login-image {
  padding-top: 16px;
}
.login-container {
  margin: 64px;
  margin-right: 128px;
  margin-left: 128px;
}
.spinner {
  color: #c3aed6;
}
</style>
