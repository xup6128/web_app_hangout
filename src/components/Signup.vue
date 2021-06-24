<template>
  <div class="signup">
    <header class="signup__header"><h1>立即註冊</h1></header>
    <!-- <form @submit.prevent="Signup"> -->
    <form>
      <label>信箱</label><br />
      <input
        type="email"
        v-model.lazy="email"
        required
        placeholder="請輸入信箱"
      /><br />
      <div v-show="emailError" class="invalid-feedback">
        {{ emailErrMsg }}
      </div>

      <label>密碼</label><br />
      <input
        type="password"
        v-model.lazy="password"
        required
        placeholder="請輸入密碼"
      /><br />
      (至少8位且小於15位，必須包含大小寫和數字)<br />
      <div v-show="passwordError" class="invalid-feedback">
        {{ passErrMsg }}
      </div>

      <label>確認密碼</label><br />
      <input
        type="password"
        v-model.lazy="rePassword"
        required
        placeholder="請再次輸入密碼"
      /><br />
      <div v-show="rePasswordError" class="invalid-feedback">
        {{ rePassErrMsg }}
      </div>
      <br />

      <!-- <router-link  to="/signup/info" class="nextStep" tag="button" >Continue</router-link> -->
      <button @click.stop="check" type="button" class="nextStep">下一步</button>
    </form>
  </div>
</template>

<script>
import { apiMemberCheck } from "../api";

export default {
  data() {
    return {
      email: "xup6910623@gmail.com",
      emailError: false,
      emailErrMsg: "",

      password: "Cmoney1234",
      passwordError: false,
      passErrMsg: "",

      rePassword: "Cmoney1234",
      rePasswordError: false,
      rePassErrMsg: "請確認密碼輸入是否一致",
    };
  },
  computed: {
    isEmailStatus() {
      return this.email.includes(' ');
    },
  },
  watch: {
    email() {
      // const isMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      // if (!isMail.test(this.email)) {
      if (this.isEmailStatus) {
        this.emailError = true;
        this.emailErrMsg = "email格式錯誤";
      } else {
        this.emailError = false;
      }
    },
    password() {
      const isText = /^[a-zA-Z0-9]+$/;
      const include = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
      if (!isText.test(this.password)) {
        this.passwordError = true;
        this.passErrMsg = "請勿包含特殊字元";
      } else if (this.password.length < 8) {
        this.passwordError = true;
        this.passErrMsg = "請勿少於8個字";
      } else if (this.password.length > 15) {
        this.passwordError = true;
        this.passErrMsg = "請勿超過15個字";
      } else if (!include.test(this.password)) {
        this.passwordError = true;
        this.passErrMsg = "至少包括一個大小寫字母或數字";
      } else {
        this.passwordError = false;
      }
    },
    rePassword() {
      if (this.rePassword !== this.password) {
        this.rePasswordError = true;
      } else {
        this.rePasswordError = false;
      }
    },
  },
  methods: {
    check() {

      if (this.emailError || this.passwordError || this.rePasswordError) {
        console.log("return");
        return;
      }
      const apiData = {
        account: this.email,
      }
      // console.log(apiData)
      apiMemberCheck({
        account: this.email,
      }
        )
        .then((res) => {
          console.log("信箱已註冊過："+res.data);

          if(res.data){
            this.emailError = true,
            this.emailErrMsg = "此信箱已完成註冊，請重新確認"
          }else{
            this.$router.push({name:"signupInfo", params:{email: this.email, password: this.password}})
            // this.$router.push({path:'/signupInfo', query:{emai: this.email, password: this.password}})
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.signup {
  width: max-content;
  margin-left: auto;
  margin-right: auto;
}
.signup__header {
  text-align: center;
}
input {
  background-color: #fafafa;
  font-size: 1.5em;
  height: 1em;
  padding-top: 0.3em;
}
label {
  font-size: 1.5em;
  display: inline-block;
  margin-top: 0.67em;
}
.nextStep {
  color: white;
  background-color: #ed1c40;
  font-size: 1.5em;
  width: 100%;
  border: 0;
  padding: 0.4em 0;
  margin-top: 0.67em;
}
.nextStep:hover {
  background-color: #d81b3b;
  cursor: pointer;
}
.invalid-feedback {
  color: red;
}
</style>