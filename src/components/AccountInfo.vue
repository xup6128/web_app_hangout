<template>
<div>
    <div class="option__wrap">
        <input @click="changePage(0)" class="option__button option__button--red" type="button" value="會員資料">
        <input @click="changePage(1)" class="option__button option__button--red" type="button" :value="`追蹤人數(${this.followeds.length})`">
        <input @click="changePage(2)" class="option__button option__button--blue" type="button" :value="`粉絲人數(${this.followers.length})`">
        <input @click="changePage(3)" class="option__button option__button--orange" type="button" :value="`★${this.avergaRate}評論(${this.comments.length})`">
    </div>

    <div class="container page--middle">

        <div class="page">
            <header class="gradient">
                <button v-if="!checkMember" v-show="!isFollow" class="edit" @click="follow()">追蹤會員</button>
                <button v-else v-show="!isEdit" class="edit" @click="reverse()">修改資料</button>

                <button class="edit" v-show="isFollow" @click="unfollow()">取消追蹤</button>

                <button v-show="isEdit" class="confirm" @click="confirm()">確認</button>
                <button v-show="isEdit" class="cancel" @click="cancel()">取消</button><br>

                <h1>會員資料</h1>
            </header>
            <form action="/action_page.php">

                <div class="form__img gradient">
                    <div class="previewImage">
                        <img class="image--resp" :src="getCover(member.memberPhoto)" />
                    </div>
                    <!-- <div v-else>
                        <label for="EvenImage">上傳照片：</label>
                        <input type="file"
                        accept="image/*,.pdf" 
                        @change="previewImage($event), getFiles($event)" 
                        id="EventImage" 
                        name="EventImage" ><br>
                    </div> -->
                </div>

                <div class="form__text">
                    <label for="Email">帳號：</label>
                    <input type="email" id="Email" name="Email" v-model="member.account" disabled="true"><br>
                    <label for="Name">名稱：</label>
                    <input type="text" id="Name" name="Name" v-model="member.name" :disabled="!isEdit"><br>
                    <div v-if="!isEdit"><label for="Sex">性別：{{getGender(member.gender)}}</label></div>
                    <div v-else>
                        <label for="Sex">性別：</label>
                        <input type="radio" id="Male" name="Sex" v-model="member.gender" value="2" class="checkBox">男
                        <input type="radio" id="Female" name="Sex" v-model="member.gender" value="1" class="checkBox">女<br>
                    </div>

                    <div>
                        <label for="Birthday">生日：</label>
                        <input type="date" id="Birthday" name="Birthday" v-model="birth" :disabled="!isEdit"><br>
                    </div>

                    <div v-if="!isEdit"><label for="Location">居住城市：{{getCity(member.cityId)}}</label></div>
                    <div v-else>
                        <label for="Location">居住城市：</label>
                        <select name="Location" id="Location" v-model="member.cityId">
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
                    </div>

                    <div class="eventType__wrap">
                        <label for="EventType">感興趣的活動：

                        </label>
                        <span v-if="!isEdit">
                            <span class="interest" v-for=" t in member.types" :key="t">
                                {{getInterest(t)}}
                            </span>
                        </span>
                        <span v-else>
                            <section v-for="(type, index) in eventType" :key=type.eng>
                                <input type="checkbox" 
                                            v-model="member.types"
                                            :id="'EventType'+(index+1)" 
                                            class="checkBox"
                                            name="EventType" 
                                            :value=index>
                                <label :for="'EventType'+(index+1)">{{type.zh}}</label>
                            </section>
                        </span>
                    </div>

                    <label for="JobType" class="gradient">工作類型：</label>
                    <input type="text" id="JobType" name="JobType" v-model="category" :disabled="!isEdit"><br>
                    <label for="JobTitle" class="gradient">工作職稱：</label>
                    <input type="text" id="JobTitle" name="JobTitle" v-model="jobTitle" :disabled="!isEdit"><br>
                    <label for="Intro">自我介紹</label><br>
                    <textarea name="Intro" id="Intro" class="intro"  rows="15" v-model="intro" :disabled="!isEdit"></textarea><br>
                </div>
            </form>
        </div>

        <div class="page offPage">
            <header><h1>追蹤清單</h1></header>
            <div class="member__wrap">
                <router-link v-for=" p in followeds" :key="p.memberId" :to="/AccountInfo/+p.memberId">
                    <div class="member" >
                        <figure class="member__img">
                            <img :src="getCover(p.memberPhoto)" alt="" class="image--resp">
                        </figure>
                        <div class="member__text">
                            <h4>{{p.name}}</h4>
                            <h4>{{getCity(p.cityId)}}、{{getAge(p.birth)}}歲</h4>
                            <h4>{{p.category}}{{p.jobTitle}}</h4>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <div class="page offPage">
            <header><h1>粉絲清單</h1></header>
            <div v-for=" p in followers" :key="p.memberId">
            
            </div>
        </div>

        <div class="page offPage">
            <header><h1>評論清單</h1></header>
        </div>


    </div>
</div>
</template>

<script>
import { apiMemberGet, apiMemberPut, apiFollowMemberPost, apiFollowGet, apiFollowMemberDelete, apiCommentGet} from "../api"

export default {
    inject:['reload'],
    data(){
        return{
            memberId: this.$route.params.memberId,
            pageOn: 0,
            checkMember: null,
            isFollow: null,
            followers:[],
            followeds:[],
            comments:[],
            isEdit: false,
            preview: null,
            image: null,
            member:null,
            category: null,
            jobTitle: null,
            intro: null,
            birth:null,
            files: null,
            avergaRate: 0,
            // birthToDate: this.member.birth.slice(0,10),
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
    mounted(){
        this.checkMember = $cookies.get('MemberId') === this.memberId
        apiMemberGet(this.memberId)
        .then(res=>{
            console.log(res.data)
            this.member = res.data
            this.category = this.isNull(this.member.category)
            this.jobTitle = this.isNull(this.member.jobTitle)
            this.intro = this.isNull(this.member.intro)
            this.birth = this.member.birth.slice(0,10)
        })
        .catch(err=>{
            console.log(err)
        })

        //確認是否有被使用者追蹤
        apiFollowGet($cookies.get('MemberId'))
        .then(res=>{
            this.isFollow = res.data.followeds.includes(Number(this.memberId))
        })
        .catch(err =>{
            console.log(err)
        })

        //獲取追蹤與粉絲資料
        apiFollowGet(this.memberId)
        .then(res => {
            this.followeds = this.getFollowedsApi(res.data.followeds)
            this.followers = this.getFollowersApi(res.data.followers)
        })
        .catch(err =>{
            console.log(err)
        })

        //獲取評論
        apiCommentGet(this.memberId)
        .then(res => {
            console.log(res.data)
            this.comments = res.data

            let avg = 0;
            this.comments.forEach( r =>{
                console.log(r.rate)
                avg += r.rate
            })
            this.avergaRate = (avg/this.comments.length).toFixed(1)
            this.getCommentsApi(res.data)
        })
        .catch(err =>{
            console.log(err)
        })

    },
    methods: {
        async getFollowersApi(arrs){

            const promises = arrs.map(async id => {
                const p = await apiMemberGet(id);
                return p;
            })
            //將promises陣列解析成data陣列
            const promise = await Promise.all(promises)
            const members = promise.map( p =>{
                return p.data
            })

            this.followers = members
        },
        async getFollowedsApi(arrs){

            const promises = arrs.map(async id => {
                const p = await apiMemberGet(id);
                return p;
            })
            //將promises陣列解析成data陣列
            const promise = await Promise.all(promises)
            const members = promise.map( p =>{
                return p.data
            })

            this.followeds = members
        },
        async getCommentsApi(arrs){

            const promises = arrs.map(async member => {
                const p = await apiMemberGet(member.memberId);
                return p;
            })
            //將promises陣列解析成data陣列
            const promise = await Promise.all(promises)
            const members = promise.map( p =>{
                return p.data
            })

            //將API資料依序新增在陣列裡面
            arrs.forEach( (item,index) =>{
                this.$set(item, 'name',  members[index].name)
                this.$set(item, 'memberPhoto',  members[index].memberPhoto)
                this.$set(item, 'memberPhoto',  members[index].memberPhoto)
            })
            console.log(this.comments)
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
        reverse(){
            this.isEdit = true;
        },
        confirm(){
            this.isEdit = false;

            let formData = new FormData();
            // formData.append("Account", this.member.account);
            // formData.append("Password", this.member.password);
            formData.append("Name", this.member.name);
            // formData.append("MemberPhoto", this.files);
            formData.append("Gender", this.member.gender);
            formData.append("Birth", this.birth);
            formData.append("CityId", this.member.cityId);
            formData.append("Category", this.category);
            formData.append("JobTitle", this.jobTitle);
            formData.append("intro", this.intro);
            
            for( let i=0;i<this.member.types.length;i++){
                formData.append("Type", this.member.types[i]);
            }

            for(let value of formData.values()){
                console.log(value)
            }

            apiMemberPut(
                formData,
            )
            .then(res =>{
                console.log(res)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        cancel(){
            this.isEdit = false;
            this.reload();
        },
        getCity(num){
            const cities =["基隆市","台北市","新北市","桃園縣","新竹市","新竹縣","苗栗縣","台中市","彰化縣","南投縣","雲林縣","嘉義市","嘉義縣","台南市","高雄市","屏東縣","台東縣","花蓮縣","宜蘭縣","澎湖縣","金門縣","連江縣"]
            return cities[num-1]
        },
        getGender(gender){
            if(gender == 2){
                return "男"
            }else if(gender == 1){
                return "女"
            }
        },
        getInterest(type){
            // const eventTypes=[
            //     { eng: 'travel', zh: '旅行出遊' },
            //     { eng: 'fitness', zh: '運動健身' },
            //     { eng: 'party', zh: '唱歌派對' },
            //     { eng: 'show', zh: '影音展演' },
            //     { eng: 'game', zh: '遊戲卡牌' },
            //     { eng: 'meal', zh: '美食美酒' },
            //     { eng: 'invest', zh: '商業投資' },
            //     { eng: 'learn', zh: '體驗學習' },
            //     { eng: 'beauty', zh: '美容時尚' },
            //     { eng: 'consult', zh: '命理諮商' },
            //     { eng: 'other', zh: '其他' },
            // ]
            return this.eventType[type].zh
        },
        getAge(birth){
            let birthdays = new Date(birth);
            let d = new Date();
            let age =
            d.getFullYear() -
            birthdays.getFullYear() -
            (d.getMonth() < birthdays.getMonth() ||
            (d.getMonth() == birthdays.getMonth() && d.getDate() < birthdays.getDate())
                ? 1
                : 0);

            return age;
        },
        getFiles(e){
            this.files = e.target.files[0]
        },
        isNull(string){
            if(string ==="null"){
                return "暫無資訊"
            }
            return string
        },
        getCover(url){
            return `http://35.229.140.28/${url}`
        },
        follow(){
            console.log($cookies.get('MemberId'))
            console.log(this.memberId)
            apiFollowMemberPost({
                "protagonistId": $cookies.get('MemberId'),
                "objectId": this.memberId
            })
            .then(res =>{
                console.log(res)
                this.isFollow = true
            })
            .catch(err =>{
                console.log(err)
            })
        },
        unfollow(){
            apiFollowMemberDelete($cookies.get('MemberId'),this.memberId)
            .then(res =>{
                console.log(res)
                this.isFollow = false
            })
            .catch(err =>{
                console.log(err)
            })
        },
        changePage(num){
            const pages = document.querySelectorAll(".page")
            pages[this.pageOn].classList.add("offPage")
            pages[num].classList.remove("offPage")
            this.pageOn = num

        },
    }
}
</script>

<style scoped>
a{
    color: black;
    text-decoration: none;
}
.container{
    width: 40%;
    background-color: #FFFFFF;
    border-radius: 15px;
    padding: 1em 2.5em;
    margin-top: 3em;
    margin-bottom: 3em;
    transform: translateX(-50%);
    transition: all 1s;
}
.option__wrap{
    position: fixed;
    left: 75%;
    top: 20%;
    z-index: 1;
}
.option__button{
    display: block;
    border: 0;
    border-radius: 5px;
    padding: .5em 1em;
    font-size: 1.2em;
    height: 26px;
    cursor: pointer;
    margin-bottom: 1em;
    background-color: #797979;
    color: white;
    transition: all .3s;
    width: 80%;
    text-align: center;
}
.option__button:hover{
    font-size: .9em;
}
header{
    text-align: center;
}
header button{
    float: right;
    margin-left: 1em;
    border-radius: 5px;
    padding: .5em 1em;
    background-color: #FFF;
    border: 1px solid;
    font-size: .9em;
}
header button:hover{
    background-color: #363636;
    color: white;
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
    right: 0;
    /* float: right; */
    width: 250px;
    height: 250px;
    border-radius: 999em;
    overflow: hidden;
    border: 3px solid #E1E1E1;
}
.image--resp{
    width: 100%;
    max-height: 100%;
}
.submit{
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.interest{
    display: inline-block;
    text-align: center;
    padding: .3em;
    margin-right: .5em;
    margin-top: .5em;
    width: 80px;
    border-radius: 20px;
    background-color: #FFD934;
}
.intro{
    border: 1px solid black;
    border-radius: 10px;
    background-color: #FFF;
    width: 100%;
    margin-top: 1em;
    font-size: 1.5em;
}
input:disabled{
    border: none;
    color: black;
    background-color: #FFF;
}
.page--middle{
  margin-left: 50%;  
}
.page--right{
  margin-left: 70%;  
}
.page{
    min-height:70vh;
}
.offPage{
    display: none;
}
.member{
    display: flex;
}
.member__img{
    width: 100px;
    border-radius: 999em;
    overflow: hidden;
    border: 3px solid #E1E1E1;
}
</style>