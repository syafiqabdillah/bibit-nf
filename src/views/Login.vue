<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <b-row>
      <b-col></b-col>
      <b-col cols="12" lg="6">
        <div class="form-login">
          <b-card>
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
                label="Email address:"
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
          </b-card>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
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
};
</script>

<style>
.title {
  margin: 32px;
}
.login {
  min-height: 100%;
}
.form-login {
  text-align: left;
}
.btn-login {
  background-color: #c3aed6;
  border: 0;
}
</style>
