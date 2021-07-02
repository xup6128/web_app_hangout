<template>
  <div>

    <div class="message__member">
      <figure class="member__img">
        <img :src="getImg(participanters.memberPhoto[0])" alt="" class="image--resp">
      </figure>
      <h4>{{participanters.name}}</h4>
      <div class="star_box gradient">

        <div class='star_line'>
          <span
            class="star"
            v-for="(star, key) in total"
            @click="changeValue(star)"
            :style="starStyle"
            :key="key"
          >☆</span>
        </div>

        <div class="star_line star_pointer">
          <span
            class="star"
            :class="{'active': isActive}"
            v-for="(star, key) in score"
            :style="starStyle"
            :key="key"
          >★</span>
        </div>

      </div>
    </div>

    <textarea name="" id="" rows="5" v-model="input"></textarea>
    <input type="button" class="button--transparent" @click="commentPost()" value="送出">

  </div>
</template>

<script>
  import {apiCommentPost, apiparticipantPutComment} from "../api"

  export default {
      data(){
          return{
              total:5,
              isActive: true,
              score:0,
              size: 35,
              input:""
          }
      },
      props:{
        participanters: {
          type: Object
        }
      },
      methods:{
        getImg(url){
          return `http://35.229.140.28/${url}`
        },
        changeValue (star) {
          this.score = star
        },
        commentPost ( ) {

          console.log(this.participanters)

          if(!this.score){
            alert("請記得評分，最少為一顆星")
            return
          }
          if(!this.input){
            alert("請記得給夥伴一點評論")
            return
          }

          apiCommentPost({
              "objectId": this.participanters.participantId,
              "memberId": $cookies.get("MemberId"),
              "rate": this.score,
              "commentContent": this.input
          })
          .then(res =>{
            console.log(res)
          })
          .catch(err =>{
            console.log(err)
          })

          apiparticipantPutComment(this.participanters)
          .then(res =>{
            console.log(res)
          })
          .catch(err =>{
            console.log(err)
          })

        },
      },
      computed:{
          starStyle () {
              //starStyle是計算星星的樣式
              return {
                  width: this.size + 'px',
                  height: this.size + 'px',
                  fontSize: this.size + 'px'
              }
          },
      }
  }
</script>

<style scoped>
.message__member{
  display: flex;
  align-items: center;
}
.gradient{
  position: relative;
}
.participanter{
  text-align: left;
  margin-top: 2px;
  border-radius: 5px;
  border-bottom: 4px solid #979797;
  padding: .3em;
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
.star_line{
  color: rgba(0, 0, 0, 0.26);
}
.star_box{
  margin-left: auto;
}
.star_pointer{
  position: absolute;
  top: 0;
  /* left: 0; */
  color: rgba(255, 255, 0, 0.548);
}
textarea{
  margin-top: .3em;
}
.button--transparent{
  margin-left: 100%;
  transform: translateX(-100%);
  border-radius: 5px;
  padding: .5em 1em;
  background-color: transparent;
  border: 1px solid;
  font-size: .9em;
  cursor: pointer;
}
.button--transparent:hover{
    background-color: #363636;
    color: white;
}
</style>