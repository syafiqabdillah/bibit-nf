import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// Bootstrap Vue thingy
import { BootstrapVue, IconsPlugin, BIcon } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Firebase thingy
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyAMnkKm2b8URUDz_L-plHmvIqH6V_iYklc",
  authDomain: "bantu-bisnis-teman.firebaseapp.com",
  databaseURL: "https://bantu-bisnis-teman.firebaseio.com",
  projectId: "bantu-bisnis-teman",
  storageBucket: "bantu-bisnis-teman.appspot.com",
  messagingSenderId: "367856341720",
  appId: "1:367856341720:web:0df04faba3784e545cfdad",
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("BIcon", BIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
