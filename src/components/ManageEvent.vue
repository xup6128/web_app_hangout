<template>
    <div class="container">
        <header><h1>管理活動</h1></header>
        <router-link v-for="(e,index) in showEvents" :key="index"  :to="/Event/+e.eventId">
            <div class="event" 
            :class="borderType[e.type]">
                <figure class="event__img">
                    <img class="image--resp"
                    :src="getImg(e.cover)" alt="">
                </figure>
                <div class="event__text">
                    <h3>{{e.eventName}}</h3>
                    <h4>{{timeToString(e.hostTime)}}</h4>
                    <h4>{{getCity(e.addressId)}}{{e.road}}</h4>
                </div>
            </div>
        </router-link>

        <div class="filter__wrap">
            <input @click="switchEvents(0)" class="filter__button filter__button--red" type="button" value="舉辦的活動">
            <input @click="switchEvents(1)" class="filter__button filter__button--blue" type="button" value="參加的活動">
            <input @click="switchEvents(2)" class="filter__button filter__button--orange" type="button" value="收藏的活動">
            <input @click="switchEvents(9)" class="filter__button filter__button--black" type="button" value="展開全部">
        </div>

    </div>
</template>

<script>
import { apiMemberGetHostEvent, apiMemberGetJoinEvent, apiFavoriteEventGet} from '../api'

export default {
    data(){
        return{
            holdEvents:null,
            joinEvents:null,
            collectEvents:null,
            events:[],
            showEvents:[],
            borderType:[
                "border--host",
                "border--join",
                "border--collect"
            ]
        }
    },
    methods:{
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
        getCity(num){
            const cities =["基隆市","台北市","新北市","桃園縣","新竹市","新竹縣","苗栗縣","台中市","彰化縣","南投縣","雲林縣","嘉義市","嘉義縣","台南市","高雄市","屏東縣","台東縣","花蓮縣","宜蘭縣","澎湖縣","金門縣","連江縣"]
            return cities[num]
        },
        getImg(url){
            return `http://35.229.140.28/${url}`
        },
        switchEvents(key){
            if(key === 9){
                this.showEvents = this.events.map( e => e)
                return
            }
            this.showEvents = this.events.filter( e => e.type == key)
        }
    },
    // beforeCreate(){
    //     console.log("beforeCreate")
    //     console.log(this.holdEvents)
    // },
    // beforeMount(){
    //             console.log("beforeMount")
    //     console.log(this.holdEvents)
    // },
    // mounted(){
    //             console.log("mounted")
    //     console.log(this.holdEvents)
    // },
    // beforeUpdate(){
    //     console.log("beforeUpdate")
    //     console.log(this.holdEvents)
    // },
    // updated(){
    //     console.log("update")
    //     console.log(this.holdEvents)
    // },
    created(){
        // console.log("created")
        // console.log(this.holdEvents)

        apiMemberGetHostEvent()
        .then(res =>{
            console.log(res.data)
            this.holdEvents = res.data
            this.holdEvents.forEach(element => {
                element.type = 0
            });
            this.events = this.events.concat(this.holdEvents);
            console.log(this.events.length)
        })
        .catch(err =>{
            console.log(err)
        })

        apiFavoriteEventGet()
        .then(res =>{
            console.log(res.data)
            this.collectEvents = res.data
            this.collectEvents.forEach(element => {
                element.type = 2
            });
            this.events = this.events.concat(this.collectEvents);
                        console.log(this.events.length)

            this.events.sort(function (a, b) {
                return a.hostTime<b.hostTime?1:-1;
            });
        })
        .catch(err =>{
            console.log(err)
        })

        apiMemberGetJoinEvent()
        .then(res =>{
            console.log(res.data)
            this.joinEvents = res.data
            this.joinEvents.forEach(element => {
                element.type = 1
            });
            this.events = this.events.concat(this.joinEvents);
                        console.log(this.events.length)

            this.events.sort(function (a, b) {
                return a.hostTime<b.hostTime?1:-1;
            });
            //注意順序
            this.showEvents = this.events
        })
        .catch(err =>{
            console.log(err)
        })


    },
}
</script>


<style scoped>
header{
    text-align: center;
}
.container{
    width: 40%;
    background-color: #FFFFFF;
    border-radius: 15px;
    padding: 1em 2.5em;
    margin: 3em auto;
}
.event{
    display: flex;
    margin-top: 10px;
    /* border-radius: 15px; */
    /* border-radius: 40px 10px; */
}
.border--host{
    border-left: 6px solid rgba(255, 0, 0, 0.5);
}
.border--join{
    border-left: 6px solid rgba(0, 0, 255, 0.5);
}
.border--collect{
    border-left: 6px solid #FF9100;
}
.event__img{
    width: 250px;
    /* height: 250px; */
}
.image--resp{
    width: 100%;
    height: auto;
}
a{
    color: black;
    text-decoration: none;
}
.filter__wrap{
    position: fixed;
    left: 75%;
    top: 20%;
}
.filter__button{
    display: block;
    border: 0;
    border-radius: 5px;
    padding: .5em 1em;
    font-size: 1.2em;
    cursor: pointer;
    margin-bottom: 1em;
    color: white;
    transition: all .3s;
    width: 80%;
    text-align: center;
}
.filter__button--red{
    background-color: rgba(255, 0, 0, 0.5);
}
.filter__button--blue{
    background-color: rgba(0, 0, 255, 0.5);
}
.filter__button--orange{
    background-color: #FF9100;
}
.filter__button--black{
    background-color: rgba(0, 0, 0, 0.5);
}
.filter__button:hover{
    font-size: .9em;
}
</style>