<template>
  <div class="login">
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
              <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                  id="input-group-nama"
                  label="Name:"
                  label-for="input-nama"
                >
                  <b-form-input
                    id="input-nama"
                    v-model="form.nama"
                    type="text"
                    required
                    placeholder="Enter name"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-email"
                  label="Email address:"
                  label-for="input-email"
                >
                  <b-form-input
                    id="input-email"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                  ></b-form-input>
                </b-form-group>

                <b-button class="btn-login" block type="submit"
                  >Register</b-button
                >
              </b-form>
            </b-card>
          </div>
        </div>
      </b-col>
      <b-col>
        <div class="toko-mgt-container">
          <b-card>
            <h2 class="toko-mgt-title">Toko Management</h2>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="kategori-mgt-container">
          <b-card>
            <h2>Kategori</h2>
            <b-button v-on:click="addKategori" class="mb-3" variant="primary">
              Tambah Kategori
            </b-button>
            <b-table :items="listKategori" :fields="fieldTableKategori">
              <template v-slot:cell(action)="row">
                <b-button size="sm" @click="editKategori(row.item.id)">
                  Edit
                </b-button>
              </template>
            </b-table>
          </b-card>
        </div>
        <b-modal centered ref="modal-add-kategori" title="Tambah Kategori">
          <b-form-group 
          label="Nama Kategori"
          label-for="add-kategori-nama"
          >
            <b-form-input v-model="formAdd.nama" id="add-kategori-nama">
              
            </b-form-input>
          </b-form-group>
        </b-modal>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      form: {
        email: "",
        nama: "",
      },
      listKategori: [
        {
          id: 1,
          nama: "Makanan",
        },
        {
          id: 2,
          nama: "Minuman",
        },
      ],
      fieldTableKategori: ["id", "nama", "action"],
      formAdd: {
        nama: ""
      }
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      console.log(form);
    },
    onReset() {},
    editKategori(id) {
      console.log(id);
    },
    addKategori() {
      this.$refs["modal-add-kategori"].show();
    },
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
</style>
