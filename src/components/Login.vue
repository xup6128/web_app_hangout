<template>
  <div class="login">
    <header><h1>會員登入</h1></header>
    <form @submit.prevent="login">
      <label for="Name">信箱</label><br>
      <input type="text" id="Name" name="Account" v-model="account" required ref="Account"><br>
      <label for="Password">密碼</label><br>
      <input type="password" id="Passward" name="Account" v-model="password" required ref="Passward"><br><br>
      <div class="checkBoxs">
        <input type="checkbox" v-model="remember"><p>記住帳號</p>
        <input type="checkbox" v-model="persistence"><p>保持登入狀態</p>
      </div>
      <button type="button" class="button--red" @click="login()">登入</button><br>
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
        account: '',
        password: '',
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

        // this.$cookies.set("token","isLogin");
        // this.$cookies.set("MemberId", "67", 60*60*24*30);
        // return

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

<style scoped>
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
header {
  text-align: center;
}
.checkBoxs{
  display: flex;
  align-items: center;
}
input {
  background-color: #FFF;
  font-size: 1.5em;
  height: 1em;
  padding-top: 0.3em;
}
label {
  font-size: 1.5em;
  display: inline-block;
  margin-top: 0.67em;
}
.button--red {
  color: white;
  background-color: #ed1c40;
  font-size: 1.5em;
  width: 100%;
  border: 0;
  padding: 0.4em 0;
  margin-top: 0.67em;
}
.button--red:hover {
  background-color: #d81b3b;
  cursor: pointer;
}
</style>