<template>
    <div class="container">
        <header class="gradient">
            <h1>會員資料</h1>
            <button class="edit" @click="reverse()">修改資料</button>
            <button class="confirm" @click="confirm()">確認</button>
            <button class="cancel">取消</button>
        </header>
        <form action="/action_page.php">

            <div class="form__img gradient">
                <label for="EvenImage">上傳活動照片：</label>
                <input type="file" 
                accept="image/*,.pdf" 
                @change="previewImage" 
                id="EventImage" 
                name="EventImage" 
                multiple
                required><br>
                <div class="previewImage" v-if="preview">
                    <img class="image--resp" :src="preview" />
                    <!-- <p>file name: {{ image.name }}</p>
                    <p>size: {{ image.size/1024 }}KB</p> -->
                </div>
            </div>

            <div class="form__text">
                <label for="Email">帳號：</label>
                <input type="email" id="Email" name="Email" v-model="member[0].email" :readonly="!isEdit"><br>
                <label for="Name">名稱：</label>
                <input type="text" id="Name" name="Name" v-model="member[0].name" :readonly="!isEdit"><br>
                <div v-if="!isEdit"><label for="Sex">性別：{{sexToString[member[0].sex].value}}</label></div>
                <div v-else>
                    <label for="Sex">性別：</label>
                    <input type="radio" id="Male" name="Sex" value="M" class="checkBox">男
                    <input type="radio" id="Female" name="Sex" value="F" class="checkBox">女<br>
                </div>
                <label for="Birthday">生日：</label>
                <input type="date" id="Birthday" name="Birthday" v-model="member[0].birth" :readonly="!isEdit"><br>
                <div v-if="!isEdit"><label for="Location">居住城市：{{cityToString[member[0].city].value}}</label></div>
                <div v-else>
                    <label for="Location">居住城市：</label>
                    <select name="Location" id="Location" v-model="member[0].city">
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
                    <label for="EventType">*感興趣的活動：</label>
                    <section v-for="(type, index) in eventType" :key=type.eng>
                        <input type="checkbox" 
                                    :id="'EventType'+(index+1)" 
                                    class="checkBox"
                                    name="EventType" 
                                    :value=type.eng 
                                    v-model="eventCheck" >
                        <label :for="'EventType'+(index+1)">{{type.zh}}</label>
                    </section>
                </div>

                <label for="JobType" class="gradient">工作類型：</label>
                <input type="text" id="JobType" name="JobType" v-model="member[0].jobType" :readonly="!isEdit"><br>
                <label for="JobTitle" class="gradient">工作職稱：</label>
                <input type="text" id="JobTitle" name="JobTitle" v-model="member[0].jobTitle" :readonly="!isEdit"><br>
                <label for="Intro" class="intro">自我介紹：</label><br>
                <textarea name="Intro" id="Intro" style="font-size:1.5em" cols="70" rows="20" v-model="member[0].intro" :readonly="!isEdit"></textarea><br>

                <input type="submit" class="submit" value="完成註冊">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isEdit: false,
            preview: null,
            image: null,
            sexToString: [
                {value: "女" },
                {value: "男"}
            ],
            cityToString:[
                {value: "基隆市"},
                {value: "台北市"},
                {value: "新北市"},
                {value: "桃園市"},
                {value: "新竹市"},
                {value: "新竹縣"},
                {value: "苗栗縣"},
                {value: "台中市"},
                {value: "彰化市"},
                {value: "南投市"},
                {value: "雲林市"},
                {value: "嘉義市"},
                {value: "嘉義縣"},
                {value: "台南市"},
                {value: "高雄市"},
                {value: "屏東市"},
                {value: "台東市"},
                {value: "花蓮市"},
                {value: "宜蘭市"},
                {value: "澎湖市"},
                {value: "金門市"},
                {value: "連江市"},
            ],
            member:[{
                email: "xup6128",
                name: "Ethan",
                sex: "1",
                city: "8",
                birth: "1994-11-28",
                jobType: "工程師",
                jobTitle: "Junior",
                intro: "27歲 男 射手座"
            }],
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
</style>