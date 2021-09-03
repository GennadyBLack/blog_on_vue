import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/Register'
import Login from '@/views/Login'
import GlobalFeed from '@/views/GlobalFeed'
import userProfile from '@/views/UserProfile'
import createArticle from '@/views/CreateArticle'
import YourFeed from '@/views/YourFeed'
import TagFeed from '@/views/TagFeed'
import Article from '@/views/Article'

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: GlobalFeed 
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Article
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: createArticle
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: userProfile
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed
  },

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
