import Login from './components/Login.vue';
import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Signup from './components/Signup.vue';
import HoldEvent from './components/HoldEvent.vue';
import SignupInfo from './components/SignupInfo.vue';
import Event from './components/Event.vue';
import AccountInfo from './components/AccountInfo'
import ManageEvent from './components/ManageEvent'

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
    path: '/signupInfo',
    name:'signupInfo',
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
    path: '/Event/:eventId?',
    name:'Event',
    components: {
      default: Event,
      nav: Header
    },
    meta:{
      isLogin:false
    }
  },
  {
    path: '/AccountInfo/:memberId?',
    components: {
      default: AccountInfo,
      nav: Header
    },
    meta:{
      isLogin:true
    }
  },
  {
    path: '/ManageEvent',
    components: {
      default: ManageEvent,
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