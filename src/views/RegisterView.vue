<template>
    <div class="vh-100 d-flex justify-content-center align-items-center">
                <div class="col-md-4 p-5 shadow-sm border rounded-4 border-secondary bg-light-subtle">
                  <h2 class="text-center mb-4 text-primary">Enchanted Realm</h2>
                  <h4 class="text-center mb-4">Registrieren</h4>
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
                        <div class="mb-3">
                            <label for="inputPasswordRepeat" class="form-label">Passwort wiederholen</label>
                            <input type="password" class="form-control border border-primary" id="inputPasswordRepeat" v-model="this.passwordRepeat">
                        </div>
                        <p class="small"><router-link to="game" class="text-primary" v-on:click="logout()">Als Gast spielen</router-link></p>
                        <div class="d-grid">
                            <button class="btn btn-primary" v-on:click="register()">Register</button>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="mb-0  text-center">Du besitzt bereits einen Account? <router-link to="login" 
                                class="text-primary fw-bold">Hier anmelden</router-link></p>
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
            passwordRepeat: '',
            message: ''
        }
    },
    methods: {
        async register() {
          await request('/logout', 'GET');
            if(this.password != this.passwordRepeat) {
                this.message = 'Die Passwörter stimmen nicht überein.';
                return;
            }
            let result = await request('/register', 'POST', {username:this.username, password:this.password});
            if(result.status != 200) {
                this.message = result.body.msg;
            } else {
                this.$router.push("/game");
            }
        },
      async logout() {
        await request('/logout', 'GET');
      }
    }
}
</script>