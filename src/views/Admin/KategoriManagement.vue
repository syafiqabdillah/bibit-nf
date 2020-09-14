<template>
  <div>
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
  name: "KategoriManagement",
  data() {
    return {
      listKategori: [],
      fieldTableKategori: ["id", "nama", "action"],
      formAddKategori: {
        nama: "",
      },
    };
  },
  created() {
    // get kategori data
    axios
      .get(`${baseUrl}/kategori`)
      .then((res) => {
        this.listKategori = res.data.data;
      })
      .catch((e) => {
        alert(e);
      });
  },
  methods: {
    showAddKategoriModal() {
      this.$refs["modal-add-kategori"].show();
    },
    toggleStatusActive(item) {
      axios.post(`${baseUrl}/update-kategori-status`, {
        id: item.id,
        active: !item.active,
      });
    },
    submitNewKategori(e) {
      e.preventDefault();
      this.$refs["loading"].show();
      axios
        .post(`${baseUrl}/add-kategori`, this.formAddKategori)
        .then((res) => {})
        .catch((e) => {
          alert(e);
        })
        .finally(() => {
          this.$refs["loading"].hide();
          location.reload();
        });
    },
  },
};
</script>

<style scoped>
/* header table */
.table-header {
  display: flex;
  justify-content: space-between;
  padding-left: 32px;
  padding-right: 32px;
}
</style>
