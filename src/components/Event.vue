<template>
    <div>
        <main class="container">

            <!-- 主辦人 -->
            <div class="hoster">
                <figure class="hoster__img" @click="$router.push(`/AccountInfo/${member.memberId}`)">
                    <img class="image--resp"
                    :src="getImg(member.memberPhoto)" alt="">
                </figure>
                <div class="hoster__info">
                    <h4>{{member.name}}</h4>
                    <h5>{{getCity(member.cityId)}}、{{getAge(member.birth)}}歲、{{getGender(member.gender)}}</h5>
                </div>
                <div class="collectEvent">
                    <input v-if="checkCollect" type="button" class="collectEvent__button" @click="collectEvent()" value="收藏活動">
                    <input v-else type="button" class="collectEvent__button" @click="removeCollect()" value="取消收藏">
                </div>
            </div>
            
            <!-- 活動資訊 -->
            <figure class="eventImg">
                <img class="image--resp"
                :src="getImg(event.cover)" alt="">
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
            
            <div id="0" @click="showMarginBoardOfParticipanter()" class="attender">
                <figure class="message__img" v-for="p in confirmer" :key="p.participantId">
                    <img :src="getImg(p.memberPhoto)" alt="" class="image--resp">
                </figure>
                <h3>{{confirmer.length}} 人參加</h3>
            </div>

            <div>
                <button v-if="this.checkMember" type="button" class="button--red" id="0" @click="showMarginBoard($event)">審核參加</button>
                <button v-else type="button" class="button--red" id="1" @click="showMarginBoard($event)">參加活動</button>
                <h4 class="deadline"><span>報名截止時間：</span>{{timeToString(event.deadline)}}</h4>
            </div>
            <p>{{event.eventContent}}</p>
            <div class="message__wrap">
                <div class="message" v-for=" m in this.messages" :key="m.messageId">
                    <div class="message__member">
                        <figure class="message__img">
                            <img :src="getImg(m.memberPhoto)" alt="" class="image--resp">
                        </figure>
                        <h4>{{m.name}}：</h4>
                    </div>
                    <div class="message__text"><h4>{{m.messageContent}}</h4></div>
                </div>
            </div>
                <div class="message__board">
                    <form action="">
                        <h3>留言</h3>
                        <textarea 
                        name="LeaveMessage" 
                        id="LeaveMessage" 
                        v-model="inputString" 
                        class="leaveMessage" 
                        rows="10"
                        placeholder="留下你的意見"></textarea><br>
                        <input type="button" class="message__board__button button--transparent" @click="leaveMessage()" value="留言">
                    </form>
                </div>
        </main>
                <div class="marginBoard">
                    <button type="button" class="button--close" @click="closeMargin()">X</button>
                    <header><h2>審核參加者</h2></header>
                    <div v-for="p in participanters" :key="p.participantId" class="participanter gradient">
                        <div class="message__member">
                            <figure class="message__img">
                                <img :src="getImg(p.memberPhoto)" alt="" class="image--resp">
                            </figure>
                            <h4>{{p.name}}：</h4>
                        </div>
                        <input type="button" class="button__partition agree" @click="partitionerConfirm(p)" value="確認">
                        <!-- <input type="button" class="button__partition disagree" value="X"> -->
                        <h4 class="message__text">{{p.motivation}}</h4>
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
                    <div v-for="p in confirmer" :key="p.participantId" class="participanter gradient">
                        <div class="message__member">
                            <figure class="message__img">
                                <img :src="getImg(p.memberPhoto)" alt="" class="image--resp">
                            </figure>
                            <h4>{{p.name}}：</h4>
                        </div>
                        <!-- <h4 class="message__text">{{p.motivation}}</h4> -->
                    </div>
                </div>

    </div>
</template>

<script>
import { apiEventGet, apiMemberGet, apiMessagePost, apiMessageGet, apiPartitionPost, apiEventGetPartition, apiPartitionPutConfirm, apiFavoritePost, apiFavoriteEventGet } from "../api"

export default {
inject:['reload'],
    data(){
       return{
            eventId: this.$route.params.eventId,
            event: null,
            motivationString: null,
            messages: [],
            participanters:[],
            inputString:null,
            member: null,
            participants: null,
            considers: null,
            confirmer: null,
            checkMember: null,
            checkCollect: true,
            favoriteId: null,
            lastMarginBoard: null,
       }
    },
    mounted(){

        apiEventGet(this.eventId)
        .then(res =>{
            this.event = res.data;
            this.checkMember = $cookies.get('MemberId') == this.event.memberId
            console.log(this.event)

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
            console.log(666)
            console.log(res.data)
            res.data.forEach(function(event) {
                console.log(event.eventId)
                // if(event.eventId == $route.params.eventId){
                //     console.log("==false")
                //     this.checkCollect = false
                //     return
                // }
            })
        })
        .catch(err=>{
            console.log(err)
        })
    },
    methods:{
        // async getHosterApi(memberId){
        //     let {data} = await apiMemberGet(memberId)
        //     this.member = data
        //     console.log(this.member)
        // },
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
            apiEventGetPartition(this.eventId)
            .then(res=>{
                console.log(res)
                this.participanters = res.data
                console.log(this.participanters)
                this.getParticipanterMemberApi(this.participanters)
            })
            .catch(err=>{
                console.log(err)
            })
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
                // item.name = members[index].name
                // item.memberPhoto = members[index].memberPhoto
                this.$set(item, 'name',  members[index].name)
                this.$set(item, 'memberPhoto',  members[index].memberPhoto)
            })
            console.log(arrs)
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

            //將API資料依序新增在陣列裡面
            arrs.forEach( (item,index) =>{
                // item.name = members[index].name
                // item.memberPhoto = members[index].memberPhoto
                this.$set(item, 'name',  members[index].name)
                this.$set(item, 'memberPhoto',  members[index].memberPhoto)
            })
            console.log(arrs)

            this.considers = arrs.filter( p => p.status!=1)
            this.confirmer = arrs.filter( p => p.status===1)
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
            return cities[num]
        },
        getGender(gender){
            if(gender === 2){
                return "男"
            }else if(gender === 1){
                return "女"
            }
        },
        leaveMessage(){

            apiMessagePost({
                "eventId": this.eventId,
                "memberId": this.$cookies.get("MemberId"),
                "messageContent": this.inputString,
            })
            .then(res =>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })

            this.inputString = ""
        },
        join(){
            if(this.member.memberId == this.$cookies.get("MemberId")){
                console.log("return")
                return
            }

            apiPartitionPost({
                "eventId": this.eventId,
                "participanter": this.$cookies.get("MemberId"),
                "motivation": this.motivationString
            })
            .then(res =>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        showMarginBoard(e){
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
            if(this.lastMarginBoard == boards[0]){
                this.closeMargin()
                return
            }
            boards[0].classList.add("marginBoard--show")
            this.lastMarginBoard = boards[0]
        },
        closeMargin(){
            this.lastMarginBoard.classList.remove("marginBoard--show")
            this.lastMarginBoard = null
        },
        partitionerConfirm(p){
            console.log(p)
            apiPartitionPutConfirm(p)
            .then(res =>{
                console.log(res)
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
        }
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
    padding: 1em 2.5em;
}
.hoster{
    display: flex;
}
.hoster__img{
    width: 80px;
    height: 80px;
    cursor: pointer;
    border-radius: 999em;
    overflow: hidden;
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
.deadline{
    color: rgb(255, 27, 27);
}
a{
    font-weight: bold;
    color: rgb(35, 35, 182);
}
.message{
    align-items: center;
    border-bottom: 2px solid black;
    margin-top: .67em;
}
.message__member{
    display: flex;
    align-items: center;
}
.message__img{
    width: 40px;
    height: 40px;
    border-radius: 999em;
    overflow: hidden;
    margin-right: .5em;
}
.message__text{
    margin-top: .5em;
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
.button--transparent{
    margin-left: 100%;
    transform: translateX(-100%);
    border-radius: 5px;
    padding: .5em 1em;
    background-color: #F3F3F3;
    border: 1px solid;
    font-size: .9em;
    cursor: pointer;
}
.button--transparent:hover{
    background-color: #363636;
    color: white;
}
/* .motivation__wrap{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #00000060;
    width: 100%;
    height: 100%;
    z-index: 1;
} */
.marginBoard{
    position: fixed;
    background-color: white;
    width: 20%;
    height: 55%;
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
.participanter h4{
    margin: 0;
}
.button__partition{
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
.partitioner{
    display: inline-block;
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
.collectEvent{
    margin-left: auto;
}
.collectEvent__button{
    color: #FF9100;
    border: 1px solid #FF9100;
    padding: .5em 1em;
    font-size: .9em;
    border-radius: 5px;
    cursor: pointer;
}
.collectEvent__button:hover{
    box-shadow: 0 0 3px #FF9100;
}
</style>