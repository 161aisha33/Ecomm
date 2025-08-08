import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TourView from '@/views/TourView.vue'
import BlogsView from '@/views/BlogsView.vue'
import MitchellsplainTour from '@/views/MitchellsplainTour.vue'
import BokaapTour from '@/views/BokaapTour.vue'
import KhayelitshaTour from '@/views/KhayelitshaTour.vue'
import LangaTour from '@/views/LangaTour.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tour',
    name: 'TourView',
    component: TourView,

  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogsView
  },
  {
    path: '/tours/langa',
    name: 'Langa',
    component: ()=> import('../views/LangaTour.vue')
  },
  {
    path: '/tours/khayelitsha',
    name: 'Khayelitsha',
    component: ()=> import('../views/KhayelitshaTour.vue')
  },
  {
    path: '/tours/bokaap',
    name: 'BoKaapTour',
    component: () =>import('@/views/BokaapTour.vue')
  },
  {
    path: '/tours/mitchellsplain',
    name: 'MitchellsPlain',
    component: ()=> import('../views/MitchellsplainTour.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
