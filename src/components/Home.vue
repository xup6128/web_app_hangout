<template>
    <div class="container">
        <section class="ads__wrap">
            <div class="ads">
                <img class="ad img--resp" src="https://blog.tripbaa.com/wp-content/uploads/2021/01/800x_100_w-5fe0e1b8dd68c.jpg" alt="">
            </div>
        </section>

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
                <section v-for="(type, index) in eventType" :key=type.eng>
                    <input type="checkbox" 
                                :id="'EventType'+(index+1)" 
                                name="" 
                                :value=type.eng 
                                v-model="eventCheck" >
                    <label :for="'EventType'+(index+1)">{{type.zh}}</label>
                </section>
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
                <input type="checkbox" v-model="cityCheck" id="" name="city">{{city.value}}
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

        <section class="private__wrap">
            <div v-for="n in 12" :key="n" class="event">
                <figure class="event__img">
                    <img class="img--resp" src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
                </figure>
                <h4>桌遊團</h4>
                <h5>(星期一) 六月14日 19：00</h5>
                <h5>106台北市大安區師大路9號</h5>
            </div>
        </section>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: { DatePicker },
    data() {
        return {
            filterNum: 0,
            eventCheck: [],
            cityCheck: [],
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
        }
    },
}
</script>


<style scoped>
.container{
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    /* border: 1px solid black; */
}
.ads{
    height: 40vh;
}
.img--resp{
    width: 100%;
    max-height: 100%;
}
.filter__wrap{
border: 1px solid black;
}
.filter_list{
    display: flex;
    justify-content: space-around;
    padding-left: 0;
    list-style-type: none;
}
.gradient{
    position: relative;
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
.public__wrap{
    height: 25vh;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid black; */
    padding: 1.5em 1em;
}
.private__wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* border: 1px solid black; */
    padding: 1.5em 1em;
}
.private__wrap .event{
    margin-bottom: 1.5em;
}
.event{
    width: 20%;
    padding: .5em;
    border: 1px solid black;
}
.event figure{
    margin: 0;
}
.event h4, .event h5{
    margin-top: .5em;
    margin-bottom: 0;
}
</style>