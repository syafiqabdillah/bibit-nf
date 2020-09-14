<template>
  <div>
    <h2 class="user-mgt-title">User Management</h2>
    <b-table :items="listUser" :fields="fieldTableUser">
      <template v-slot:cell(action)="row">
        <div align="center">
          <b-form-checkbox
            v-model="row.item.active"
            switch
            v-on:change="toggleStatusActive(row.item)"
          >
          </b-form-checkbox>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../../config/index.js";
import { getJwtData, getCookie } from "../../mixins/index.js";

export default {
  name: "UserManagement",
  data() {
    return {
      listUser: [],
      fieldTableUser: ["nama", "email", { label: "Active", key: "action" }],
    };
  },
  created() {
    const jwt = getCookie("token");
    axios
      .get(`${baseUrl}/users/${jwt}`)
      .then((res) => (this.listUser = res.data.data))
      .catch((e) => alert(e));
  },
  methods: {
    toggleStatusActive(item) {
      axios.post(`${baseUrl}/update-user-status`, {
        email: item.email,
        active: !item.active,
      });
    },
  },
};
</script>

<style scoped>
.user-mgt-title {
  text-align: center;
}
</style>
