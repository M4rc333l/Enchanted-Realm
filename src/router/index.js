import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import GameView from '../views/GameView.vue'
import DeleteUserView from "@/views/DeleteUserView";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },{
    path: '/register',
    name: 'register',
    component: RegisterView
  },{
    path: '/game',
    name: 'game',
    component: GameView
  },
  {
    path: '/delete',
    name: 'delete',
    component: DeleteUserView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
