<template>
    <div class="container">

        <section class="ads__wrap gradient">
            <div class="ads">
                <img v-for="ad in adsArr" :key="ad.alt" class="ad img--resp" :src=ad.src :alt=ad.alt>
            </div>
            <ol @click="changeAds" class="ads__pages">
                <li v-for="(ad, index) in adsArr" :key="ad.alt" class="page">{{index}}</li>
            </ol>
        </section>

        <!-- Public Event List -->
        <section class="public__wrap">
            <div v-for="n in 4" :key="n" class="event">
                <figure class="event__img">
                    <img class="img--resp" src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
                </figure>
                <h4>桌遊團</h4>
                <h5>(星期一) 六月14日 19：00</h5>
                <h5>106台北市大安區師大路9號</h5>
            </div>
        </section>


        <!-- 篩選器 -->
        <section class="filter__wrap gradient">
            <ul @click="dropdown($event)" class="filter_list">
                <li class="1">活動類型</li>
                <li class="2">花費</li>
                <li class="3">人數</li>
                <li class="4">城市</li>
                <li class="5">距離</li>
                <li class="6">時間</li>
            </ul>
            <div>
            <div v-if="filterNum == 1" class="filter__option">
                <label for="EventType">活動類型：</label>
                <div v-for="(type, index) in eventType" :key=type.eng>
                    <input type="checkbox" 
                                :id="'EventType'+(index+1)" 
                                name="" 
                                :value=type.eng 
                                v-model="eventCheck" >
                    <label :for="'EventType'+(index+1)">{{type.zh}}</label>
                </div>
            </div>
            <div v-if="filterNum == 2" class="filter__option">
                <label for="Expense">費用：</label>
                <input type="radio" id="free" name="Expense">免費
                <input type="radio" id="lt300" name="Expense">300以內
                <input type="radio" id="lt500" name="Expense">500以內
                <input type="radio" id="lt1000" name="Expense">1000以內
            </div>
            <div v-if="filterNum == 3" class="filter__option">
                <label for="Expense">聚會人數：</label>
                <input type="radio" id="" name="people">兩人聚會
                <input type="radio" id="" name="people">小型聚會(3~4人)
                <input type="radio" id="" name="people">中型聚會(5~8人)
                <input type="radio" id="" name="people">大型聚會(8人以上)
            </div>
            <div v-if="filterNum == 4" class="filter__option">
                <label for="Expense">聚會地點：</label>
                <div v-for="city in cities" :key=city.value>
                    <input type="checkbox" v-model="cityCheck" :id="'City:'+(index+1)" name="City">
                    <label :for="'City:'+(index+1)">{{city.value}}</label>
                </div>
            </div>
            <div v-if="filterNum == 5" class="filter__option">
                <label for="Expense">距離：</label>
                <input type="radio" id="" name="distance">500公尺以內
                <input type="radio" id="" name="distance">1公里以內
                <input type="radio" id="" name="distance">3公里以內
                <input type="radio" id="" name="distance">5公里以內
            </div>
            <div v-if="filterNum == 6" class="filter__option">
                <div>
                    <label for="Expense">日期選擇：</label><br><br>
                    選擇日期：<date-picker v-model="time1" valueType="format"></date-picker><br><br>
                    選擇日期範圍：<date-picker v-model="time2" range></date-picker>
                </div>
            </div>

            </div>
        </section>

        <!-- Private Event List -->

        <!-- <section class="private__wrap gradient">
            <div v-for="e in eventList" 
            :key="e.eventId"
            @click="goTo(e)"
            class="event">
                <figure class="event__img">
                    <img class="img--resp" src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
                </figure>
                <h4>{{e.eventName}}</h4>
                <h5>{{timeToString(e.hostTime)}}</h5>
                <h5>{{e.addressId}}</h5>
            </div>
        </section> -->

        <section class="private__wrap gradient">
            <router-link :to="/Event/+e.eventId"
            v-for="e in eventList" 
            :key="e.eventId">
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
            //EventList
            eventList: null,
            filterNum: 0,
            eventCheck: [],
            cityCheck: [],
            adsArr:[
                { src:'https://drupal8-prod.visitcalifornia.com/sites/drupal8-prod.visitcalifornia.com/files/styles/fluid_1200/public/2020-06/VC_Experiences_ReopeningBeaches_RF_1156532604_1280x640.jpg?itok=tPCjquVe', alt: 'beach'},
                { src:'https://res.cloudinary.com/whistler/image/upload/w_500,c_scale,dpr_3.0,q_auto/v1/s3/images/header/hiking-header.jpg', alt: 'hiking'},
                { src:'https://www.visittheusa.com/sites/default/files/styles/hero_l_x2/public/images/hero_media_image/2019-06/eb8cf4b594d4e921b074d1424a671fec.jpeg?itok=TyfJTE8x', alt: 'wood bridge'},
            ],
            eventList:null,
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
            cities:[
                {value: '基隆市'},
                {value: '台北市'},
                {value: '新北市'},
                {value: '桃園縣'},
                {value: '新竹市'},
                {value: '新竹縣'},
                {value: '苗栗縣'},
                {value: '台中市'},
                {value: '彰化縣'},
                {value: '南投縣'},
                {value: '雲林縣'},
                {value: '嘉義市'},
                {value: '嘉義縣'},
                {value: '台南市'},
                {value: '高雄市'},
                {value: '屏東縣'},
                {value: '台東縣'},
                {value: '花蓮縣'},
                {value: '宜蘭縣'},
                {value: '澎湖縣'},
                {value: '金門縣'},
                {value: '連江縣'},
            ],
            time1: null,
            time2: null,
        }
    },
    methods:{
        dropdown(e){
            let self = e.target
            if(self.nodeName !== "LI"){return}
            if(this.filterNum == self.className){
                this.filterNum =0
                return
            }
            this.filterNum = self.className;
        },
        changeAds(e){
            let self = e.target
            if(self.nodeName !== "LI"){return}
            let num = self.innerHTML
            document.querySelector('.ad').style.marginLeft = -num*1000+'px';

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
            document.querySelector('.ad').style.marginLeft = this.onPage*-1000+'px';
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
    width: 60%;
    margin-left: auto;
    margin-right: auto;
}
.gradient{
    position: relative;
}
.ads{
    display: flex;
    overflow: hidden;
    width: 1000px;
    height: 575px;
    margin-left: auto;
    margin-right: auto;
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
    background-color:rgba(184, 184, 184, 0.637);
}
.img--resp{
    width: 100%;
    max-height: 100%;
}
.filter__wrap{
    border-top: 1px solid #F6F6F6;
    border-bottom: 1px solid black;
    box-shadow: 0 4px 2px -2px gray;

}
.filter_list{
    display: flex;
    justify-content: space-around;
    padding-left: 0;
    list-style-type: none;
}
.filter__option{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: #FFEEDF;
    box-sizing: border-box;
    padding: 1em;
    border: 1px solid black;
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
.event{
    height: 25vh;
    width: 20%;
    padding: .5em;
    border: 1px solid black;
    border-radius: 1em;
    overflow: hidden;
}
.event figure{
    margin: 0;
}
.event h4, .event h5{
    margin-top: .5em;
    margin-bottom: 0;
}
</style>