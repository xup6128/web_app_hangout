<template>
    <div class="mostly-customized-scrollbar">
        <main class="container container__left--fixed">
            
            <!-- 活動資訊 -->
            <figure class="eventImg">
                <img class="image--resp"
                :src="getImg(event.cover)" alt="">
            </figure>
            <h1>{{event.eventName}}</h1>
            <h2 class="location">{{getCity(event.cityId)}}{{event.road}}</h2>
            <h2 class="hostTime">{{timeToString(event.hostTime)}}</h2>

            <div @click="showMarginBoardOfParticipanter()" class="attender">
                <figure class="member__img" v-for="p in confirmer" :key="p.participantId">
                    <img :src="getImg(p.memberPhoto[0])" alt="" class="image--resp">
                </figure>
                <h3 class="underline">{{confirmer.length}} 人參加</h3>
            </div>

            <div v-if="!notExpired">
                <button v-if="this.checkHoster" type="button" class="button--red" id="0" @click="showMarginBoard($event)">審核參加者</button>
                <button v-else type="button" class="button--red" id="1" @click="showMarginBoard($event)">參加活動 </button>
                <h4 class="deadline"><span>報名截止時間：</span>{{timeToString(event.deadline)}}</h4>
            </div>

            <div v-else>
                <button v-if="this.checkMember" type="button" class="button--red" id="0" @click="showMarginBoard($event)">評論參加者</button>
                <button v-else type="button" class="button--red" disabled="true">活動已結束</button>
                <h4 class="deadline"><span>報名截止時間：</span>{{timeToString(event.deadline)}}</h4>
            </div>

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

        </main>

        <main class="container container__right">

            <div class="hoster">
                <figure class="hoster__img" @click="$router.push(`/AccountInfo/${member.memberId}`)">
                    <img class="image--resp"
                    :src="getImg(member.memberPhoto[0])" alt="">
                </figure>
                <div class="hoster__info">
                    <h4>{{member.name}}</h4>
                    <h4>{{getCity(member.cityId)}}、{{getAge(member.birth)}}歲、{{getGender(member.gender)}}</h4>
                </div>

                <div v-if="!checkMember && !checkHoster" class="eventButton">
                    <input v-if="checkLogin" v-show="checkCollect" type="button" class="collectEvent__button" @click="collectEvent()" value="收藏活動">
                    <input v-if="checkLogin" v-show="!checkCollect" type="button" class="collectEvent__button" @click="removeCollect()" value="取消收藏">
                </div>

                <!-- 下方驚嘆號記得拿掉 -->
                <div v-if="checkMember || checkHoster" class="eventButton">
                    <input type="button" class="collectEvent__button" id="3" @click="showMarginBoard($event)" value="邀請夥伴">
                </div>

            </div>
                        
            <textarea name="Intro" id="Intro" class="intro" rows="15" v-model="event.eventContent" disabled="true"></textarea>

            <input v-if="checkMember" v-show="isPublic" type="button" class="message__board__switchButton button" :class="{'button--transparent':this.checkLogin}"  @click="changeMessageWrap" value="參加者留言版" :disabled="!this.checkLogin">
            <input v-show="!isPublic" type="button" class="message__board__switchButton button" contextmenu="" :class="{'button--transparent':this.checkLogin}" @click="changeMessageWrap" value="公共留言版">

            <div v-show="isPublic" class="message__wrap">
                <div v-if="!this.publicMessages.length" class="noneapi">暫無任何留言</div>
                <Message v-for="m in this.publicMessages" :key="m.messageId" :m="m" @update="delMesg" />
            </div>

            <div v-show="!isPublic" class="message__wrap">
                <div v-if="!this.privateMessages.length" class="noneapi">暫無任何留言</div>
                <Message v-for="pm in this.privateMessages" :key="pm.messageId" :m="pm" @update="delMesg" />
            </div>

            <div class="message__board">
                <form action="">
                    <!-- <h3>留言</h3> -->
                    <textarea 
                    v-if="checkLogin"
                    name="LeaveMessage" 
                    id="LeaveMessage" 
                    v-model="inputString" 
                    class="leaveMessage" 
                    rows="10"
                    placeholder="留下你的意見"></textarea>
                    <textarea 
                    v-else
                    name="LeaveMessage" 
                    id="LeaveMessage" 
                    v-model="inputString" 
                    class="leaveMessage " 
                    rows="10"
                    placeholder="請先登入"
                    :disabled="!this.checkLogin"></textarea><br>
                    <input type="button" class="message__board__button button" :class="{'button--transparent':this.checkLogin}" @click="leaveMessage()" value="留言"  :disabled="!this.checkLogin">
                </form>
            </div>


        </main>
                <div class="marginBoard">
                    <div v-if="!notExpired">
                    <!-- <div v-if="notExpired"> -->
                        <button type="button" class="button--close" @click="closeMargin()">X</button>
                        <header><h2>審核參加者</h2></header>
                        <div v-if="!this.considers.length" class="noneapi">尚無人報名</div>

                        <div v-for="p in considers" :key="p.participantId" class="participanter gradient"  :class="{'special': familiar.includes(p.participantId)}" >
                            <div class="message__member">
                                <figure class="member__img">
                                    <img :src="getImg(p.memberPhoto[0])" alt="" class="image--resp">
                                </figure>
                                <h4>{{p.name}}：</h4>
                            </div>
                            <input type="button" class="button__participant agree" @click="participanterConfirm(p)" value="確認">
                            <!-- <input type="button" class="button__participant disagree" value="X"> -->
                            <h4 class="message__text">{{p.motivation}}</h4>
                        </div>
                    </div>

                    <div v-else>
                        <button type="button" class="button--close" @click="closeMargin()">X</button>
                        <header><h2>評論參加者</h2></header>
                        <Comment v-for="p in umCommenter" :key="p.participantId" :participanters="p" />
                    </div>
                </div>

                <div class="marginBoard">
                    <button type="button" class="button--close" @click="closeMargin()">X</button>
                    <header><h2>參加動機</h2></header>
                    <textarea name="" id="" rows="10" v-model="motivationString" placeholder="簡單敘述你的參加動機吧" required class="motivation"></textarea>
                    <button type="button" class="button--red" @click="join()">送出</button>
                </div>

                <div class="marginBoard">
                    <button type="button" class="button--close" @click="closeMargin()">X</button>
                    <header><h2>參加者</h2></header>
                    <div v-if="!this.confirmer.length" class="noneapi">尚無參加者</div>

                    <router-link v-for=" p in confirmer" :key="p.participantId" :to="/AccountInfo/+p.participantId">
                        <div class="participanter gradient">
                            <div class="message__member">
                                <figure class="member__img">
                                    <img :src="getImg(p.memberPhoto[0])" alt="" class="image--resp">
                                </figure>
                                <h4>{{p.name}}：</h4>
                            </div>
                        </div>
                    </router-link>

                </div>

                <div class="marginBoard">
                    <button type="button" class="button--close" @click="closeMargin()">X</button>
                    <header><h2>邀請夥伴</h2></header>
                    <div v-if="!this.inviter.length" class="noneapi">尚無可邀請的夥伴</div>
                        <div v-for="p in inviter" :key="p.protagonistId" class="participanter gradient">
                            <div class="message__member">
                                <figure class="member__img">
                                    <img :src="getImg(p.memberPhoto[0])" alt="" class="image--resp">
                                </figure>
                                <h4>{{p.name}}：</h4>
                            </div>
                            <input type="button" class="button__participant agree" @click="invite(p.protagonistId)"  value="邀請">
                        </div>
                </div>

    </div>
</template>

<script>
import { apiEventGet, apiMemberGet, apiMessagePost, apiMessageGet, apiparticipantPost, apiEventGetparticipant, 
apiparticipantPutConfirm, apiFavoritePost, apiFavoriteEventGet, apiFavoriteDel, apiRelationshipGet, apiInvitePost } from "../api"

import Comment from "./Comment.vue"
import Message from "./Message.vue"

export default {
    inject: ["reload"],
    data(){
       return{
            eventId: this.$route.params.eventId,
            selfId: $cookies.get('MemberId'),
            event: null,
            motivationString: null,
            messages: [],
            publicMessages: [],
            privateMessages: [],
            isPublic: true,
            participanters:[],
            inputString:null,
            member: null,
            considers: [],
            confirmer: [],
            umCommenter: [],
            inviter: [],
            familiar: [],
            checkLogin: this.$cookies.get("token") === "isLogin",
            checkHoster: null,
            checkMember: null,
            checkSignup: null,
            checkCollect: true,
            notExpired: null,
            favoriteId: null,
            lastMarginBoard: null,
            isEdit: false
       }
    },
    components:{
        Comment,
        Message
    },
    mounted(){

        apiEventGet(this.eventId)
        .then(res =>{
            this.event = res.data;
            this.checkHoster = $cookies.get('MemberId') == this.event.memberId
            if(this.checkHoster){
                this.getRelationship(res.data)
            }

            console.log(this.event)

            // console.log(Date.parse(Date.parse(this.event.deadline)).valueOf())
            // console.log(Date.parse(Date.parse(new Date())).valueOf())
            //檢查活動是否過期
            this.notExpired = (Date.parse(this.event.deadline)).valueOf() < (Date.parse(new Date())).valueOf()

            //透過活動API獲得主辦者會員API資料
            this.getHosterApi(this.event.memberId)
            //透過活動API獲得留言API資料
            this.getMessagesApi()
            //透過活動API獲得參加者API資料
            this.getParticipanterApi()
        })
        .catch(err=>{
            console.log(err)
        })

        apiFavoriteEventGet()
        .then(res =>{
            console.log(res.data)
            for(let i=0;i<res.data.length;i++){
                if(res.data[i].eventId == this.eventId){
                this.checkCollect = false
                return
                }
            }
        })
        .catch(err=>{
            console.log(err)
        })

    },
    methods:{
        getInviter(){

            apiRelationshipGet($cookies.get("MemberId"))
            .then(res =>{
                console.log(res)
                this.getInviterMemberApi(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        async getInviterMemberApi(arrs){

            const promises = arrs.map(async item => {
                const p = await apiMemberGet(item.protagonistId);
                return p;
            })
            //將promises陣列解析成data陣列
            const promise = await Promise.all(promises)
            const members = promise.map( p =>{
                return p.data
            })
            console.log(members)

            //將API資料依序新增在陣列裡面
            arrs.forEach( (item,index) =>{
                this.$set(item, 'name',  members[index].name)
                this.$set(item, 'memberPhoto',  members[index].memberPhoto)
            })
            console.log(arrs)
            this.inviter = arrs

        },
        invite(memberId){

            apiInvitePost({
                "protagonistId": $cookies.get("MemberId"),
                "objectId": memberId,
                "eventId": this.eventId
            })
            .then(res =>{
                console.log(res)
                this.inviter = this.inviter.filter( m => m.protagonistId != memberId)
            })
            .catch(err =>{
                console.log(err)
            })

        },
        getHosterApi(memberId){
            apiMemberGet(memberId)
            .then(res =>{
                this.member = res.data
                console.log(this.member)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        async getMessagesApi(){
            //獲得apiMessageGet回傳的promises陣列
            const promises = this.event.messageIds.map(async id => {
                const p = await apiMessageGet(id);
                return p;
            })
            //將promises陣列解析成data陣列
            const promise = await Promise.all(promises)
            this.messages = promise.map( p =>{
                return p.data
            })

            console.log(this.messages)
            this.getMembersApi(this.messages)
        },
        getParticipanterApi(){
            apiEventGetparticipant(this.eventId)
            .then(res=>{

                console.log("participant", res)
                this.participanters = res.data

                this.getParticipanterMemberApi(this.participanters)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        async getRelationship(arrs){

            const promises = arrs.map(async item => {
                const p = await apiRelationshipGet(item.participanter);
                return p;
            })
            //將promises陣列解析成data陣列
            const promise = await Promise.all(promises)
            const members = promise.map( p =>{
                return p.data
            })
            this.members.forEach( (m,index) =>{
                this.familiar[index] = m.protagonistId
            })
            console.log(members)

            //將API資料依序新增在陣列裡面
            // arrs.forEach( (item,index) =>{
            //     this.$set(item, 'name',  members[index].name)
            //     this.$set(item, 'memberPhoto',  members[index].memberPhoto[0])
            // })


        },
        async getMembersApi(arrs){

            const promises = arrs.map(async item => {
                const p = await apiMemberGet(item.memberId);
                return p;
            })
            //將promises陣列解析成data陣列
            const promise = await Promise.all(promises)
            const members = promise.map( p =>{
                return p.data
            })

            //將API資料依序新增在陣列裡面
            arrs.forEach( (item,index) =>{
                this.$set(item, 'name',  members[index].name)
                this.$set(item, 'memberPhoto',  members[index].memberPhoto)
            })

            console.log(arrs)
            this.publicMessages = arrs.filter( m => m.status == 3)
            this.privateMessages = arrs.filter( m => m.status == 1)
        },
        async getParticipanterMemberApi(arrs){

            const promises = arrs.map(async item => {
                const p = await apiMemberGet(item.participanter);
                return p;
            })
            //將promises陣列解析成data陣列
            const promise = await Promise.all(promises)
            const members = promise.map( p =>{
                return p.data
            })
            console.log(members)

            //將API資料依序新增在陣列裡面
            arrs.forEach( (item,index) =>{
                this.$set(item, 'name',  members[index].name)
                this.$set(item, 'memberPhoto',  members[index].memberPhoto)
                this.$set(item, 'star',  0)
            })
            console.log("ATTENTION", arrs)

            this.considers = arrs.filter( p => p.status !== 1)//審核者
            this.umCommenter = arrs.filter( p => p.status===1)//參加者未評輪
            this.confirmer = arrs.filter( p => p.status === 1 || p.status === 2)//參加者已評論或未評論

            this.checkSignup = this.considers.filter( p => p.participantId == $cookies.get("MemberId"))
            this.checkMember = this.confirmer.filter( p => p.participantId == $cookies.get("MemberId"))

            if(this.checkMember || this.checkHoster){
                this.getInviter()
            }
        },
        getImg(url){
            return `http://35.229.140.28/${url}`
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
            return cities[num-1]
        },
        getGender(gender){
            if(gender === 2){
                return "男"
            }else if(gender === 1){
                return "女"
            }
        },
        leaveMessage(){

            let status = 0
            if(this.isPublic){
                status = 3
            }else{
                status = 1
            }

            apiMessagePost({
                "eventId": this.eventId,
                "memberId": this.$cookies.get("MemberId"),
                "messageContent": this.inputString,
                "status": status
            })
            .then(res =>{
                console.log(res)
                this.renewMessageApi()

            })
            .catch(err=>{
                console.log(err)
            })

            this.inputString = ""
        },
        renewMessageApi(){
            apiEventGet(this.eventId)
            .then(res =>{
            
            this.event = res.data;
            //透過活動API獲得留言API資料
            this.getMessagesApi()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        join(){
            if(this.member.memberId == this.$cookies.get("MemberId")){
                console.log("return")
                return
            }

            apiparticipantPost({
                "eventId": this.eventId,
                "participanter": this.$cookies.get("MemberId"),
                "motivation": this.motivationString
            })
            .then(res =>{
                console.log(res)
                alert("已報名活動，請待房主審核")
                this.closeMargin()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        showMarginBoard(e){
            if(!this.checkLogin){
                alert('請先登入會員');
                return
            }
            const boards = document.querySelectorAll(".marginBoard") 
            if(this.lastMarginBoard){this.lastMarginBoard.classList.remove("marginBoard--show")}
            if(this.lastMarginBoard == boards[e.target.id]){
                this.closeMargin()
                return
            }
            boards[e.target.id].classList.add("marginBoard--show")
            this.lastMarginBoard = boards[e.target.id]
        },
        showMarginBoardOfParticipanter(){
            const boards = document.querySelectorAll(".marginBoard") 
            if(this.lastMarginBoard){this.lastMarginBoard.classList.remove("marginBoard--show")}
            if(this.lastMarginBoard == boards[2]){
                this.closeMargin()
                return
            }
            boards[2].classList.add("marginBoard--show")
            this.lastMarginBoard = boards[2]
        },
        closeMargin(){
            this.lastMarginBoard.classList.remove("marginBoard--show")
            this.lastMarginBoard = null
        },
        participanterConfirm(p){
            console.log(p)
            apiparticipantPutConfirm(p)
            .then(res =>{
                console.log(res)
                this.confirmer = this.confirmer.concat( this.considers.filter( m => m.memberId == p.memberId))
                this.considers = this.considers.filter( m => m.memberId != p.memberId)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        collectEvent(){
            apiFavoritePost({
                "memberId": this.$cookies.get("MemberId"),
                "eventNum": this.eventId
            })
            .then(res =>{
                console.log(res)
                this.checkCollect = false
            })
            .catch(err =>{
                console.log(err)
            })
        },
        removeCollect(){
            apiFavoriteDel(this.selfId,this.eventId)
            .then(res =>{
                console.log(res)
                this.checkCollect = true
            })
            .catch(err =>{
                console.log(err)
            })
        },
        delMesg(messageId){

            this.publicMessages = this.publicMessages.filter( m => m.messageId !== messageId)
            this.privateMessages = this.privateMessages.filter( m => m.messageId !== messageId)
        },
        changeMessageWrap(){
    
            this.isPublic = !this.isPublic
        }
    },
}
</script>

<style scoped>
/* reset.css */
a{
  color: black;
  text-decoration: none;
}
figure{
    margin: 0;
}
.container{
    width: 30%;
    padding: 1em 2.5em;
}
.container__left--fixed{
    position: fixed;
    left: 15%;
    overflow: hidden;
}
.container__right{
    margin-left: 55%;
    background-color: #FFFFFF;
    border-radius: 15px;

    padding: 1em 2.5em;
    margin-top: 32px;
    margin-bottom: 3em;
}
.container h1,
.container h2{
    margin-top: .3em;
    margin-bottom: .3em;
}
.hoster{
    display: flex;
    align-items: center;
}
.hoster__img{
    width: 80px;
    height: 80px;
    cursor: pointer;
    border: 2px solid #E1E1E1;
    border-radius: 999em;
    overflow: hidden;
}
.hoster__info{
    height: max-content;
    /* margin-top: auto;
    margin-bottom: auto; */
}
.image--resp{
    width: 100%;
    height: auto;
}
.hoster__info{
    margin-left: 40px;
}
.eventImg{
    margin: 1em auto 0 auto;
    width: 90%;
    max-height: 36vh;
    border-radius: 10px;
    overflow: hidden;
}
.subInfo__wrap{
    display: flex;
    justify-content: space-around;
    text-align: center;
}
.subInfo{
    width: 50px;
}
.subInfo h4{
    margin: .3em;
}
.deadline{
    color: rgb(255, 27, 27);
}
/* a{
    font-weight: bold;
    color: rgb(35, 35, 182);
} */
.message{
    align-items: center;
    /* border-bottom: 2px solid black; */
    margin-top: .67em;
}
.message__member{
    display: flex;
    align-items: center;
}
.member__img{
    width: 40px;
    height: 40px;
    border: 1px solid #cfcfcf;
    border-radius: 999em;
    overflow: hidden;
    margin-right: .5em;
}
.message__text{
    margin-top: .5em;
}
.message__input{
    width: 100%;
    font-size: 1.5em;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    background-color: transparent;
}
.message__button{
    display: inline-block;
    margin-left: auto;
}
.message h4{
    margin-top: 0;
    margin-bottom: 0;
}
.message__star{
    width: 25px;
    margin-left: .3em;
}
.message__board{
    margin-top: 1em;
}
.button--red{
    color: white;
    background-color: #ED1C40;
    border-radius: 25px;
    font-size: 1.5em;
    width: 100%;
    border: 0;
    padding: .4em 0;
    margin-top: .67em;
}
.button--red:hover{
    background-color: #d81b3b;
    cursor: pointer;
}
.button{
    margin-left: 100%;
    transform: translateX(-100%);
    border-radius: 5px;
    padding: .5em 1em;
    background-color: transparent;
    border: 1px solid;
    font-size: .9em;
}
.button--transparent{
    margin-left: 100%;
    transform: translateX(-100%);
    border-radius: 5px;
    padding: .5em 1em;
    background-color: transparent;
    border: 1px solid;
    font-size: .9em;
    cursor: pointer;
}
.button--transparent__small{
    border-radius: 999px;
    background-color: transparent;
    border: 1px solid;
    font-size: .9em;
    cursor: pointer;
}
.button--transparent:hover,
.button--transparent__small:hover{
    background-color: #363636;
    color: white;
}
.dis:hover{
    background: transparent;
    color: #B7B7B7;
}
.marginBoard{
    position: fixed;
    background-color: white;
    width: 20%;
    /* height: 55%; */
    padding: 1em 2.5em;
    text-align: center;
    left: 120%;
    top: 50%;
    border-radius: 15px;
    border: 4px solid #E1E1E1;
    transform: translate(-50%,-50%);
    transition: all 1s;
}
.marginBoard--show{
    left: 70%;
}
.motivation{
    height: 70%;
}
.gradient{
    position: relative;
}
.button--close{
    position: absolute;
    top: -10px;
    right: -10px;
    width: 30px;
    height: 30px;
    padding: 0;
    font-size: 1.2em;
    border-radius: 999em;
    border: 0;
    color: white;
    background-color: #ED1C40;
}
.button--close:hover{
    background-color: #d81b3b;
    cursor: pointer;
}
.participanter{
    text-align: left;
    margin-top: 2px;
    border-radius: 5px;
    border: 4px solid #979797;
    padding: .3em;
    /* border-bottom: 1px solid black; */
}
.special{
    border: 4px solid #FF9100;
}
.participanter h4{
    margin: 0;
}
.button__participant{
    position: absolute;
    right: -1%;
    top: 0;
    width: 10%;
    padding: .3em 1em;
    border-radius: 5px;
}
.agree{
    background-color: #FF9100;
    color: white;
    border: 0;
    cursor: pointer;
}
.agree:hover{
    background-color: #FF7800;
}
.disagree{
    color: #FF9100;
    border: 1px solid #FF9100;
    background-color: white;
}
.disagree:hover{
    box-shadow: 0 0 5px #FF9100;
}
.attender{
    display: flex;
    cursor: pointer;
    width: max-content;
    float: right;
}
.attender h3{
    margin-top: 0;
    margin-bottom: 0;
}
.eventButton{
    margin-left: auto;
}
.collectEvent__button{
    color: #FF9100;
    border: 1px solid #FF9100;
    background-color: transparent;
    padding: .5em 1em;
    font-size: .9em;
    border-radius: 5px;
    cursor: pointer;
}
.collectEvent__button:hover{
    box-shadow: 0 0 3px #FF9100;
}
.intro{
    border: 1px solid black;
    border-radius: 10px;
    background-color: #FFF;
    width: 100%;
    margin-top: 1em;
    font-size: 1.5em;
}
.noneapi{
    font-size: 1.5em;
    color: gray;
    text-align: center;
    padding: 1em;
}
.underline{
    border-bottom: 2px solid black;
}
.message__board__switchButton{
    margin-top: 1em;
}

</style>