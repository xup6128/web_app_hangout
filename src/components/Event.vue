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
                    <h4>{{member.name}}</h4>
                    <h5>{{getCity(member.addressId)}}、{{getAge(member.birth)}}、{{getGender(member.gender)}}</h5>
                </div>
            </div>
            
            <!-- 活動資訊 -->
            <figure class="eventImg">
                <img class="image--resp"
                src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
            </figure>
            <h1>{{event.eventName}}</h1>
            <h2 class="location">{{event.addressId}}</h2>
            <h2 class="hostTime">{{timeToString(event.hostTime)}}</h2>
            <div class="subInfo__wrap">
                <div class="subInfo">
                    <img src="../assets/Time.png" width="400" height="400" class="image--resp" alt="">
                    <h4>{{event.costTime}}<span>hrs</span></h4>
                </div>
                <div class="subInfo">
                    <img src="../assets/Money.png" width="400" height="400" class="image--resp" alt="">
                    <h4>{{event.eventPrice}}<span>$</span></h4>
                </div>
                <div class="subInfo">
                    <img src="../assets/People.png" width="400" height="400" class="image--resp" alt="">
                    <h4>{{event.personLimit}}<span>人</span></h4>
                </div>
            </div>
            <div class="attender">參加者資訊

            </div>
            <div>
                <button type="button" class="join">參加</button>
                <h4 class="deadline"><span>報名截止時間：</span>{{timeToString(event.deadline)}}</h4>
            </div>
            <p>{{event.eventContent}}</p>
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
import { apiEventGet, apiMemberGet } from "../api"

export default {
    data(){
       return{
            eventId: this.$route.params.eventId,
            event: null,
            member: null,
            participants: null,
       }
    },
    mounted(){
        //查看是否已經參數是否傳至跳轉之後的頁面，若傳入，則根據需求進行調用

        apiEventGet(this.eventId)
        .then( res =>{
            this.event = res.data
            console.log(this.event);

            apiMemberGet(this.event.memberId)
            .then(res=> {
                this.member = res.data
                console.log(this.member)
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch( err=>{
            console.log(err);
        })

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
        },
        timeToString(time){
            const monthList = ['一','二','三','四','五','六','七','八','九','十','十一','十二'] 
            const dayList = ['日','一','二','三','四','五','六']
            let t = new Date(time)
            let r = 
            "(星期"+dayList[t.getUTCDay()]+") "+
            monthList[t.getMonth()]+"月"+ 
            t.getDate()+"日 "+
            (t.getHours()<10 ? '0' : '')+t.getHours()+":"+
            (t.getMinutes()<10 ? '0' : '')+t.getMinutes()

            return r
        },
        getAge(birth){
            let birthdays = new Date(birth);
            let d = new Date();
            let age =
            d.getFullYear() -
            birthdays.getFullYear() -
            (d.getMonth() < birthdays.getMonth() ||
            (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate())
                ? 1
                : 0);

            return age;
        },
        getCity(num){
            const cities =["基隆市","台北市","新北市","桃園縣","新竹市","新竹縣","苗栗縣","台中市","彰化縣","南投縣","雲林縣","嘉義市","嘉義縣","台南市","高雄市","屏東縣","台東縣","花蓮縣","宜蘭縣","澎湖縣","金門縣","連江縣"]
            return cities[num]
        },
        getGender(gender){
            if(gender === "M"){
                return "男"
            }else if(gender === "F"){
                return "女"
            }
        },
    },
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