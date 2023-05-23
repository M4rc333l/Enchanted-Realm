<template>
    <div class="vh-100 d-flex justify-content-center align-items-center">
                <div class="col-md-4 p-5 shadow-sm border rounded-5 border-primary bg-light">
                  <h2 class="text-center mb-4 text-primary">Enchanted Realm</h2>
                  <h4 class="text-center mb-4 text-primary">Registrieren</h4>
                    <form>
                        <div class="mb-3">
                            <label for="inputUsername" class="form-label">Benutzername</label>
                            <input type="username" class="form-control border border-primary" id="inputUsername">
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword" class="form-label">Passwort</label>
                            <input type="password" class="form-control border border-primary" id="inputPassword">
                        </div>
                        <div class="mb-3">
                            <label for="inputPasswordRepeat" class="form-label">Passwort wiederholen</label>
                            <input type="password" class="form-control border border-primary" id="inputPasswordRepeat">
                        </div>
                        <p class="small"><router-link to="game" class="text-primary">Als Gast spielen</router-link></p>
                        <div class="d-grid">
                            <button class="btn btn-primary" type="submit">Login</button>
                        </div>
                    </form>
                    <div class="mt-3">
                        <p class="mb-0  text-center">Du besitzt bereits einen Account? <router-link to="login" 
                                class="text-primary fw-bold">Hier anmelden</router-link></p>
                    </div>
                </div>
            </div>
    </template>
    
    