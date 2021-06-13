import Login from './components/Login.vue';
import Header from './components/Header.vue';
import Home from './components/Home.vue';
import UserInfo from './components/UserInfo.vue';
import Signup from './components/Signup.vue';
import HoldEvent from './components/HoldEvent.vue';
import SignupInfo from './components/SignupInfo.vue';

export const routes = [
  {
    path: '/login',
    components: {
      default: Login,
      nav: Header
    },
    meta:{
      isLogin:false
    }
  },
  {
    path: '/signup',
    components:{
      default: Signup,
      nav: Header
    },
    meta:{
      isLogin:false
    }
  },
  {
    path: '/signup/info',
    components:{
      default: SignupInfo,
      nav: Header
    },
    meta:{
      isLogin:false
    }
  },
  {
    path: '/',
    components: {
      default: Home,
      nav: Header
    },    
    meta:{
      isLogin:false
    }
  },
  {
    path: '/userInfo',
    components: {
      default: UserInfo,
      nav: Header
    },
    meta:{
      isLogin:true
    }
  },
  {
    path: '/holdEvent',
    components: {
      default: HoldEvent,
      nav: Header
    },
    meta:{
      isLogin:true
    }
  },
  {
    path: '*',
    redirect: '/',
  }
];