<template>
    <div class="container">
        <header><h1>管理活動</h1></header>
        <router-link v-for="e in events" :key="e.eventId"  :to="/Event/+e.eventId">
            <div class="event" :class="{'border--host': e.memberId==$cookies.get('MemberId')}">
                <figure class="event__img">
                    <img class="image--resp"
                    src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
                </figure>
                <div class="event__text">
                    <h3>{{e.eventName}}</h3>
                    <h4>{{timeToString(e.hostTime)}}</h4>
                    <h4>{{getCity(e.addressId)}}{{e.road}}</h4>
                </div>
            </div>
        </router-link>

        <!-- <router-link v-for="e in joinEvents" :key="e.eventId"  :to="/Event/+e.eventId" >
            <div class="event">
                <figure class="event__img">
                    <img class="image--resp"
                    src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
                </figure>
                <div class="event__text">
                    <h3>{{e.eventName}}</h3>
                    <h4>{{timeToString(e.hostTime)}}</h4>
                    <h4>{{getCity(e.addressId)}}{{e.road}}</h4>
                    <h5>參加者...</h5>
                </div>
            </div>
        </router-link> -->
    </div>
</template>

<script>
import { apiMemberGetHostEvent, apiMemberGetJoinEvent} from '../api'
export default {
    data(){
        return{
            holdEvents:null,
            joinEvents:null,
            events:[],
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
            this.events = this.events.concat(this.holdEvents);

        })
        .catch(err =>{
            console.log(err)
        })

        apiMemberGetJoinEvent()
        .then(res =>{
            console.log(res.data)
            this.joinEvents = res.data
            this.events = this.events.concat(this.joinEvents);

            this.events.sort(function (a, b) {
                return a.hostTime<b.hostTime?1:-1;
            });
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
    margin-top: 2px;
    border-radius: 15px;
    /* border-radius: 40px 10px; */
    border: 6px solid rgba(0, 0, 255, 0.5);
}
.border--host{
    border: 6px solid rgba(255, 0, 0, 0.5);
}
/* .border--join{
    border: 6px solid rgba(0, 0, 255, 0.5);
} */
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
</style>