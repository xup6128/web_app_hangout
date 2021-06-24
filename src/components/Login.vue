<template>
  <div class="login">
    <h1>會員登入</h1>
    <form @submit.prevent="login">
      <label for="Name">信箱</label><br>
      <input type="text" id="Name" name="Account" v-model="account" required ref="Account"><br>
      <label for="Password">密碼</label><br>
      <input type="password" id="Passward" name="Account" v-model="password" required ref="Passward"><br><br>
      <div class="checkBoxs">
        <input type="checkbox" v-model="remember"><p>記住帳號</p>
        <input type="checkbox" v-model="persistence"><p>保持登入狀態</p>
      </div>
      <button type="submit">登入</button>
      <button>取消</button><br>
      <p>還不是會員嗎？<span><router-link to="/signup">點我立即註冊</router-link></span></p>
    </form>
  </div>
</template>

<script>
import { apiMemberLogin } from "../api" 

  export default {
    inject:['reload'],
    data () {
      return {
        account: 'xup6910631@gmail.com',
        password: 'Cmoney1234',
        remember: '',
        persistence: '',
      }
    },
    mounted() {
      this.$refs.Account.focus();
      this.isRemember()
    },
    methods: {
      login(){
        apiMemberLogin({
            Account: this.account,
            Password: this.password
        })
        .then(res=>{
          console.log(res.data.memberId)

          //記住使用者ID
          this.$cookies.set("MemberId", res.data.memberId, 60*60*24*30);

          //記住帳號
          if(this.remember){
            this.$cookies.set("account", this.account, 60*60*24*30);
          }else{
            this.$cookies.remove("account");
          }
          //保持登入
          if(this.persistence){
            this.$cookies.set("token","isLogin",60 *60 *24)*3;
          }else{
            this.$cookies.set("token","isLogin");
          }
          //
          this.reload();
          this.$router.push('/');

        })
        .catch(err=> {
          alert('login failed')
          console.log(err)
        })
      },
      isRemember(){
       if( this.$cookies.get("account")){
          this.account =  this.$cookies.get("account");
          this.remember = true;
          this.$refs.Passward.focus();
        }
      }
    },
  }
</script>

<style>
.login{
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  padding: 2em;
  background-color: white;
  margin-top: 5%;
  border: 1px solid black;
  box-shadow: 5px 5px 5px 0 gray;
}
.login h1{
  margin-top: 0;
}
.login input{
  font-size: 1em;
  line-height: 2em;
}
.checkBoxs{
  display: flex;
  align-items: center;
}
</style>