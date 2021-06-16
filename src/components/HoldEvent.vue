<template>
    <div class="event container">
            <header class="event__header"><h1>馬上來舉辦一場活動吧！</h1></header>

            <article>

                <div class="article__img">

                    <label for="EvenImage">上傳活動照片：</label>
                    <input type="file" accept="image/*,.pdf" @change="previewImage" id="EventImage" name="" ><br>
                    <div class="previewImage" v-if="preview">
                        <img class="image--resp" :src="preview" />
                        <p>file name: {{ image.name }}</p>
                        <p>size: {{ image.size/1024 }}KB</p>
                    </div>

                    <!-- <div style="width:500px; height:500px">
                        <vueCropper
                        ref="cropper"
                        autoCrop
                        centerBox
                        fixed :fixedNumber="[1,1]"
                        canScale
                        :img=preview
                        ></vueCropper>
                    </div>
                    <button @click="getCropData()" ref="cropper" >確定</button>
                    <button @click="getData()" class="btn">download(base64)</button> -->
                    
                </div>

                <div class="article__text">
                    <form action="">
                    <label for="EventName">活動名稱：</label>
                    <input type="text"  id="EventName" name="" ref="EventName"><br>

                    <label for="EvenAddress">活動地點：</label>
                    <select name="" id="EvenAddress">
                        <optgroup label="北部地區">
                            <option value="01">基隆市</option>
                            <option value="02">台北市</option>
                            <option value="03">新北市</option>
                            <option value="04">桃園縣</option>
                            <option value="05">新竹市</option>
                            <option value="06">新竹縣</option>
                            <option value="07">苗栗縣</option>
                        </optgroup>
                        <optgroup label="中部地區">
                            <option value="08">台中市</option>
                            <option value="09">彰化縣</option>
                            <option value="10">南投縣</option>
                        </optgroup>
                        <optgroup label="南部地區">
                            <option value="11">雲林縣</option>
                            <option value="12">嘉義市</option>
                            <option value="13">嘉義縣</option>
                            <option value="14">台南市</option>
                            <option value="15">高雄市</option>
                            <option value="16">屏東縣</option>
                        </optgroup>
                        <optgroup label="東部地區">
                            <option value="17">台東縣</option>
                            <option value="18">花蓮縣</option>
                            <option value="19">宜蘭縣</option>
                        </optgroup>
                        <optgroup label="離島地區">
                            <option value="20">澎湖縣</option>
                            <option value="21">金門縣</option>
                            <option value="22">連江縣</option>
                        </optgroup>
                    </select><br>

                    <label for="HostTime">活動舉辦時間：</label>
                    <input type="datetime-local" id="HostTime" name="" v-model="hostTime"><br>

                    <label for="SpendTime">活動進行時間：</label>
                    <input type="number" id="SpendHours" name="" min="0" max="23" value="1">
                    <span>：</span>
                    <input type="number" id="SpendMins" name="" min="0" max="59" value="00">
                    <input class="overnight" type="checkbox" id="Overnight" name="">
                    <label for="Overnight">過夜</label><br>

                    <label for="EventPrice">活動花費：</label>
                    <input type="number" id="EventPrice" name="" value="100"> 元<br>

                    <label for="PeopleLimit">聚會上限人數：</label>
                    <input type="number" id="PeopleLimit" name="" value="4"> 人<br>

                    <label for="Deadline">報名截止時間：</label>
                    <input type="datetime-local" id="Deadline" name=""><br>

                    <div class="event__wrap">
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

                    <label for="EventContent">活動說明：</label><br>
                    <textarea
                    class="eventContent" 
                    id="EventConten"
                    name=""
                    rows="10"
                    placeholder="請為你的活動做一點說明吧"
                    ></textarea>

                    <!-- <br><br><input type="button" value="發起活動" class="submit"> -->
                    <br><br><router-link  to="/Event" class="nextStep" tag="button" >Continue</router-link>
                </form>
                </div>

            </article>
    </div>

</template>

<script>
import {VueCropper} from 'vue-cropper'

export default {
    data() {
        return {
                preview: null,
                image: null,
                eventCheck: [],
                hostTime: null,
            // event:[
            //     {preview: null},
            //     {image: null},
            //     {eventCheck: []},
            //     {hostTime},
            // ],
  
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
            ]
        }
    },
    components:{
        VueCropper,
    },
    mounted() {
        this.focusInput()
    },
    methods: {
        focusInput(){
            this.$refs.EventName.focus();
        },
        previewImage: function(event) {
            let input = event.target;
            if (input.files) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },        
        getCropData() {
            this.$refs.cropper.getCropData(data => {
                console.log(data)
            })
        },
        getData() {
            this.$refs.cropper.getCropData((baseUrl) => {
                this.cropperUrl = baseUrl
            })
        },
    }
}
</script>

<style>
    .container{
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid black;
    }
    .event header{
        text-align: center;
    }
    .event article{
        display: flex;
    }
    .event label{
        font-size: 1.5em;
        display: inline-block;
        margin-top: .67em;
    }
    .article__text  input{
        height: 2em;
        font-size: 1em;
    }
    .article__text{
        border: 1px solid black;
        width: 60%;
        margin-left: auto;
        
    }
    .article__img{
        border: 1px solid black;
    }
    #EventName{
        width: 45%;
    }
    #EventPrice, #PeopleLimit, #SpendHours, #SpendMins{
        width: 10%;
        text-align: center;
    }
    .event select{
        height: 2em;
        font-size: 1em;
    }
    .previewImage{
        width: 400px;
        height: 400px;
    }
    .image--resp{
        width: 100%;
        height: 100%;
    }
    .eventType input{
        width: 1em;
        height: 1em;
        margin-left: .67em;
    }
    .eventContent{
        font-size: 1.5em;
        width: 100%;
    }
    .submit{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    #Overnight{
        width: 1em;
        height: 1em;
        margin-left: 2em;
    }
    .event__wrap section{
        display: inline-block;
    }
    .event__wrap span{
        font-size: .67em;
        color: rgb(158, 158, 158);
    }
    .event__wrap input{
        width: 1em;
        height: 1em;
        margin-left: .67em;
    }
</style>