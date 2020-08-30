<template>
  <div class="login">
    <div class="jumbo">
      <h1 class="jumbo-title">
        Register
      </h1>
    </div>
    <div class="login-container">
      <b-row>
        <b-col></b-col>
        <b-col cols="12" md="8" lg="6">
          <div class="form-login">
            <b-card>
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
                  label="Email address:"
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
            </b-card>
          </div>
        </b-col>
        <b-col></b-col>
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
  name: "Register",
  data() {
    return {
      form: {
        nama: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$refs["modal-loading"].show();
      axios
        .post("http://localhost:5000/register", {
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

<style>
.title {
  margin: 32px;
}
.form-login {
  text-align: left;
}
.btn-login {
  background-color: #c3aed6;
  border: 0;
  margin-top: 32px;
  font-size: 1.5rem;
}
.btn-login:hover {
  background-color: #424874;
}
.btn-login:active {
  background-color: #e11d74;
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
.login-container {
  margin: 32px;
}
.spinner {
  color: #c3aed6;
}
</style>
