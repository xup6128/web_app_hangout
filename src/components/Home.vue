<template>
    <div>

        <section class="ads__wrap gradient">
            <div class="ads">
                <img v-for="ad in adsArr" :key="ad.alt" class="ad img--resp" :src=ad.src :alt=ad.alt>
            </div>
            <ol @click="changeAds" class="ads__pages">
                <li v-for="(ad, index) in adsArr" :key="ad.alt" class="page">{{index}}</li>
            </ol>
        </section>

        <div class="container">

            <!-- Public Event List -->

            <!-- <section class="public__wrap">
                <div v-for="n in 4" :key="n" class="event">
                    <figure class="event__img">
                        <img class="img--resp" src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
                    </figure>
                    <h4>桌遊團</h4>
                    <h5>(星期一) 六月14日 19：00</h5>
                    <h5>106台北市大安區師大路9號</h5>
                </div>
            </section> -->


            <!-- 篩選器 -->
            <section class="filter__wrap gradient">
                <ul @click="dropdown($event)" class="filter__list">
                    <li id="4" class="filter__item arrow">城市</li>
                    <li id="6" class="filter__item arrow">日期</li>
                    <li id="1" class="filter__item arrow">活動類型</li>
                    <li id="2" class="filter__item arrow">花費</li>
                    <li id="3" class="filter__item arrow">人數</li>
                    <li id="5" class="filter__item arrow">距離</li>
                </ul>
                <div>
                <div v-if="filterNum == 1" class="filter__option__wrap">
                    <div class="filter__option">活動類型：
                        <label  v-for="(type, index) in eventType" :key=type.eng>
                                    <input type="checkbox" 
                                    name="eventType" 
                                    :value=index 
                                    v-model="eventType" >
                                    {{type.zh}}
                        </label>
                    </div>
                </div>
                <div v-if="filterNum == 2" class="filter__option__wrap">
                    <div class="filter__option">
                        <label>預算：
                            <input type="radio" v-model="expense" value="0" name="Expense" @change="retainRecord" @click="controlSingel($event)">免費
                            <input type="radio" v-model="expense" value="300" name="Expense" @change="retainRecord" @click="controlSingel($event)">300以內
                            <input type="radio" v-model="expense" value="500" name="Expense" @change="retainRecord" @click="controlSingel($event)">500以內
                            <input type="radio" v-model="expense" value="1000" name="Expense" @change="retainRecord" @click="controlSingel($event)">1000以內
                        </label>
                    </div>
                </div>
                <div v-if="filterNum == 3" class="filter__option__wrap">
                    <div class="filter__option">
                        <label>聚會人數：
                            <input type="radio" v-model="group" value="2" name="people" @change="retainRecord" @click="controlSingel($event)">兩人聚會
                            <input type="radio" v-model="group" value="4"  name="people" @change="retainRecord" @click="controlSingel($event)">小型聚會(3~4人)
                            <input type="radio" v-model="group" value="8"  name="people" @change="retainRecord" @click="controlSingel($event)">中型聚會(5~8人)
                            <input type="radio" v-model="group" value="999"  name="people" @change="retainRecord" @click="controlSingel($event)">大型聚會(8人以上)
                        </label>
                    </div>
                </div>
                <div v-if="filterNum == 4" class="filter__option__wrap">
                    <div class="filter__option">北部地區：
                        <label><input type="checkbox" v-model="cities"  value="0" name="City">基隆市</label>
                        <label><input type="checkbox" v-model="cities"  value="1" name="City">台北市</label>
                        <label><input type="checkbox" v-model="cities"  value="2" name="City">新北市</label>
                        <label><input type="checkbox" v-model="cities"  value="3" name="City">桃園縣</label>
                        <label><input type="checkbox" v-model="cities"  value="4" name="City">新竹市</label>
                        <label><input type="checkbox" v-model="cities"  value="5" name="City">新竹縣</label>
                        <label><input type="checkbox" v-model="cities"  value="6" name="City">苗栗縣</label>
                    </div>
                    <div class="filter__option">中部地區：
                        <label><input type="checkbox" v-model="cities"  value="7" name="City">台中市</label>
                        <label><input type="checkbox" v-model="cities"  value="8" name="City">彰化縣</label>
                        <label><input type="checkbox" v-model="cities"  value="9" name="City">南投縣</label>
                    </div>
                    <div class="filter__option">南部地區：
                        <label><input type="checkbox" v-model="cities"  value="10" name="City">雲林縣</label>
                        <label><input type="checkbox" v-model="cities"  value="11" name="City">嘉義市</label>
                        <label><input type="checkbox" v-model="cities"  value="12" name="City">嘉義縣</label>
                        <label><input type="checkbox" v-model="cities"  value="13" name="City">台南市</label>
                        <label><input type="checkbox" v-model="cities"  value="14" name="City">高雄市</label>
                        <label><input type="checkbox" v-model="cities"  value="15" name="City">屏東縣</label>
                    </div>
                    <div class="filter__option">東部地區：
                        <label><input type="checkbox" v-model="cities"  value="16" name="City">台東縣</label>
                        <label><input type="checkbox" v-model="cities"  value="17" name="City">花蓮縣</label>
                        <label><input type="checkbox" v-model="cities"  value="18" name="City">宜蘭縣</label>
                    </div>
                    <div class="filter__option">離島地區：
                        <label><input type="checkbox" v-model="cities"  value="19" name="City">澎湖縣</label>
                        <label><input type="checkbox" v-model="cities"  value="20" name="City">金門縣</label>
                        <label><input type="checkbox" v-model="cities"  value="21" name="City">連江縣</label>
                    </div>
                </div>
                <div v-if="filterNum == 5" class="filter__option__wrap">
                    <div class="filter__option">
                        <label>距離：
                            <input type="radio" v-model="distance" value="500" name="distance" @change="retainRecord" @click="controlSingel">500公尺以內
                            <input type="radio" v-model="distance" value="1000" name="distance" @change="retainRecord" @click="controlSingel">1公里以內
                            <input type="radio" v-model="distance" value="3000" name="distance" @change="retainRecord" @click="controlSingel">3公里以內
                            <input type="radio" v-model="distance" value="5000" name="distance" @change="retainRecord" @click="controlSingel">5公里以內
                        </label>
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
                            <input type="radio" v-model="day" value="0" name="day" @change="retainRecord" @click="controlSingel">今天我想來點
                            <input type="radio" v-model="day" value="1" name="day" @change="retainRecord" @click="controlSingel">明天會更好
                            <input type="radio" v-model="day" value="500" name="day" @change="retainRecord" @click="controlSingel">週五找刺激
                            <input type="radio" v-model="day" value="1000" name="day" @change="retainRecord" @click="controlSingel">週末不一樣
                        </label>
                    </div>
                </div>
                

                </div>
            </section>

            <!-- Private Event List -->
            <section class="private__wrap">
                <router-link :to="`/Event/${e.eventId}`"
                v-for="e in eventList" 
                :key="e.eventId"
                class="event__router">
                    <div class="event">
                        <figure class="event__img">
                            <img class="img--resp" src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
                        </figure>
                        <h4>{{e.eventName}}</h4>
                        <h5>{{timeToString(e.hostTime)}}</h5>
                        <h5>{{e.addressId}}</h5>
                    </div>
                </router-link>
            </section>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { apiEventList } from "../api"


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
            // time1: null,
            // time2: null,
            eventType: [],
            expense: null,
            group: null,
            distance: null,
            //Creat
            eventList: [],
            adsArr:[
                { src:'https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/19/79/197931_v3.jpeg', alt: 'beach'},
                { src:'https://www.incimages.com/uploaded_files/image/1920x1080/getty_1141196125_411306.jpg', alt: 'hiking'},
                { src:'https://discoverhalifaxns.com/wp-content/uploads/2020/07/Crystal-Crescent-Beach_-IMG_0024.jpg', alt: 'wood bridge'},
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
    methods:{
        dropdown(e){
            let self = e.target
            if(self.nodeName !== "LI"){return}
            if(this.lastFilterItem){
                this.lastFilterItem.classList.remove('arrow--dropdown')
            }
            if(this.filterNum == self.id){
                // console.log(self.classList)
                self.classList.remove('arrow--dropdown')
                this.filterNum =0
                return
            }
            self.classList.add('arrow--dropdown')
            this.lastFilterItem = self;
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
        controlSingel($event){
            let _this = this;
            window.setTimeout(() =>{
                if(!this.changed){
                    $event.target.checked = false
                    this.expense = null
                }
                _this.changed = false;
            }, 0);
        },
        retainRecord(){
            this.changed = true
        },
        //跳轉前頁面傳參數：
        // goTo(item) {
        //     //storageData中數據用於跳轉到下一個頁面之後，進行返回時能夠返回到跳轉之前的頁面
        //     let storageData = {
        //         searchWords: this.keyWord,
        //         pageSize: this.paging.pageSize,
        //         pageNo: this.paging.currentPage 
        //     };
        //     //data中數據用於將本頁面中數據通過跳轉功能將其應用到下一個頁面，與父子組件傳值同理
        //     let data = {
        //         type: item.srcType,
        //         tableName: item.tableName,
        //         name: item.datasourceName,
        //         tableId: item.tableId,
        //         id: item.datasourceId,
        //     };
        //     //將下一個頁面中將會用到的數據全部push到$router中
        //     this.$router.push({
        //         //name表示跳轉之後的資源前端訪問路徑，query用於存儲待使用數據，其中page是本頁面name,
        //         name: 'onlineSearch',
        //         query: {targetData: data ,storageData,
        //         page:'/Event',
        //         isBackSelect: true,
        //         goBackName:'dataSearch'
        //         }
        //     })    
        // }
    },
    created(){
        apiEventList({})
        .then( res =>{
            this.eventList = res.data
            console.log(this.eventList);
        })
        .catch( err=>{
            console.log(err);
        })

        //do we support geolocation
        if(!("geolocation" in navigator)) {
            console.log('Geolocation is not available')
            return;
        }
        // get position
        navigator.geolocation.getCurrentPosition(pos => {
        console.log(`Your location data is ${pos.coords.latitude }, ${ pos.coords.longitude}`)
        }, err => {
        console.log(err.message)
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
    height: auto;
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
.arrow--dropdown{
    background-color: #FFEEDF;
}
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
}
.private__wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1.5em 1em;
}
.private__wrap .event{
    margin-bottom: 1.5em;
}
a{
    color: black;
    text-decoration: none;
}
.event__router{
    height: 25vh;
    width: 20%;
    padding: .5em;
    border: 1px solid black;
    border-radius: 1em;
    overflow: hidden;
    background-color: white;
    margin-bottom: 2em;
}
/* .event{
    height: 25vh;
    width: 20%;
    padding: .5em;
    border: 1px solid black;
    border-radius: 1em;
    overflow: hidden;
    background-color: white;
} */
.event figure{
    margin: 0;
}
.event h4, .event h5{
    margin-top: .5em;
    margin-bottom: 0;
}
input[type=checkbox]{
    margin-bottom: 1em;
}
</style>