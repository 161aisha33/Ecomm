import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TourView from '@/views/TourView.vue'
import BlogsView from '@/views/BlogsView.vue'
import MitchellsplainTour from '@/views/MitchellsplainTour.vue'
import BokaapTour from '@/views/BokaapTour.vue'
import KhayelitshaTour from '@/views/KhayelitshaTour.vue'
import LangaTour from '@/views/LangaTour.vue'
import TownshipDuo from '@/views/TownshipDuo.vue'
import FullCapeCulture from '@/views/FullCapeCulture.vue'
import Success from '@/views/Success.vue'
import Cancel from '@/views/Cancel.vue'
import TourPackages from '@/components/TourPackages.vue'
import RegisterForm from '@/views/RegisterForm.vue'
import Checkout from '@/views/Checkout.vue'
import SingleTownship from '@/views/SingleTownship.vue'

const routes = [
  {path: '/',name: 'home',component: HomeView},
  {path: '/tour',name: 'TourView',component: TourView,},
  {path: '/blog',name: 'blog',component: BlogsView},
  {path:'/duo',component:TownshipDuo},
  {path: '/single-township',name: 'SingleTownship',component: () => import('@/views/SingleTownship.vue')},
  {path:'/full',component:FullCapeCulture},
  {path:'/success',component:Success},
  {path:'/cancel',component:Cancel},
  {path:'/tours',component:TourPackages},
  {path:'/register',component:RegisterForm},
  {path:'/checkout',component:Checkout},
  {path: '/tours/langa',name: 'Langa',component: ()=> import('../views/LangaTour.vue')},
  {path: '/tours/khayelitsha',name: 'Khayelitsha',component: ()=> import('../views/KhayelitshaTour.vue')},
  {path: '/tours/bokaap',name: 'BoKaapTour',component: () =>import('@/views/BokaapTour.vue')},
  {path: '/tours/mitchellsplain',name: 'MitchellsPlain',component: ()=> import('../views/MitchellsplainTour.vue')},

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
