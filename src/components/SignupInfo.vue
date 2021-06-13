<template>
    <div class="container">
        <header><h1>會員資料填寫</h1></header>
        <div class="container__text">
            <form action="">
                <label for="name">名稱：</label>
                <input type="text" id="Name" name="name" autofocus><br>
                <label for="name">性別：</label>
                <input type="radio" id="M" name="Sex" value="M" class="checkBox">男姓
                <input type="radio" id="F" name="Sex" value="F" class="checkBox">女姓<br>
                <label for="name">生日：</label>
                <input type="date" id="Birthday" name="Birthday"><br>
                <label for="EvenAddress">居住城市：</label>
                <select name="Location" id="Location">
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

                <div class="event__wrap">
                    <label for="EventType">感興趣的活動：</label>
                    <section v-for="(type, index) in eventType" :key=type.eng>
                        <input type="checkbox" 
                                    :id="'EventType'+(index+1)" 
                                    class="checkBox"
                                    name="" 
                                    :value=type.eng 
                                    v-model="eventCheck" >
                        <label :for="'EventType'+(index+1)">{{type.zh}}</label>
                    </section>
                </div>

                <label for="">工作：</label>
                <input type="text"><br>
                <label for="">職務：</label>
                <input type="text"><br>
                <label for="" class="intro">自我介紹：</label><br>
                <textarea name="" id="" cols="70" rows="30"></textarea>
            </form>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
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
}
</script>

<style scoped>
.container{
    width: 80%;
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
.intro{
    margin-top: 0;
}
.checkBox{
    height: 1em;
}
</style>