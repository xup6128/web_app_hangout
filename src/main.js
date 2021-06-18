// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { routes } from './routes' 
import VueCookies from 'vue-cookies'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueCookies)


const router = new VueRouter({
  routes,
  mode: 'history'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

router.beforeEach((to, from, next)=>{
  if($cookies.get('token') === 'isLogin' ){
    next();
  } else {
    if( to.meta.isLogin){
      next('/login');
      alert('請先登入會員')
    }
    else{
      next();
  }}
})
