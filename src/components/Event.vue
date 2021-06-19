<template>
    <div>
        <main class="container">

            <!-- 主辦人 -->
            <div class="hoster">
                <figure class="hoster__img">
                    <img class="image--resp"
                    src="https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png" alt="">
                </figure>
                <div class="hoster__info">
                    <h4>阿哲</h4>
                    <h5>台北市、35、整合行銷</h5>
                </div>
            </div>
            
            <!-- 活動資訊 -->
            <figure class="eventImg">
                <img class="image--resp"
                src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
            </figure>
            <h1>桌遊團</h1>
            <h2 class="location">106台北市大安區師大路9號</h2>
            <h2 class="hostTime">(星期一) 六月14日 19：00</h2>
            <div class="subInfo__wrap">
                <div class="subInfo">
                    <img src="../assets/Time.png" width="400" height="400" class="image--resp" alt="">
                    <h4>2<span>hrs</span></h4>
                </div>
                <div class="subInfo">
                    <img src="../assets/Money.png" width="400" height="400" class="image--resp" alt="">
                    <h4>200<span>$</span></h4>
                </div>
                <div class="subInfo">
                    <img src="../assets/People.png" width="400" height="400" class="image--resp" alt="">
                    <h4>6<span>人</span></h4>
                </div>
            </div>
            <div class="attender">參加者資訊

            </div>
            <div>
                <button type="button" class="join">參加</button>
                <h4 class="deadline"><span>報名截止時間：</span>(星期一) 六月14日 17：00</h4>
            </div>
            <p>在英文網站上玩 恆河王侯<br>
                    <a href="https://www.yucata.de/en/GameInfo/Rajas">https://www.yucata.de/en/GameInfo/Rajas</a><br>
                    要先註策冊 免費的<br><br>
                    PS： 用discord 軟體 需有mic<br><br>
                    如果沒玩過恆河王侯 請先到youtube 搜 看教學影片</p>
            <div class="comment">
                活動評論
            </div>
            <!-- <div class="message__wrap">
                <h3>評論</h3>
                <div class="message">
                    <h4>留言人<span>：</span></h4>
                    <h5>4.5</h5>
                    <figure class="message__star">
                        <img src="../assets/Star.png" class="image--resp" alt="">
                    </figure>
                    <h5 class="message__text">留言內容</h5>
                </div>
            </div> -->
            <div class="message__wrap">
                <h3>留言</h3>
                <div class="message">
                    <h4>留言人<span>：</span></h4>
                    <!-- <h5>4.5</h5>
                    <figure class="message__star">
                        <img src="../assets/Star.png" class="image--resp" alt="">
                    </figure> -->
                    <h5 class="message__text">留言內容</h5>
                </div>
                <div class="message__board">
                    <form action="">
                        <textarea name="LeaveMessage" id="LeaveMessage" cols="50" rows="10"></textarea>
                        <input type="submit" class="submit" value="留言">
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { apiEventList } from "../api"

export default {
    data(){
       return{
            event: null,
       }
    },
    mounted(){
        //查看是否已經參數是否傳至跳轉之後的頁面，若傳入，則根據需求進行調用
        console.log(this.$route.query.targetData)
    },
    methods:{
        //將返回函數寫到methods中
        goBackSheet() {
            if(this.$route.query.goBackName === 'dataSearch'){
                this.$router.push({
                    name: this.pageName,
                    query: {
                        storageData: this.$route.query.storageData,
                        isBackSelect: true,
                    }
                });
            }
        }
    },
    watch:{
        $route(to,from){
            //刷新頁面
            this.$router.go(1);
        }  
    }
}
</script>

<style scoped>
/* reset.css */
figure{
    margin: 0;
}
.container{
    /* border: 1px solid black; */
    width: 30%;
    margin-left: 15%;
    padding: 16px 40px;
}
.hoster{
    display: flex;
}
.hoster__img{
    width: 80px;
    height: 80px;
}
.image--resp{
    width: 100%;
    height: auto;
}
.hoster__info{
    margin-left: 40px;
}
.hoster h4{
    margin: 0;
}
.eventImg{
    margin-top: 1em;
}
.subInfo__wrap{
    display: flex;
    justify-content: space-around;
    text-align: center;
}
.subInfo{
    width: 50px;
}
.join{
    width: 400px;
    background-color: pink;
    font-size: 1.5em;
    display: block;
    margin: .5em auto;
    border-radius: 999em;
}
.deadline{
    color: rgb(255, 27, 27);
}
a{
    font-weight: bold;
    color: rgb(35, 35, 182);
}
.message{
    display: flex;
    align-items: center;
    border-bottom: 2px solid black;
    margin-top: .3em;
}
.message h4, .message h5{
    margin-top: 0;
    margin-bottom: 0;
    height: max-content;
}
.message__star{
    width: 25px;
    margin-left: .3em;
}
.message__text{
    margin-left: .5em;
}
.message__board{
    margin-top: 1em;
}
/* .submit{
    display: block;
    margin-left: auto;
} */
</style>