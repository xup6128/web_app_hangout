<template>
  <div class="login">
    <h1>會員登入</h1>
    <form @submit.prevent="login">
      <label for="Name">信箱</label><br>
      <input type="text" id="Name" name="Account" v-model="userName" required ref="AccountName"><br>
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
  export default {
    data () {
      return {
        userName: '',
        password: '',
        remember: '',
        persistence: '',
      }
    },
    mounted() {
      this.$refs.AccountName.focus();
      this.isRemember()
    },
    methods: {
      login(){
        //IF成功登入
        if( this.userName == 'aaa' && this.password == '111' ){
          //記住帳號
          if(this.remember){
            this.$cookies.set("userName", this.userName, 60*60*24*30);
          }else{
            this.$cookies.remove("userName");
          }
          //保持登入
          if(this.persistence){
            this.$cookies.set("token","isLogin",60 *60 *24)*3;
          }else{
            this.$cookies.set("token","isLogin");
          }

          this.$router.push('/');

        } else{
          alert('login failed')
        }
      },
      isRemember(){
       if( this.$cookies.get("userName")){
          this.userName =  this.$cookies.get("userName");
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