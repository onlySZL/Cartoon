import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Me from '../views/Me.vue'
import Login from '../views/Login.vue'
import Book from '../views/Book.vue'
import Recom from '../views/Recom.vue'
import Classify from '../views/Classify.vue'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)


const routes = [
  {
    path: '/topnumber',
    name: 'topnumber',
    component: () => import('../views//Topnumber.vue'),
  },
  {
    path: '/selectes',
    name: 'selectes',
    component: () => import('../views/Selectes.vue'),
    // meta:{keepAlive:true}

  },
  {
    path: '/select',
    name: 'select',
    component: () => import('../views/Select.vue'),
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import('../views/Comment.vue'),
  },
  {
    path: '/quit',
    name: 'quit',
    component: () => import('../views/Quit.vue'),
  },
  {
    path: '/myself',
    name: 'myself',
    component: () => import('../views/Myself.vue'),
    beforeEnter: (to, from, next) => {
      console.log(to)
      window.sessionStorage.setItem("toPath",to.fullPath)
      if(window.sessionStorage.getItem("islogin")){
        next()
      }else{
        next('/login')
      }
    }
  },
  {
    path: '/cooperation',
    name: 'cooperation',
    component: () => import('../views/Cooperation.vue'),
    beforeEnter: (to, from, next) => {
      console.log(to)
      window.sessionStorage.setItem("toPath",to.fullPath)
      if(window.sessionStorage.getItem("islogin")){
        next()
      }else{
        next('/login')
      }
    }
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/Article.vue'),
    beforeEnter: (to, from, next) => {
      console.log(to)
      window.sessionStorage.setItem("toPath",to.fullPath)
      if(window.sessionStorage.getItem("islogin")){
        next()
      }else{
        next('/login')
      }
    }
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../views/Personal.vue'),
  
  },

  {
    path: '/classify',
    component: Classify,
  },
  {
    path: '/recom',
    name:'recom',
    component: Recom,
    meta:{keepAlive:true}
  },
  {
    path: '/book',
    component: Book,
  },
  {
    path: '/login',
    component: Login,
    name:'Login'
  },
{
    path: '/me',
    component: Me,
    name:'Me'
  },      
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{keepAlive:true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  //刷新回到首页导航栏,无论在哪个导航栏
  scrollBehavior (to, from, savedPosition) {
    if(from.name=='Home' && to.name=='recom'){
      //刷新首页,回到顶部
      return {x:0,y:0}
    }else if(from.name=='recom' && to.name=='Home'){
       //刷新首页,回到顶部
       return {x:0,y:0}
    }else{
      return savedPosition;
    }
    
  }


  
 
})


export default router
