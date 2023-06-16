<template>
  <div class="vh-100 d-flex justify-content-center align-items-center">
    <div class="col-md-4 p-5 shadow-sm border rounded-4 border-secondary bg-light-subtle">
      <h2 class="text-center mb-4 text-primary">Enchanted Realm</h2>
      <h4 class="text-center mb-4">Account löschen</h4>
      <label v-if="this.message!==''" for="inputUsername" class="form-label text-danger">{{ this.message }}</label>
      <div>
        <div class="mb-3">
          <label for="inputUsername" class="form-label">Benutzername</label>
          <input type="username" class="form-control border border-primary" id="inputUsername" v-model="this.username">
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Passwort</label>
          <input type="password" class="form-control border border-primary" id="inputPassword" v-model="this.password">
        </div>
        <p class="small"><router-link to="login" class="text-primary">Zurück zum Login</router-link></p>
        <p class="mb-0  text-center">Hinweis: Das Löschen kann nicht rückgängig gemacht werden!</p>
        <div class="d-grid">
          <button class="btn btn-primary" v-on:click="deleteUser()">Account löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../scripts/request.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    }
  },
  methods: {
    async deleteUser() {
      await request('/logout', 'GET');
      let result = await request('/deleteUser', 'POST', {username: this.username, password: this.password});
      if (result.status != 200) {
        this.message = result.body.msg;
      } else {
        this.$router.push("/register");
      }
    },
  }
}
</script>