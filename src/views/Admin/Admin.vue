<template>
  <div class="login" v-if="validUser">
    <div class="jumbo">
      <h2 class="jumbo-title">
        Admin Lalala~
      </h2>
    </div>
    <b-row>
      <b-col>
        <div class="user-mgt-container">
          <div class="form-register">
            <b-card>
              <h2 class="user-mgt-title">User Management</h2>
              <b-table :items="listUser" :fields="fieldTableUser">
              <template v-slot:cell(action)="row">
                <div align="center">
                <b-form-checkbox v-model="row.item.active" switch v-on:change="toggleStatusActive(row.item)">
                </b-form-checkbox>
                </div>
              </template>
            </b-table>
            </b-card>
          </div>
        </div>
      </b-col>
      <b-col>
        <div class="kategori-mgt-container">
          <b-card>
            <div class="table-header">
              <h2>Kategori</h2>
              <b-button
                v-on:click="showAddKategoriModal"
                class="mb-3"
                variant="primary"
              >
                Tambah Kategori
              </b-button>
            </div>

            <b-table :items="listKategori" :fields="fieldTableKategori">
              <template v-slot:cell(action)="row">
                <b-button size="sm" @click="editKategori(row.item.id)">
                  Edit
                </b-button>
              </template>
            </b-table>
          </b-card>
        </div>
        <b-modal
          @ok="submitNewKategori"
          centered
          ref="modal-add-kategori"
          title="Tambah Kategori"
        >
          <b-form-group label="Nama Kategori" label-for="add-kategori-nama">
            <b-form-input v-model="formAddKategori.nama" id="add-kategori-nama">
            </b-form-input>
          </b-form-group>
        </b-modal>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-modal ref="loading" centered hide-header hide-footer>
      <div align="center">
        <b-spinner></b-spinner>
        Loading...
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../../config/index.js";
import { getJwtData, getCookie } from "../../mixins/index.js";
export default {
  name: "Admin",
  created() {
    // check if admin
    if (getJwtData().email !== "syafiq.abdillah@ui.ac.id") {
      location.href = "/";
    } else {
      this.validUser = true;
    }
  },
  mounted() {
    // get kategori data
    axios
      .get(`${baseUrl}/kategori`)
      .then((res) => {
        this.listKategori = res.data.data;
      })
      .catch((e) => {
        alert(e);
      });
    const jwt = getCookie('token');
    axios.get(`${baseUrl}/users/${jwt}`)
    .then(res => this.listUser = res.data.data)
    .catch(e => alert(e))
  },
  data() {
    return {
      listKategori: [],
      listUser: [],
      fieldTableKategori: ["id", "nama", "action"],
      fieldTableUser: ["nama", "email", { label: "Active", key: 'action' }],
      formAddKategori: {
        nama: "",
      },
      validUser: false
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
    },
    onReset() {},
    editKategori(id) {
      alert(id);
    },
    showAddKategoriModal() {
      this.$refs["modal-add-kategori"].show();
    },
    submitNewKategori(e) {
      e.preventDefault();
      this.$refs["loading"].show();
      axios
        .post(`${baseUrl}/add-kategori`, this.formAddKategori)
        .then((res) => {
        })
        .catch((e) => {
          alert(e);
        })
        .finally(() => {
          this.$refs["loading"].hide();
          location.reload();
        });
    },
    toggleStatusActive(item) {
      axios.post(`${baseUrl}/update-user-status`, {
        email: item.email,
        active: !item.active
      })
    }
  },
};
</script>

<style>
.title {
  margin: 32px;
}
.user-mgt-title,
.toko-mgt-title {
  text-align: center;
}
.form-register {
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
.jumbo {
  background-color: #424874;
  padding: 32px;
  padding-top: 32px;
  color: white;
}
.jumbo-title {
  font-size: 3.5rem;
}
.user-mgt-container,
.toko-mgt-container,
.kategori-mgt-container {
  margin: 32px;
}
/* header table */
.table-header {
  display: flex;
  justify-content: space-between;
  padding-left: 32px;
  padding-right: 32px;
}
</style>
