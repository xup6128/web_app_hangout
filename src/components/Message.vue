<template>
    <div class="message">

        <div class="message__member">
            <figure class="member__img">
                <img :src="getImg(m.memberPhoto)" alt="" class="image--resp">
            </figure>
            <h4>{{m.name}}：</h4>
            <div v-if="m.memberId == selfId" class="message__button">
                <input type="button" v-show="!isEdit" class="button--transparent__small" @click="editing()" value="修改">
                <input type="button" v-show="isEdit" class="button--transparent__small"  @click="cancel()"  value="取消">
                <input type="button" v-show="isEdit" class="button--transparent__small" @click="editMessage()"  value="確認">
                <input type="button" v-show="!isEdit" class="button--transparent__small" @click="delMessage()" value="刪除">
            </div>
        </div>

        <div class="message__text">
            <textarea name="" id="m.messageId" rows="3" :disabled="!isEdit" class="message__input" v-model="m.messageContent" ></textarea>
        </div>

    </div>
</template>

<script>
import {apiMessagePut, apiMessageDel } from "../api"


export default {
    props:{
        m:{
            type: Object
        }
    },
    data(){
        return{
            isEdit:false,
            selfId: $cookies.get('MemberId'),
            oldText: null,
        }
    },
    methods:{
        getImg(url){
            return `http://35.229.140.28/${url}`
        },
        editing(){
            this.isEdit = true
            this.oldText = this.m.messageContent
        },
        cancel(){
            this.isEdit = false
            this.m.messageContent = this.oldText
        },
        editMessage(){
            apiMessagePut(this.m.messageId, {
                "messageContent": this.m.messageContent
            })
            .then(res=>{
                console.log(res)
                this.isEdit = false
            })
            .catch(err =>{
                console.log(err)
            })
        },
        delMessage(){

            apiMessageDel(this.m.messageId)
            .then(res=>{
                console.log(res)
                this.$emit('update', this.m.messageId)
            })
            .catch(err =>{
                console.log(err)
            })
        },
    },

}
</script>

<style>
.message__member{
    display: flex;
    align-items: center;
}
.message__button{
    display: inline-block;
    margin-left: auto;
}
.member__img{
    width: 40px;
    height: 40px;
    border: 1px solid #cfcfcf;
    border-radius: 999em;
    overflow: hidden;
    margin-left: 0;
    margin-right: .5em;
}
.image--resp{
    width: 100%;
    height: auto;
}
.message__text{
    margin-top: .5em;
}
.message__input{
    width: 100%;
    font-size: 1.5em;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    background-color: transparent;
}
.button--transparent__small{
    border-radius: 999px;
    background-color: transparent;
    border: 1px solid;
    font-size: .9em;
    cursor: pointer;
}
.button--transparent__small:hover{
    background-color: #363636;
    color: white;
}
</style>