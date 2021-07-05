<template>
  <header class="header">
    <div class="header__logo">
      <h1><router-link to="/">Hangout</router-link></h1>
    </div>
    <div class="header__tool">
      <ul v-if="isLogin" class="header__tool__ul">
        <li class="header__tool__li holdEvent">
          <router-link to="/holdEvent">我要發起活動</router-link>
        </li>

        <li
          @mouseenter="dropdown($event)"
          @mouseleave="headsup($event)"
          class="header__tool__li gradient"
        >
          通知
          <ul class="notification">
            <li class="notification__readAll"><div class="notification__readAll__button" @click="notificationReadAll">全部已讀</div></li>
            <li
              class="notification__list"
              v-for="n in notices"
              :key="n.noticeId"
              @click="goEvent(n.noticeId)"
            >
              <router-link
                class="notification__router"
                :to="`/Event/${n.eventId}`"
              >
                <figure class="member__img">
                  <img
                    :src="getImg(n.memberPhoto)"
                    alt=""
                    class="image--resp"
                  />
                </figure>
                <div>
                  <h4>{{ n.name }}：</h4>
                  <h4 class="message__text">{{ n.content }}</h4>
                </div>
                <div v-show="n.status === 0" class="unread"></div>
              </router-link>
            </li>
          </ul>
        </li>

        <li
          @mouseenter="dropdown($event)"
          @mouseleave="headsup($event)"
          class="header__tool__li gradient"
        >
          會員中心
          <ul class="accountCenter">
            <li class="accountCenter__list" @click="reload">
              <router-link :to="`/AccountInfo/${$cookies.get('MemberId')}`"
                >會員資料</router-link
              >
            </li>
            <li class="accountCenter__list">
              <router-link to="/ManageEvent">管理活動</router-link>
            </li>
          </ul>
        </li>
        <li class="header__tool__li">
          <a href="" @click.prevent="logout">登出</a>
        </li>
      </ul>
      <ul v-else class="header__tool__ul">
        <li class="header__tool__li holdEvent">
          <router-link to="/holdEvent">我要發起活動</router-link>
        </li>
        <li class="header__tool__li">
          <router-link to="/login">登入</router-link>
        </li>
        <li class="header__tool__li">
          <router-link to="/signup">註冊</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { apiNoticeGet, apiMemberGet, apiNoticePut } from "../api";

export default {
  inject: ["reload"],
  data() {
    return {
      isLogin: this.$cookies.get("token") === "isLogin",
      notices: [],
    };
  },
  created() {

    console.log("IsLogin:", this.isLogin)

    if (this.isLogin) {
        
      apiNoticeGet()
        .then((res) => {

          console.log(res)
          if (!Array.isArray(res.data)) {
              console.log("IS NOT ARRAY", res.data)
              return;
          }
          console.log("apiNoticeGet", res.data)

          //過濾掉自己對自己發送的通知
          this.notices = res.data.filter( n => n.protagonistId != this.$cookies.get("MemberId"))

          this.notices.sort(function (a, b) {
              return a.noticeId<b.noticeId?1:-1;
          });

          this.getMembersApi(this.notices);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    logout() {
      $cookies.remove("token");
      $cookies.remove("MemberId");
      this.isLogin = false;
      this.$router.push("/");
      alert("已登出會員");
    },
    dropdown(e) {
      // document.querySelector('.accountCenter').style.display = 'block';
      // console.log(e.target.childNodes)
      e.target.childNodes[1].style.display = "block";
    },
    headsup(e) {
      // document.querySelector('.accountCenter').style.display = 'none';
      // console.log(e.target.childNodes)
      e.target.childNodes[1].style.display = "none";
    },
    async getMembersApi(arrs) {
      const promises = arrs.map(async (item) => {
        const p = await apiMemberGet(item.protagonistId);
        return p;
      });
      //將promises陣列解析成data陣列
      const promise = await Promise.all(promises);
      const members = promise.map((p) => {
        return p.data;
      });

      //將API資料依序新增在陣列裡面
      arrs.forEach((item, index) => {
        this.$set(item, "name", members[index].name);
        this.$set(item, "memberPhoto", members[index].memberPhoto[0]);
      });
      console.log(arrs);
    },
    getImg(url) {
      return `http://35.229.140.28/${url}`;
    },
    goEvent(id){
      
      apiNoticePut(id)
      .then(res =>{
        console.log(res)
        this.reload()
      })
      .catch(err =>{
        console.log(err)
      })

    },
    notificationReadAll(){

      this.notices.forEach( n =>{
        n.status = 1
        apiNoticePut(n.noticeId)
      })

    }
  },
};
</script>

<style>
.header {
  /* border: 1px solid black; */
  padding-left: 6em;
  padding-right: 6em;
  display: flex;
  background-color: #fff;
  border-bottom: 3px solid #e1e1e1;
}
.header a {
  text-decoration: none;
  color: #595959;
}
.header__tool {
  margin-left: auto;
  position: relative;
}
.header__tool__ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin-top: 0;
  height: 100%;
  align-items: center;
}
.header__tool__li {
  margin-left: 2.5em;
  cursor: pointer;
}
.gradient {
  position: relative;
}
.accountCenter {
  display: none;
  z-index: 1;
  list-style-type: none;
  position: absolute;
  width: 200%;
  left: 0%;
  top: 100%;
  padding-left: 0;
  background-color: #f5f5f3;
  box-shadow: 5px 5px 5px rgba(156, 156, 156, 0.698);
  border-radius: 10px;
  text-align: center;
}
.notification__list:hover,
.accountCenter__list:hover {
  background-color: #e2e2e0;
  border-radius: 10px;
}
.accountCenter__list {
  padding: 0.5em 0.67em;
}
.holdEvent {
  border-radius: 25px;
  padding: 0.67em 1.2em;
  background-color: #ffd934;
}
.holdEvent:hover {
  background-color: #eecc34;
}
.mail__icon {
  display: block;
  background-image: url("../assets/Email.png");
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
}
.notification {
  display: none;
  z-index: 1;
  list-style-type: none;
  position: absolute;
  width: 900%;
  height: 3000%;
  overflow-x: auto;
  overflow-y: scroll;
  left: 0%;
  top: 100%;
  padding-left: 0;
  background-color: #f5f5f3;
  box-shadow: 5px 5px 5px rgba(156, 156, 156, 0.698);
  border-radius: 10px;
  text-align: center;
}
.member__img {
  width: 40px;
  height: 40px;
  border: 1px solid #cfcfcf;
  border-radius: 999em;
  overflow: hidden;
  margin-right: 0.5em;
}
.notification__list {
  padding: 0.5em 0.67em;
  text-align: left;
}
.notification__list figure {
  margin: 0;
}
.notification__list h4 {
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0.5em;
  font-size: 0.9em;
}
.notification__router {
  display: flex;
  align-items: center;
  width: 100%;
}
.unread{
  width: 10px;
  height: 10px;
  background-color: rgba(255, 166, 0, 0.767);
  margin-left: auto;
  border-radius: 999em;
}
.notification__readAll{
  padding: .5em;
}
.notification__readAll__button{
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid;
  width: max-content;
  padding: .5em;
  font-size: .8em;
  margin-left: 100%;
  transform: translateX(-100%);
}
.notification__readAll__button:hover{
  background-color: #363636;
  color: white;
}
</style>