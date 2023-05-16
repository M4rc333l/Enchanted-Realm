import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import GameView from '../views/GameView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },{
    path: '/game',
    name: 'game',
    component: GameView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
