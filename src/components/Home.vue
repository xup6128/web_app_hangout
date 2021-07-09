<template>
    <div class="mostly-customized-scrollbar">

        <div class="serch__box gradient">
            <div class="search__icon"></div>
            <input class="search__engine" type="text" v-model.lazy="keyword" placeholder="搜尋">
            <button v-show="keyword" class="search__button--cancel" @click="searchCancel()">X</button>
        </div>

        <section class="ads__wrap gradient">
            <div class="ads">
                <img class="ad" src="..\assets\Beach.png" alt="Beach">
                <img class="ad" src="..\assets\Hiking.jpg" alt="Hiking">
                <img class="ad" src="..\assets\Yoga.png" alt="Yoga">
            </div>
            <ol @click="changeAds" class="ads__pages">
                <li v-for="(ad, index) in adsArr" :key="ad.alt" class="page">{{index}}</li>
            </ol>
        </section>

        <div class="container">

            <!-- Public Event List -->

            <section class="public__wrap">

                <div class="option" @click="quickStar(0)">
                <a href="#FilterWrap">
                    <figure class="option__img">
                        <img class="img--resp img--radious" src="../assets/RightNow.png" alt="">
                    </figure>
                    <h4>馬上出發</h4><span class="chevron-arrow-right"></span>
                </a>
                </div>

                <div class="option" @click="quickStar(5)">
                <a href="#FilterWrap">
                    <figure class="option__img">
                        <img class="img--resp img--radious" src="../assets/FridayNight.png" alt="">
                    </figure>
                    <h4>週五狂歡夜</h4><span class="chevron-arrow-right"></span><span class="chevron-arrow-right"></span>
                </a>    
                </div>

                <div class="option" @click="quickStar(6)">
                <a href="#FilterWrap">
                    <figure class="option__img">
                        <img class="img--resp img--radious" src="../assets/Weekend.png" alt="">
                    </figure>
                    <h4>週末踏青郊遊</h4><span class="chevron-arrow-right"></span><span class="chevron-arrow-right"></span><span class="chevron-arrow-right"></span>
                </a>
                </div>
            </section>

            <!-- 篩選器 -->
            <section id="FilterWrap" class="filter__wrap gradient">
                <ul @click="dropdown($event)" class="filter__list">
                    <li id="4" class="filter__item arrow" :class="{'arrow--dropdown': this.filterNum == 4, 'chosen': this.cities.length}">城市</li>
                    <li id="6" class="filter__item arrow" :class="{'arrow--dropdown': this.filterNum == 6, 'chosen': this.day}">日期</li>
                    <li id="1" class="filter__item arrow" :class="{'arrow--dropdown': this.filterNum == 1, 'chosen': this.checkEventTypes.length}">活動類型</li>
                    <li id="2" class="filter__item arrow" :class="{'arrow--dropdown': this.filterNum == 2, 'chosen': this.expense}">花費</li>
                    <li id="3" class="filter__item arrow" :class="{'arrow--dropdown': this.filterNum == 3, 'chosen': this.group}">人數</li>
                    <li id="5" class="filter__item arrow" :class="{'arrow--dropdown': this.filterNum == 5, 'chosen': this.distance}">距離</li>
                </ul>
                <div>
                <div v-if="filterNum == 1" class="filter__option__wrap">
                    <div class="filter__option">活動類型：
                        <label  v-for="(type, index) in eventType" :key=type.eng>
                                    <input type="checkbox" 
                                    name="eventType" 
                                    :value=index+1 
                                    v-model="checkEventTypes" >
                                    {{type.zh}}
                        </label>
                    </div>
                    <div class="filter__option filter__option__button">
                        <button class="button--transparent" @click="selectAll()">全部選取</button>
                        <button class="button--transparent" @click="unselectAll()">全部取消</button>
                    </div>
                </div>
                <div v-if="filterNum == 2" class="filter__option__wrap">
                    <div class="filter__option">
                        <label>預算：
                        </label>
                            <input type="radio" v-model="expense" :value="0" name="Expense" @change="retainRecord" @click="controlExpenseSingel($event)">免費
                            <input type="radio" v-model="expense" :value="300" name="Expense" @change="retainRecord" @click="controlExpenseSingel($event)">300以內
                            <input type="radio" v-model="expense" :value="500" name="Expense" @change="retainRecord" @click="controlExpenseSingel($event)">500以內
                            <input type="radio" v-model="expense" :value="1000" name="Expense" @change="retainRecord" @click="controlExpenseSingel($event)">1000以內
                            <!-- <input type="radio" v-model="expense" :value="99999" name="Expense" @change="retainRecord" @click="controlSingel($event)">不限制 -->
                    </div>
                </div>
                <div v-if="filterNum == 3" class="filter__option__wrap">
                    <div class="filter__option">
                        <label>聚會人數：
                        </label>
                            <input type="radio" v-model="group" value="c" name="people" @change="retainRecord" @click="controlGroupSingel($event)">兩人聚會
                            <input type="radio" v-model="group" value="s"  name="people" @change="retainRecord" @click="controlGroupSingel($event)">小型聚會(3~4人)
                            <input type="radio" v-model="group" value="m"  name="people" @change="retainRecord" @click="controlGroupSingel($event)">中型聚會(5~8人)
                            <input type="radio" v-model="group" value="b"  name="people" @change="retainRecord" @click="controlGroupSingel($event)">大型聚會(8人以上)
                    </div>
                </div>
                <div v-if="filterNum == 4" class="filter__option__wrap">
                    <div class="filter__option">北部地區：
                        <label><input type="checkbox" v-model="cities"  :value="1" name="City">基隆市</label>
                        <label><input type="checkbox" v-model="cities"  :value="2" name="City">台北市</label>
                        <label><input type="checkbox" v-model="cities"  :value="3" name="City">新北市</label>
                        <label><input type="checkbox" v-model="cities"  :value="4" name="City">桃園縣</label>
                        <label><input type="checkbox" v-model="cities"  :value="5" name="City">新竹市</label>
                        <label><input type="checkbox" v-model="cities"  :value="6" name="City">新竹縣</label>
                        <label><input type="checkbox" v-model="cities"  :value="7" name="City">苗栗縣</label>
                    </div>
                    <div class="filter__option">中部地區：
                        <label><input type="checkbox" v-model="cities"  :value="8" name="City">台中市</label>
                        <label><input type="checkbox" v-model="cities"  :value="9" name="City">彰化縣</label>
                        <label><input type="checkbox" v-model="cities"  :value="10" name="City">南投縣</label>
                    </div>
                    <div class="filter__option">南部地區：
                        <label><input type="checkbox" v-model="cities"  :value="11" name="City">雲林縣</label>
                        <label><input type="checkbox" v-model="cities"  :value="12" name="City">嘉義市</label>
                        <label><input type="checkbox" v-model="cities"  :value="13" name="City">嘉義縣</label>
                        <label><input type="checkbox" v-model="cities"  :value="14" name="City">台南市</label>
                        <label><input type="checkbox" v-model="cities"  :value="15" name="City">高雄市</label>
                        <label><input type="checkbox" v-model="cities"  :value="16" name="City">屏東縣</label>
                    </div>
                    <div class="filter__option">東部地區：
                        <label><input type="checkbox" v-model="cities"  :value="17" name="City">台東縣</label>
                        <label><input type="checkbox" v-model="cities"  :value="18" name="City">花蓮縣</label>
                        <label><input type="checkbox" v-model="cities"  :value="19" name="City">宜蘭縣</label>
                    </div>
                    <div class="filter__option">離島地區：
                        <label><input type="checkbox" v-model="cities"  :value="20" name="City">澎湖縣</label>
                        <label><input type="checkbox" v-model="cities"  :value="21" name="City">金門縣</label>
                        <label><input type="checkbox" v-model="cities"  :value="22" name="City">連江縣</label>
                    </div>
                </div>
                <div v-if="filterNum == 5" class="filter__option__wrap">
                    <div class="filter__option">
                        <label for="Distance">
                            請先輸入使用者所在地：
                            <input 
                            v-model="addr" 
                            type="text" 
                            name="Distance"
                            @change="getLatLng">
                        </label>
                        <button class="button--transparent" >計算距離</button>
                    </div>
                    <div class="filter__option">
                        <label>距離(以內)：
                        </label>
                            <input type="radio" v-model="distance" :value="0.5" name="distance" @change="retainRecord" @click="controlDistanceSingel($event)">500公尺
                            <input type="radio" v-model="distance" :value="1" name="distance" @change="retainRecord" @click="controlDistanceSingel($event)">1公里
                            <input type="radio" v-model="distance" :value="3" name="distance" @change="retainRecord" @click="controlDistanceSingel($event)">3公里
                            <input type="radio" v-model="distance" :value="5" name="distance" @change="retainRecord" @click="controlDistanceSingel($event)">5公里
                    </div>
                </div>
                <!-- <div v-if="filterNum == 6">
                    <div class="filter__option">
                        <label for="Expense">日期選擇：</label><br><br>
                        選擇特定日期：<date-picker v-model="time1" valueType="format"></date-picker><br><br>
                        選擇日期範圍：<date-picker v-model="time2" range></date-picker>
                    </div>
                </div> -->
                <div v-if="filterNum == 6" class="filter__option__wrap">
                    <div class="filter__option">
                        <label>日期：
                        </label>
                            <input type="radio" v-model="day" :value="0" name="day" @change="retainRecord" @click="controlDaySingel($event)">今天及時行樂
                            <input type="radio" v-model="day" :value="1" name="day" @change="retainRecord" @click="controlDaySingel($event)">明天預先安排
                            <input type="radio" v-model="day" :value="5" name="day" @change="retainRecord" @click="controlDaySingel($event)">週五尋找刺激
                            <input type="radio" v-model="day" :value="6" name="day" @change="retainRecord" @click="controlDaySingel($event)">週末可以不一樣<br>
                            
                    </div>

                    <div class="filter__option">
                        選擇特定日期<input type="date" v-model="day" name="day" >
                    </div>
                </div>
                

                </div>
            </section>

            <!-- Private Event List -->
            <section class="private__wrap">
                <div v-if="!this.showEvents.length" class="noneapi">找不到此條件的活動，請重新設定篩選</div>
                <router-link :to="`/Event/${e.eventId}`"
                v-for="e in showEvents" 
                :key="e.eventId"
                class="event__router gradient">
                    <div class="event">
                        <figure class="event__img">
                            <img class="img--resp" :src="getImg(e.cover)" alt="" width="">
                        </figure>
                    </div>
                    <h4>{{e.eventName}}</h4>
                    <h4>{{timeToString(e.hostTime)}}</h4>
                    <h4>{{getCity(e.cityId)}}、{{e.road}}</h4>
                    <span v-if="e.dist" class="event__distance"><h4 class="event__distance__text">{{e.dist}}公里</h4></span>
                </router-link>
            </section>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { apiEventList } from "../api"
// import { apiEventList } from '../apiConst'

export default {
    components: { DatePicker },
    data() {
        return {
            // 控制廣告
            myVar: null,
            onPage: 0,
            pages : null,
            //控制Filter
            filterNum: 0,
            lastFilterItem: null,
            cities: [],
            day: null,
            keyword: null,
            addr: "",
            checkEventTypes:[1,2,3,4,5,6,7,8,9,10,11],
            // time1: null,
            // time2: null,
            eventType: [],
            expense: null,
            group: null,
            distance: null,
            //Creat
            eventList: [],
            showEvents: [],
            adsArr:[
                { src:'/static/img/Beach.fffd3bb.png', alt: 'beach'},
                { src:'/static/img/Hiking.eb90d8e.jpg', alt: 'hiking'},
                { src:'/static/img/Yoga.395af21.png', alt: 'yoga'},
            ],
            eventType:[
                { eng: 'travel', zh: '旅行出遊' },
                { eng: 'fitness', zh: '運動健身' },
                { eng: 'party', zh: '唱歌派對' },
                { eng: 'show', zh: '影音展演' },
                { eng: 'game', zh: '遊戲卡牌' },
                { eng: 'meal', zh: '美食美酒' },
                { eng: 'invest', zh: '商業投資' },
                { eng: 'learn', zh: '體驗學習' },
                { eng: 'beauty', zh: '美容時尚' },
                { eng: 'consult', zh: '命理諮商' },
                { eng: 'other', zh: '其他' },
            ],
        }
    },
    computed:{
        listenChange(){
            const { cities, checkEventTypes, expense, group, keyword, distance, day } = this
            return{
                cities,
                checkEventTypes,
                expense,
                group,
                keyword,
                distance,
                day
            }
        }
    },
    watch:{
        listenChange(){

            this.showEvents = this.eventList.map(e => e)

            //篩選城市
            if(this.cities.length){
                this.showEvents = this.eventList.filter( e =>  this.cities.includes(e.cityId) )
            }

            //篩選活動類型
            this.showEvents = this.showEvents.filter( e => this.checkEventTypes.includes(e.typeId) )

            //篩選花費
            this.showEvents = this.showEvents.filter( e => {
                if(this.expense == null){
                    return true
                }
                return this.expense >= e.eventPrice
            } )

            // 篩選人數
            this.showEvents = this.showEvents.filter( e => {
                if(this.group == null){
                    return true
                }
                switch(this.group){
                    case "c":
                        return e.personLimit<=2
                    case "s":
                        return e.personLimit>=3 && e.personLimit<=4
                    case "m":
                        return e.personLimit>=5 && e.personLimit<=8
                    case "b":
                        return e.personLimit>=9
                }

            } )

            // 篩選距離
            this.showEvents = this.showEvents.filter( e => {
                if(this.distance == null){
                    return true
                }
                return this.distance >= e.dist
            } )

            // 關鍵字搜尋
            this.showEvents = this.showEvents.filter( e => {
                if(this.keyword == null || this.keyword == ""){
                    return true
                }
                return e.eventName.includes(this.keyword)
            } )

            // 篩選日期
            let now =null

            this.showEvents = this.showEvents.filter( e => {
                if(this.day == null){
                    return true
                }
                // console.log(this.day.length>1)

                if(this.day.length){
                    now = (new Date(this.day))
                }else{
                    now = (new Date())
                }
                
                let t = new Date(e.hostTime)

                let dayDiff = t.getDate() - now.getDate()
                // console.log(dayDiff)
                switch(this.day){
                    case 0:
                        return dayDiff ==0
                    case 1:
                        return dayDiff ==1
                    case 5:
                        return t.getUTCDay() == 5
                    case 6:
                        return t.getUTCDay() ==0 || t.getUTCDay() == 6
                    default:
                        return dayDiff ==0
                }

            } )

        },
    },
    methods:{
        dropdown(e){
            let self = e.target
            if(self.nodeName !== "LI"){return}
            if(this.filterNum == self.id){
                this.filterNum =0
                return
            }
            this.filterNum = self.id
        },
        changeAds(e){
            let self = e.target
            if(self.nodeName !== "LI"){return}
            let num = self.innerHTML
            document.querySelector('.ad').style.marginLeft = -num*99.1+'vw';

            this.pages[this.onPage].classList.remove('page--active')
            this.pages[num].classList.add('page--active')
            this.onPage = num
            clearInterval(this.myVar)
            this.myVar = setInterval(this.playAds,3000)
        },
        playAds(){
            if(!this.pages[this.onPage]){return}
            this.pages[this.onPage].classList.remove('page--active')
            this.onPage++;
            //待確認為何會出現null
            if(document.querySelector('.ad') == null){return;}
            document.querySelector('.ad').style.marginLeft = this.onPage*-(99.1)+'vw';
            if(this.onPage == this.pages.length){
                this.onPage = 0;
                document.querySelector('.ad').style.marginLeft = 0+'px';
            }
            this.pages[this.onPage].classList.add('page--active')
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
        controlExpenseSingel($event){
            console.log($event.target)
            let _this = this;
            window.setTimeout(() =>{
                if(!this.changed){
                    $event.target.checked = false
                    this.expense = null
                }
                _this.changed = false;
            }, 0);
        },
        controlGroupSingel($event){
            let _this = this;
            window.setTimeout(() =>{
                if(!this.changed){
                    $event.target.checked = false
                    this.group = null
                }
                _this.changed = false;
            }, 0);
        },
        controlDistanceSingel($event){
            let _this = this;
            window.setTimeout(() =>{
                if(!this.changed){
                    $event.target.checked = false
                    this.distance = null
                }
                _this.changed = false;
            }, 0);
        },
        controlDaySingel($event){
            let _this = this;
            window.setTimeout(() =>{
                if(!this.changed){
                    $event.target.checked = false
                    this.day = null
                }
                _this.changed = false;
            }, 0);
        },
        retainRecord(){
            this.changed = true
        },
        getImg(url){
            return `http://35.229.140.28/${url}`
        },
        getCity(num){
            const cities =["基隆市","台北市","新北市","桃園縣","新竹市","新竹縣","苗栗縣","台中市","彰化縣","南投縣","雲林縣","嘉義市","嘉義縣","台南市","高雄市","屏東縣","台東縣","花蓮縣","宜蘭縣","澎湖縣","金門縣","連江縣"]
            return cities[num-1]
        },
        getDistance(lat2, lon2, lat1, lon1) {

            if (( !lat2 && !lon2 )|| (!lat1 && !lon1)) {
                return "";
            }

            let radlat1 = Math.PI * lat1/180;
            let radlat2 = Math.PI * lat2/180;
            let theta = lon1-lon2;
            let radtheta = Math.PI * theta/180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
            dist = dist.toFixed(1);
            // if (unit=="K") { dist = dist * 1.609344 }
            // if (unit=="N") { dist = dist * 0.8684 }
            
            return dist;
        },
        searchCancel(){
            this.keyword = ""
        },
        selectAll(){
            this.checkEventTypes = [1,2,3,4,5,6,7,8,9,10,11]
        },
        unselectAll(){
            this.checkEventTypes = []
        },
        quickStar(option){
            switch(option){
                case 0:
                    this.day = 0;
                    break;
                case 5:
                    this.day =5;
                    this.group ="m"
                    this.checkEventTypes = [1,3,4,5,6]
                    break;
                case 6:
                    this.day =6
                    this.group ="m"
                    this.checkEventTypes = [1,4,6,8,9]
                    break;
            }
        },
        getLatLng(){
            let geocoder = new google.maps.Geocoder();

            let vm = this
            geocoder.geocode({
                "address": this.addr
            },function (res, status){
                if(status == "OK"){
                    console.log(res[0].geometry.location.lat())
                    console.log( res[0].geometry.location.lng())
                    vm.eventList.forEach(e => {
                        vm.$set(e, "dist", vm.getDistance(e.lat, e.lng, res[0].geometry.location.lat(), res[0].geometry.location.lng()))
                    });
                    // vm.holdEvent(res[0].geometry.location.lat(), res[0].geometry.location.lng())
                    // vm.save(res[0].geometry.location.lat(),res[0].geometry.location.lng())
                }else{
                    console.log("error")
                }
            })

        },
    },
    created(){

        //do we support geolocation
        // if(!("geolocation" in navigator)) {
        //     console.log('Geolocation is not available')
        //     return;
        // }
        // get position
        // navigator.geolocation.getCurrentPosition(pos => {
        // console.log(`Your location data is ${pos.coords.latitude }, ${ pos.coords.longitude}`)
        // this.lat1 = pos.coords.latitude
        // this.lon1 = pos.coords.longitude
        // }, err => {
        // console.log(err.message)
        // })

        apiEventList()
        .then( res =>{

            console.log("apiEventList", res)
            
            if (!Array.isArray(res.data)) {
              console.log("IS NOT ARRAY", res.data)
              return;
          }

            this.eventList = res.data

            // console.log(new Date().getTime())
            this.eventList = this.eventList.filter( e =>{
                return new Date(e.deadline).getTime() > new Date().getTime()
                // console.log(new Date(e.deadline).getTime())
            })

            this.eventList.sort(function (a, b) {
                return a.hostTime<b.hostTime?-1:1;
            });

            this.showEvents = this.eventList.map( e => e)
            console.log(this.eventList);
        })
        .catch( err=>{
            console.log(err);
        })

    },
    mounted() {
        this.pages = document.querySelector('.ads__pages').children
        document.querySelector('.page').classList.add('page--active')
        this.myVar = setInterval(this.playAds,3000)
    },
}
</script>


<style scoped>
.container{
    width: 75%;
    margin-left: auto;
    margin-right: auto;
}
.gradient{
    position: relative;
}
.ads{
    display: flex;
    overflow: hidden;
    height: 60vh;
}
.ad{
    transition: margin-left .5s;
    min-width: 100%;
}
.ads__pages{
    position: absolute;
    padding-left: 0;
    left: 50%;
    bottom: 5%;
    transform: translateX(-50%);
    display: flex;
}
.page{
    margin-right: 1em;
    border-radius: 999em;
    background-color: #EEE;
    width: 10px;
    height: 10px;
    display: block;
    /* 隱藏文字 */
    text-indent:-9999px;
}
.page--active{
    background-color:rgba(58, 58, 58, 0.383);
}
.img--resp{
    width: 100%;
    max-height: 100%;
    /* height: auto; */
}
.filter__wrap{
    border-radius: 10px;
    border-left: 2px solid white;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    box-shadow: 0 4px 2px -2px gray;
    background-color: #FFF;
    margin-top: 2em;
}
.filter__list{
    display: flex;
    justify-content: space-around;
    padding-left: 0;
    list-style-type: none;
    padding: 8px;
    margin-top: 0;
    margin-bottom: 0;
}
.filter__item{
    border-radius: 25px;
    padding: 8px 16px;
    cursor: pointer;
}
.filter__item:hover{
    background-color: #FFEEDF;
}
.arrow::after{
    content: "";
    border: solid black;
    border-width: 0px 2px 2px 0;
    display: inline-block;
    padding: 3px;
    border-color: transparent #B5B5B5 #B5B5B5 transparent;
    transform: rotate(-135deg);
    transition: all .5s;
    margin-left: .3em;
}
.chosen{
    background-color: #FFEEDF;
}
/* .arrow--dropdown{
    background-color: #FFEEDF;
} */
.arrow--dropdown::after{
    transform: rotate(45deg);
}
.filter__option__wrap{
    border-top: 1px solid #F3F3F3;
}
.filter__option{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    /* background-color: #FFEEDF; */
    box-sizing: border-box;
    padding: 1em;
    /* border: 1px solid black; */
    /* border-top: 1px solid gray; */
}
.filter__option input{
    margin-left: 1em;
}
.test{
    display: none;
}
.gradient{
    position: relative;
}
.public__wrap{
    display: flex;
    justify-content: space-between;
    padding: 1.5em 1em;
    cursor: pointer;
}
.private__wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1.5em 1em;
}
a{
    color: black;
    text-decoration: none;
}
.event__router{
    height: max-content;
    width: 21%;
    border-radius: 1em;
    background-color: white;
    /* overflow: hidden; */
    margin-bottom: 7vh;
}
.event__router h4,
.event__router h5{
    margin: .5em;
}
.event__router:hover figure{
    opacity: .7;
}
.event__router:hover {
    background-color: rgba(173, 173, 173, 0.15);
}
.event__img{
    margin: 0;
    border-radius: 1em 1em 0 0;
    overflow: hidden;
    height: 300px;
}
.event h4, .event h5{
    margin-top: .5em;
    margin-bottom: 0;
}
input[type=checkbox]{
    margin-bottom: 1em;
}
.serch__box{
    position: absolute;
    z-index: 99;
    top: 3.5%;
    left: 18%;
}
.search__engine{
    font-size: 1em;
    background-color: transparent;
}
.search__button--cancel{
    border: 0;
    background-color: #36363680;
    color: white;
    font-weight: bold;
    text-align: center;
    border-radius: 999em;
    padding: 0;
    width: 20px;
    height: 20px;
    /* position: absolute;
    right: 0; */
    cursor: pointer;
}
.search__button--cancel:hover{
    background-color: #363636;
}
.search__icon {
    position: absolute;
    transform: translateX(-120%);
    font-size: .67em;
}
.search__icon:before {
  width: 1em;
  height: 1em;
  border-radius: 1em;
  border: 0.2em solid #36363680;
  content:"";
  display: block;
  margin-left: .3em;
}
.search__icon:after {
  display: block;
  content: "";
  width: .2em;
  height: 0.8em;
  background-color: #36363680;
  transform:rotate(45deg);
  -ms-transform:rotate(45deg); 
  -moz-transform:rotate(45deg); 
  -webkit-transform:rotate(45deg); 
  margin-top: -.4em;
  margin-left: .2em;
}
.filter__option__button{
    width: max-content;
    padding-top: 0;
    /* padding-bottom: 0; */
    margin-left: 100%;
    transform: translateX(-100%);
}
.button--transparent{
    border-radius: 5px;
    padding: .5em 1em;
    background-color: transparent;
    border: 1px solid;
    font-size: .9em;
    cursor: pointer;
    margin-left: 2em;
}
.button--transparent:hover{
    background-color: #363636;
    color: white;
}
.event__distance{
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(100%);
    text-align: right;
}
.event__distance__text{
    margin: 0;
    color: gray;
    text-align: right;
}
.option{
    width: 30%;
}
.option__img{
    height: 23vh;
    margin: 0;
    border-radius: .5em;
    overflow: hidden;
}
.img--radious{
    height: 100%;
}
.option h4{
    display: inline-block;
    margin: 0;
    font-size: 1.5em;
    color: #008294;
}
.option:hover 
.option__img{
    opacity: .7;
}
.chevron-arrow-right {
  display: inline-block;
  border-right: 4px solid #008294;
  border-bottom: 4px solid #008294;
  width: 10px; height: 10px;
  transform: rotate(-45deg);
}
.noneapi{
    font-size: 1.5em;
    color: gray;
    text-align: center;
    padding: 1em;
}

</style>