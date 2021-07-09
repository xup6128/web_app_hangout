<template>
<div @click="closeemoji($event)" class="mostly-customized-scrollbar">
    <div class="container gradient">
        <header><h1>會員資料填寫</h1></header>
        <form action="/action_page.php">

            <div class="form__img">

                <div v-if="!isCropping" class="previewImage gradient" @click="addFile()">
                    <img class="image--resp" :src="preview" />

                    <label v-if="!preview" for="Image" class="imageUpload__text">上傳照片</label>
                    <input type="file" 
                    id="Image" 
                    class="imageUpload__button"
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

            <div class="form__text">
                <label for="Name">*名稱：</label>
                <input type="text" v-model="name" id="Name" name="Name" required autofocus><br>
                <label for="Sex">*性別：</label>
                <input type="radio" v-model="gender" id="Male" name="Sex" :value="2" class="checkBox">男姓
                <input type="radio" v-model="gender" id="Female" name="Sex" :value="1" class="checkBox">女姓<br>
                <label for="Birthday">*生日：</label>
                <input type="date" v-model="birth" id="Birthday" name="Birthday" required><br>
                <label for="Location">*居住城市：</label>
                <select v-model="city" name="Location" id="Location" required>
                    <optgroup label="北部地區">
                        <option :value="1">基隆市</option>
                        <option :value="2">台北市</option>
                        <option :value="3">新北市</option>
                        <option :value="4">桃園縣</option>
                        <option :value="5">新竹市</option>
                        <option :value="6">新竹縣</option>
                        <option :value="7">苗栗縣</option>
                    </optgroup>
                    <optgroup label="中部地區">
                        <option :value="8">台中市</option>
                        <option :value="9">彰化縣</option>
                        <option :value="10">南投縣</option>
                    </optgroup>
                    <optgroup label="南部地區">
                        <option :value="11">雲林縣</option>
                        <option :value="12">嘉義市</option>
                        <option :value="13">嘉義縣</option>
                        <option :value="14">台南市</option>
                        <option :value="15">高雄市</option>
                        <option :value="16">屏東縣</option>
                    </optgroup>
                    <optgroup label="東部地區">
                        <option :value="17">台東縣</option>
                        <option :value="18">花蓮縣</option>
                        <option :value="19">宜蘭縣</option>
                    </optgroup>
                    <optgroup label="離島地區">
                        <option :value="20">澎湖縣</option>
                        <option :value="21">金門縣</option>
                        <option :value="22">連江縣</option>
                    </optgroup>
                </select><br>

                <div class="eventType__wrap">
                    <label for="EventType">*感興趣的活動：</label>
                    <section v-for="(type, index) in eventType" :key=type.eng>
                        <input type="checkbox" 
                                    :id="'EventType'+(index+1)" 
                                    class="checkBox"
                                    name="EventType" 
                                    :value=index+1
                                    v-model="eventCheck" >
                        <label :for="'EventType'+(index+1)">{{type.zh}}</label>
                    </section>
                </div>

                <label for="JobType" class="gradient">工作類型：</label>
                <input type="text" v-model="category" id="JobType" name="JobType" placeholder="(選填)"><br>
                <label for="JobTitle" class="gradient">工作職稱：</label>
                <input type="text" v-model="jobtitle" id="JobTitle" name="JobTitle" placeholder="(選填)"><br>
                <label for="Intro" class="intro">*自我介紹：</label>
                <button class="button--emoji" type="button" @click="toogleDialogEmoji">😃</button><br>
                <VEmojiPicker
                v-show="showDialog"
                :style="{ width: '440px', height: '200' }"
                class="emoji"
                labelSearch="Search"
                lang="pt-BR"
                @select="onSelectEmoji"
                />
                <textarea 
                name="Intro" 
                v-model="intro" 
                id="Intro" 
                style="font-size:1.5em" 
                cols="70" 
                rows="15" 
                placeholder="幫助大家更快速了解你自己" 
                required
                maxlength="1000"></textarea><br>

                <button @click="signup()" type="button" class="button--red">註冊</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import { apiMemberSignUp } from "../api"
import { VueCropper }  from 'vue-cropper' 
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";

export default {
    data(){
        return{
            email: this.$route.params.email,
            password: this.$route.params.password,
            photo: null,
            preview: null,
            name: null,
            gender: null,
            birth: null,
            city: null,
            eventCheck: [],
            category: "",
            jobtitle: "",
            intro: "",
            showDialog: false,
            isCropping: false,
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
            ]
        }
    },
    components:{
        VueCropper,
        VEmojiPicker
    },
    methods: {
        addFile(){
            document.getElementById("Image").click();
        },
        previewImage(event) { 
            let input = event.target;
            if (input.files) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                    this.isCropping = true;
                }
                this.image=input.files[0];
                //Test
                // this.files=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        getFiles(e){
            console.log(e)
            console.log( e.target.files[0])
            this.photo = e.target.files[0]
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
            this.photo = new File([u8arr], filename, { type: mime });

        },
        getData(){
            this.$refs.cropper.getCropData((data) => {
            this.preview = data
            this.dataURLtoFile(data, this.image.name)
            })

            this.isCropping = false;
        },
        signup(){

            let formData = new FormData();
            formData.append("Account", this.email);
            formData.append("Password", this.password);
            formData.append("Name", this.name);
            formData.append("MemberPhoto", this.photo);
            formData.append("Gender", this.gender);
            formData.append("Birth", this.birth);
            formData.append("CityId", this.city);
            formData.append("Category", this.category);
            formData.append("JobTitle", this.jobtitle);
            formData.append("intro", this.intro);
            
            for( let i=0;i<this.eventCheck.length;i++){
                formData.append("Type", this.eventCheck[i]);
            }

            for(let value of formData.values()){
                console.log(value)
            }
            

            apiMemberSignUp(
                formData,
            )
            .then(res =>{
                console.log(res)
                alert("會員註冊成功")
                this.$router.push({path: '/Login'})
            })
            .catch(err =>{
                console.log(err)
                alert("會員註冊失敗，請確認所有資料都已填上")
            })
        },
        toogleDialogEmoji() {
            this.showDialog = !this.showDialog;
            // document.querySelector(".button--emoji").style = "background-color: black"
        },
        onSelectEmoji(emoji) {
            this.intro += emoji.data;
            // Optional
            // this.toogleDialogEmoji();
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
header{
    text-align: center;
}
label{
    font-size: 1.5em;
    display: inline-block;
    margin-top: .67em;
}
input, select{
    height: 2em;
    font-size: 1em;
}
section{
    display: inline-block;
}
.checkBox{
    height: 1em;
}
.form__img{
    display: flex;
}
.gradient{
    position: relative;
}
.previewImage{
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    height: 400px;
    border: 3px dashed #E1E1E1;
    /* border-radius: 50%;
    overflow: hidden; */
    cursor: pointer;
}
.submit{
    display: block;
    margin-left: auto;
    margin-right: auto;
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
.imageUpload__text{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    cursor: pointer;
    z-index: 1;
}
.imageUpload__button{
    display: none;
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
    right: 0;
    bottom: 0;
    transform: translateX(100%);
}
</style>