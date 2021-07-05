<template>
<div @click="closeemoji($event)">
    <div class="event container">
            <header class="event__header"><h1>馬上來舉辦一場活動吧！</h1></header>

            <article>
                
                <div class="article__img">

                    <div v-if="!isCropping" class="previewImage gradient" @click="addFile()">
                        <img class="image--resp" :src="preview" />

                        <label v-if="!preview" for="EvenImage" class="imageUpload__text">上傳活動照片</label>
                        <input type="file" 
                        id="EventImage" 
                        class="eventImage"
                        accept="image/*,.pdf" 
                        @change="previewImage($event), getFiles($event)" 
                        name="EvenImage" 
                        required>
                    </div>

                    <div v-else class="previewImage gradient">
                        <vue-cropper 
                        ref="cropper" 
                        autoCrop 
                        :img="preview" 
                        centerBox 
                        fixed :fixedNumber="[1,1]"/>
                        <button @click="getData()" class="button--transparent">裁剪圖片</button>
                    </div>
                    
                </div>

                <div class="article__text">
                    <form action="">
                    <label for="EventName">活動名稱：</label>
                    <input type="text"  id="EventName" name="" placeholder="請輸入活動名稱" ref="EventName" v-model="eventName" required><br>

                    <label for="EvenAddress">活動地點：</label>
                    <select name="" id="EvenAddress" v-model="cityId">
                        <option value="99" style="display:none">請選擇城市</option>
                        <optgroup label="北部地區">
                            <option value="0">基隆市</option>
                            <option value="1">台北市</option>
                            <option value="2">新北市</option>
                            <option value="3">桃園縣</option>
                            <option value="4">新竹市</option>
                            <option value="5">新竹縣</option>
                            <option value="6">苗栗縣</option>
                        </optgroup>
                        <optgroup label="中部地區">
                            <option value="7">台中市</option>
                            <option value="8">彰化縣</option>
                            <option value="9">南投縣</option>
                        </optgroup>
                        <optgroup label="南部地區">
                            <option value="10">雲林縣</option>
                            <option value="11">嘉義市</option>
                            <option value="12">嘉義縣</option>
                            <option value="13">台南市</option>
                            <option value="14">高雄市</option>
                            <option value="15">屏東縣</option>
                        </optgroup>
                        <optgroup label="東部地區">
                            <option value="16">台東縣</option>
                            <option value="17">花蓮縣</option>
                            <option value="18">宜蘭縣</option>
                        </optgroup>
                        <optgroup label="離島地區">
                            <option value="19">澎湖縣</option>
                            <option value="20">金門縣</option>
                            <option value="21">連江縣</option>
                        </optgroup>
                    </select>
                    <br>
                    <input type="text" id="EventRoad" name="" placeholder="請輸入地址" v-model="road" required><br>

                    <label for="HostTime">活動舉辦時間：</label>
                    <input type="datetime-local" id="HostTime" name="" v-model="hostTime"><br>

                    <label for="SpendTime">活動進行時間：</label>
                    <span v-show="!overnight">
                        <input type="number" id="SpendHours" name="" min="0" max="23"   v-model="costHours">
                        ：
                        <select name="SpendMins" id="SpendMins" v-model="costMinutes">
                            <option value="0">00</option>
                            <option value=".5">30</option>
                        </select>
                    </span>
                    <input class="overnight" type="checkbox" id="Overnight" name="Overnight" v-model="overnight">
                    <label for="Overnight" class="pointer">過夜</label><br>

                    <label for="EventPrice">活動花費：</label>
                    <span v-show="!isFree">
                        <input type="number" id="EventPrice" name="" value="100" v-model="eventPrice"> 元
                    </span>
                    <input class="isFree" type="checkbox" id="IsFree" name="IsFree" v-model="isFree">
                    <label for="IsFree" class="pointer">免費</label><br>
                    <br>

                    <label for="PeopleLimit">聚會上限人數：</label>
                    <input type="number" id="PeopleLimit" name="" value="4" v-model="personLimit"> 人<br>

                    <label for="Deadline">報名截止時間：</label>
                    <input type="datetime-local" id="Deadline" name="" v-model="deadline"><br>

                    <div class="event__wrap">
                        <label for="EventType">活動類型：</label>
                        <select name="EventType" id="EventType" required v-model="typeId">
                            <option value="99" style="display:none">請選擇活動類型</option>
                            <option v-for="(type,index) in eventType" :key="index" :value="index">{{type.zh}}</option>
                        </select>
                        <!-- <section v-for="(type, index) in eventType" :key=type.eng>
                            <input type="checkbox" 
                                        :id="'EventType'+(index+1)" 
                                        name="" 
                                        :value=type.eng 
                                        v-model="eventCheck" >
                            <label :for="'EventType'+(index+1)">{{type.zh}}</label>
                        </section> -->
                    </div>

                    <label for="EventContent">活動說明：</label>
                    <button class="button--emoji" type="button" @click="toogleDialogEmoji">😃</button>
                    <VEmojiPicker
                    v-show="showDialog"
                    :style="{ width: '440px', height: '200' }"
                    class="emoji"
                    labelSearch="Search"
                    lang="pt-BR"
                    @select="onSelectEmoji"
                    /><br>
                    
                    <textarea
                    class="eventContent" 
                    id="EventConten"
                    name=""
                    rows="10"
                    placeholder="請為你的活動做一點說明吧"
                    v-model.lazy="eventContent"
                    >
                    </textarea>

                    <br><br>
                    <button @click="holdEvent()" type="button" class="button--red">舉辦活動</button>
                </form>
                </div>

            </article>
    </div>
</div>
</template>

<script>
import { VueCropper }  from 'vue-cropper' 
import { apiEventPost } from '../api'
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";
import Moji from "./emoji.vue";

export default {
    data() {
        return {
                eventName:null,
                cityId:99,
                road:null,
                hostTime:null,
                deadline:null,
                eventPrice:200,
                isFree:false,
                cover:null,
                eventContent:"",
                costTime:null,
                costHours:2,
                costMinutes:0,
                overnight: false,
                personLimit:6,
                typeId: 99,
                memberId: this.$cookies.get("MemberId"),
                status: true,
                parent: null,
                showDialog: false,
                isCropping: false,
                lat: 0,
                lng: 0,
                geo: null,

                preview: null,
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
        VEmojiPicker,
        Moji,
    },
    mounted() {
        this.focusInput()
        console.log(categoriesDefault);
        console.log("Total emojis:", emojisDefault.length);
    },
    methods: {
        focusInput(){
            this.$refs.EventName.focus();
        },
        previewImage(event) {
            let input = event.target;
            if (input.files) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                    this.isCropping = true;
                    // console.log(this.preview)
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        getFiles(e){
            console.log(e)
            console.log( e.target.files[0])
            this.cover = e.target.files[0]
        },
        dataURLtoFile(dataurl, filename) { 
            let arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            this.cover = new File([u8arr], filename, { type: mime });

        },
        checkOvernight(){
            if(this.overnight){
                this.costTime = 24;
            }else{
                this.costTime = this.costHours+this.costMinutes;
            }
        },
        checkFree(){
            if(this.isFree){
                this.eventPrice = 0;
            }
        },
        getCity(num){
            const cities =["基隆市","台北市","新北市","桃園縣","新竹市","新竹縣","苗栗縣","台中市","彰化縣","南投縣","雲林縣","嘉義市","嘉義縣","台南市","高雄市","屏東縣","台東縣","花蓮縣","宜蘭縣","澎湖縣","金門縣","連江縣"]
            return cities[num-1]
        },
        // getLatLng(){
        //     let addr = this.getCity(this.cityId)+this.road
        //     let geocoder = new google.maps.Geocoder();

        //     let vm = this
        //     geocoder.geocode({
        //         "address": addr
        //     },function (res, status){
        //         if(status == "OK"){
        //             vm.holdEvent(res[0].geometry.location.lat(), res[0].geometry.location.lng())
        //             // vm.save(res[0].geometry.location.lat(),res[0].geometry.location.lng())
        //         }else{
        //             console.log("error")
        //         }
        //     })

        // },
        holdEvent(){

            this.checkOvernight();
            this.checkFree();


            let formData = new FormData();
            formData.append("EventName", this.eventName);
            formData.append("CityId", this.cityId);
            formData.append("Road", this.road);
            formData.append("HostTime", this.hostTime);
            formData.append("Deadline", this.deadline);
            formData.append("EventPrice", this.eventPrice);
            formData.append("Cover", this.cover);
            formData.append("EventContent", this.eventContent);
            formData.append("CostTime", this.costTime);
            formData.append("PersonLimit", this.personLimit);
            formData.append("TypeId", this.typeId);
            formData.append("MemberId", this.$cookies.get("MemberId"));
            // formData.append("Status", "true");
            // formData.append("Parent", "");
            // formData.append("Lat", lat);
            // formData.append("Lng", lng);

            for(let value of formData.values()){
                console.log(value)
            }

            apiEventPost(
                formData
            )
            .then(res =>{
                console.log(res.data)
                this.$router.push({path:'/ManageEvent'})
            })
            .catch(err =>{
                console.log(err)
            })
        },
        toogleDialogEmoji() {
            this.showDialog = !this.showDialog;
            // document.querySelector(".button--emoji").style = "background-color: black"
        },
        onSelectEmoji(emoji) {
            this.eventContent += emoji.data;
            // Optional
            // this.toogleDialogEmoji();
        },
        addFile(){
            document.getElementById("EventImage").click();
        },
        getData(){
            this.$refs.cropper.getCropData((data) => {
            this.preview = data
            this.dataURLtoFile(data, this.image.name)
            })

            this.isCropping = false;
        },
        closeemoji(e){
            if(this.showDialog){
                console.log(e.target.classList[0])
                if(e.target.classList[0].includes("emoji") || e.target.classList[0] == "category"){return}
                this.showDialog = false
            }
        }
    }
}
</script>

<style scoped>
    .container{
        width: 40%;
        background-color: #FFFFFF;
        border-radius: 15px;
        padding: 1em 2.5em;
        margin: 3em auto;
    }
    .event header{
        text-align: center;
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
    #EventName{
        width: 30%;
    }
    #EventRoad{
        width: 80%;
    }
    #EventPrice, #PeopleLimit, #SpendHours, #SpendMins{
        width: 8%;
        text-align: center;
    }
    .event select{
        height: 2em;
        font-size: 1em;
    }
    .previewImage{
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        height: 400px;
        /* border: 5px dashed #FF9100; */
        border: 3px dashed #E1E1E1;
        cursor: pointer;
    }
    .imageUpload__text{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
        z-index: 1;
    }
    .image--resp{
        width: 100%;
        max-height: 100%;
    }
    .eventImage{
        display: none;
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
        margin-left: 1em;
    }
    #IsFree{
        width: 1em;
        height: 1em;
        margin-left: 1em;
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
    .button--emoji{
        display: inline-block;
        margin-right: 0;
        cursor: pointer;
        font-size: 1.2em;
        background-color: white;
        border: 1px solid black;
    }
    .button--emoji:hover{
        background-color: #363636;
    }
    .emoji{
        position: absolute;
    }
    .pointer{
        cursor: pointer;
    }
    .button--transparent{
        border-radius: 5px;
        padding: .5em 1em;
        /* background-color: transparent; */
        background-color: #363636;
        color: white;
        border: 1px solid;
        font-size: .9em;
        cursor: pointer;
        width: max-content;
        margin-left: 100%;
        transform: translateX(-100%);
    }
    .button--transparent:hover{
        background-color: #3636365e;
        /* color: white; */
    }
</style>