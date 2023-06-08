<template>
<div class="vh-100 d-flex justify-content-center align-items-center">
            <div class="col-md-4 p-5 shadow-sm border rounded-4 border-secondary bg-light-subtle">
              <h2 class="text-center mb-4 text-primary">Enchanted Realm</h2>
              <h4 class="text-center mb-4">Anmelden</h4>
                <label v-if="this.message!=''" for="inputUsername" class="form-label text-danger">{{ this.message }}</label>
                <div>
                    <div class="mb-3">
                        <label for="inputUsername" class="form-label">Benutzername</label>
                        <input type="username" class="form-control border border-primary" id="inputUsername" v-model="this.username">
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Passwort</label>
                        <input type="password" class="form-control border border-primary" id="inputPassword" v-model="this.password">
                    </div>
                        <p class="small"><router-link to="game" class="text-primary">Als Gast spielen</router-link></p>
                    <div class="d-grid">
                        <button class="btn btn-primary" v-on:click="login()">Login</button>
                    </div>
                </div>
                <div class="mt-3">
                    <p class="mb-0  text-center">Du besitzt noch keinen Account? <router-link to="register" 
                            class="text-primary fw-bold">Hier registrieren</router-link></p>
                </div>
              <div class="mt-3">
                    <p class="mb-0  text-center">Du willst deinen Account löschen? <router-link to="delete"
                            class="text-primary fw-bold">Hier Account löschen</router-link></p>
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
        async login() {
            let result = await request('/login', 'POST', {username:this.username, password:this.password});
            if(result.status != 200) {
                this.message = result.body.msg;
            } else {
                this.$router.push("/game");
            }
        },
    }
}
</script>