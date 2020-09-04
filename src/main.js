import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// Bootstrap Vue thingy
import { BootstrapVue, IconsPlugin, BIcon } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("BIcon", BIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
