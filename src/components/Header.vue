<template>
    <header class="header">
        <div class="header__logo">
            <h1><router-link to="/">Party Animlas</router-link></h1>
        </div>
        <div class="header__tool">
            <ul>
                <li><router-link to="/holdEvent">我要發起活動</router-link></li>
                <li><router-link to="/login">登入</router-link></li>
                <li><router-link to="/signup">註冊</router-link></li>
            </ul>
        </div>
        
        <!-- <router-link to="/userInfo">User Info</router-link>
        <a href="" @click.prevent="logout">Logout</a> -->
    </header>
</template>

<script>
    export default {
        // methods: {
        //     logout(){
        //         $cookies.remove('token');
        //         this.$router.push('/login');
        //     }
        // }
    }
</script>

<style>
.header{
    /* border: 1px solid black; */
    padding-left: 6em;
    padding-right: 6em;
    display: flex;
    background-color: #F8F4EC;
}
.header a{
    text-decoration: none;
    color: #595959;
}
.header__tool{
    margin-left: auto;
    position: relative;
}
.header__tool ul{
    display: flex;
    list-style-type: none;
    margin-top: 0;
    height: 100%;
    align-items: center;
}
.header__tool ul li{
    margin-left: 2.5em;
}
</style>