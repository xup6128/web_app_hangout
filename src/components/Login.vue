<template>
  <div class="login">
    <h1>會員登入</h1>
    <form @submit.prevent="login">
      <label for="Name">信箱</label><br>
      <input type="text" id="Name" name="Account" v-model="userName" required ref="AccountName"><br>
      <label for="Password">密碼</label><br>
      <input type="password" id="Passward" name="Account" v-model="password" required><br><br>
      <div class="checkBoxs">
        <input type="checkbox"><p>記住帳號</p>
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
        persistence: 'true',
      }
    },
    mounted() {
      this.focusInput()
    },
    methods: {
      login(){
        //write login authencation logic here!
        if( this.userName == 'aaa' && this.password == '111' ){
          this.$cookies.set("token","isLogin",60 *60 *24 *3);
          this.$router.push('/');
        } else{
          alert('login failed')
        }
      },
      focusInput(){
        this.$refs.AccountName.focus();
      },
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