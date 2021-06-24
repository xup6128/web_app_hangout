<template>
    <div class="container">
        <header><h1>會員資料填寫</h1></header>
        <form action="/action_page.php">

            <div class="form__img gradient">
                <label for="EvenImage">*上傳個人照片：</label>
                <input type="file" 
                accept="image/*,.pdf" 
                @change="previewImage($event), getFiles($event)"
                id="EventImage" 
                name="EventImage" 
                required><br>
                <div class="previewImage" v-if="preview">
                    <img class="image--resp" :src="preview" />
                    <!-- <p>file name: {{ image.name }}</p>
                    <p>size: {{ image.size/1024 }}KB</p> -->
                </div>
            </div>

            <div class="form__text">
                <label for="Name">*名稱：</label>
                <input type="text" v-model="name" id="Name" name="Name" required autofocus><br>
                <label for="Sex">*性別：</label>
                <input type="radio" v-model="gender" id="Male" name="Sex" value="2" class="checkBox">男姓
                <input type="radio" v-model="gender" id="Female" name="Sex" value="1" class="checkBox">女姓<br>
                <label for="Birthday">*生日：</label>
                <input type="date" v-model="birth" id="Birthday" name="Birthday" required><br>
                <label for="Location">*居住城市：</label>
                <select v-model="city" name="Location" id="Location" required>
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
                </select><br>

                <div class="eventType__wrap">
                    <label for="EventType">*感興趣的活動：</label>
                    <section v-for="(type, index) in eventType" :key=type.eng>
                        <input type="checkbox" 
                                    :id="'EventType'+(index+1)" 
                                    class="checkBox"
                                    name="EventType" 
                                    :value=index 
                                    v-model="eventCheck" >
                        <label :for="'EventType'+(index+1)">{{type.zh}}</label>
                    </section>
                </div>

                <label for="JobType" class="gradient">工作類型：</label>
                <input type="text" v-model="category" id="JobType" name="JobType" placeholder="(選填)"><br>
                <label for="JobTitle" class="gradient">工作職稱：</label>
                <input type="text" v-model="jobtitle" id="JobTitle" name="JobTitle" placeholder="(選填)"><br>
                <label for="Intro" class="intro">*自我介紹：</label><br>
                <textarea name="Intro" v-model="intro" id="Intro" style="font-size:1.5em" cols="70" rows="20" placeholder="幫助大家更快速了解你自己" required></textarea><br>

                <!-- <input type="submit" class="submit" value="完成註冊" @click="Signup()"> -->
                <button @click="signup()" type="button" class="nextStep">註冊</button>
            </div>
        </form>
    </div>
</template>

<script>
import { apiMemberSignUp } from "../api"

export default {
    data(){
        return{
            email: this.$route.params.email,
            password: this.$route.params.password,
            files: null,
            preview: null,
            name: null,
            gender: null,
            birth: null,
            city: null,
            eventCheck: [],
            category: null,
            jobtitle: null,
            intro: null,
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
    methods: {
        previewImage(event) { 
            let input = event.target;
            if (input.files) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result;
                }
                this.image=input.files[0];
                //Test
                // this.files=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        getFiles(e){
            this.files = e.target.files[0]
        },
        signup(){

            let formData = new FormData();
            formData.append("Account", this.email);
            formData.append("Password", this.password);
            formData.append("Name", this.name);
            formData.append("MemberPhoto", this.files);
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
                console.log(res,data)
                console.log(1)
                this.$router.push({path: '/Login'})
            })
            .catch(err =>{
                console.log(err)
                console.log(2)
                this.$router.push({path: '/Login'})
            })
        }
    }
}
</script>

<style scoped>
.container{
    width: 60%;
    padding: 0 1.5em;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid black;
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
#EventImage{
    height: max-content;
    margin-top: auto;
}
.gradient{
    position: relative;
}
.previewImage{
    position: absolute;
    left: 50%;
    /* float: right; */
    width: 250px;
    height: 250px;
}
.image--resp{
    width: 100%;
    height: 100%;
}
.submit{
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.nextStep{
  color: white;
  background-color: #ED1C40;
  font-size: 1.5em;
  width: 100%;
  border: 0;
  padding: .4em 0;
  margin-top: .67em;
}
.nextStep:hover{
  background-color: #d81b3b;
  cursor: pointer;
}
</style>