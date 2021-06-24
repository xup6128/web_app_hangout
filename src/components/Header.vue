<template>
    <header class="header">
        <div class="header__logo">
            <h1><router-link to="/">Hangout</router-link></h1>
        </div>
        <div class="header__tool">
            <ul v-if="isLogin" class="header__tool__ul">
                <li class="header__tool__li holdEvent"><router-link to="/holdEvent">我要發起活動</router-link></li>
                <li 
                @mouseenter="dropdown" 
                @mouseleave="headsup" 
                class="header__tool__li gradient">會員中心
                    <ul class="accountCenter">
                        <li class="accountCenter__list"><router-link to="/AccountInfo">會員資料</router-link></li>
                        <li class="accountCenter__list"><router-link to="/ManageEvent">管理活動</router-link></li>
                    </ul>
                </li>
                <li class="header__tool__li"><a href="" @click.prevent="logout">登出</a></li>
            </ul>
            <ul v-else class="header__tool__ul">
                <li class="header__tool__li"><router-link to="/holdEvent">我要發起活動</router-link></li>
                <li class="header__tool__li"><router-link to="/login">登入</router-link></li>
                <li class="header__tool__li"><router-link to="/signup">註冊</router-link></li>
            </ul>
        </div>
    </header>
</template>

<script>
    export default {
        data(){
            return{
                isLogin: this.$cookies.get("token") === 'isLogin',
            }
        },
        methods: {
            logout(){
                $cookies.remove('token');
                $cookies.remove('MemberId');
                this.isLogin=false;
                this.$router.push('/');
                alert('已登出會員')
            },
            dropdown(){
                document.querySelector('.accountCenter').style.display = 'block';
            },
            headsup(){
                document.querySelector('.accountCenter').style.display = 'none';
            },
        },
    }
</script>

<style>
.header{
    /* border: 1px solid black; */
    padding-left: 6em;
    padding-right: 6em;
    display: flex;
    background-color: #FFF;
    border-bottom: 3px solid #E1E1E1;
}
.header a{
    text-decoration: none;
    color: #595959;
}
.header__tool{
    margin-left: auto;
    position: relative;
}
.header__tool__ul{
    display: flex;
    list-style-type: none;
    margin-top: 0;
    height: 100%;
    align-items: center;
}
.header__tool__li{
    margin-left: 2.5em;
}
.gradient{
    position: relative;
}
.accountCenter{
    display: none;
    z-index: 1;
    list-style-type: none;
    position: absolute;
    width: 200%;
    left: 0%;
    top: 100%;
    padding-left: 0;
    background-color: #F5F5F3;
    box-shadow: 5px 5px 5px  rgba(156, 156, 156, 0.698);
    border-radius: 10px;
    text-align: center;
}
.accountCenter__list:hover{
    background-color: #E2E2E0;
    border-radius: 10px;
}
.accountCenter__list{
    padding: .5em .67em;
}
.holdEvent{
    border-radius: 25px;
    padding: .67em 1.2em;
    background-color: #FFD934;
}
</style>