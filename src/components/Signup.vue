<template>
  <div class="signup">
    <header class="signup__header"><h1>立即註冊</h1></header>
    <form @submit.prevent="Signup">

      <label>姓名</label><br>
      <input type="text" v-model.lazy="name" required placeholder="請輸入名稱 "><br>
      <div class="invalid-feedback">
        {{nameErrMsg}}
      </div>

      <label>信箱</label><br>
      <input type="email" v-model.lazy="email" required placeholder="請輸入信箱"><br>
      <div v-show="emailError" class="invalid-feedback">
        {{ emailErrMsg }}
      </div>

      <label>密碼</label><br>
      <input type="password" v-model.lazy="password" required placeholder="請輸入密碼"><br>
      (至少8位且小於15位，必須包含大小寫和數字)<br>
      <div v-show="passwordError" class="invalid-feedback">
          {{ passErrMsg  }}
      </div>

      <label>確認密碼</label><br>
      <input type="password" v-model.lazy="rePassword" required placeholder="請再次輸入密碼"><br>
      <div v-show="rePasswordError" class="invalid-feedback">
          {{ rePassErrMsg  }}
      </div><br>

      <router-link  to="/signup/info" class="nextStep" tag="button" >Continue</router-link>
    </form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        name: '',
        nameError: false,
        nameErrMsg: '',

        password: '',
        passwordError: false,
        passErrMsg: '',

        rePassword: '',
        rePasswordError: false,
        rePassErrMsg: '請確認密碼輸入是否一致',

        email: '',
        emailError: false,
        emailErrMsg: ''
      }
    },
    watch: {
        name: function () {
            const isText = /^[a-zA-Z0-9]+$/;
            if (!isText.test(this.name)) {
                this.nameError = true;
                this.nameErrMsg = '請勿包含特殊字元';
            }
            else if (this.name.length < 2) {
                this.nameError = true;
                this.nameErrMsg = '請至少填寫2個字';
            } 
            else if (this.name.length > 20) {
                this.nameError = true;
                this.nameErrMsg = '請勿超過20個字';
            }
            else {
                this.nameError = false;
            }
        },
        password: function () {
            const isText = /^[a-zA-Z0-9]+$/;
            const include = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
            if (!isText.test(this.password)) {
                this.passwordError = true;
                this.passErrMsg = '請勿包含特殊字元';
            }
            else if (this.password.length < 8) {
                this.passwordError = true;
                this.passErrMsg = '請勿少於8個字';
            }
            else if (this.password.length > 15) {
                this.passwordError = true;
                this.passErrMsg = '請勿超過15個字';
            }
            else if (!include.test(this.password)) {
                this.passwordError = true;
                this.passErrMsg = '至少包括一個大小寫字母或數字';
            }
            else {
                this.passwordError = false;
            }
        },
        rePassword: function(){
          if (this.rePassword !== this.password){
            this.rePasswordError = true;
          }else{
            this.rePasswordError = false;
          }
        },
        email: function () {
            const isMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
            if (!isMail.test(this.email)) {
                this.emailError = true;
                this.emailErrMsg = 'email格式錯誤';
            }
            else {
                this.emailError = false;
            }
        }
    }
  }
</script>

<style scoped>
.signup{
  width: max-content;
  margin-left: auto;
  margin-right: auto;
}
.signup__header{
  text-align: center;
}
input{
  background-color: #FAFAFA;
  font-size: 1.5em;
  height: 1em;
  padding-top: .3em;
}
label{
  font-size: 1.5em;
  display: inline-block;
  margin-top: .67em;
}
.nextStep{
  color: white;
  background-color: #ED1C40;
  font-size: 1.5em;
  width: 100%;
  border: 0;
  padding: .4em 0;
  margin-top: .67em;
}
.nextStep:hover{
  background-color: #d81b3b;
  cursor: pointer;
}
.invalid-feedback{
  color: red;
}
</style>