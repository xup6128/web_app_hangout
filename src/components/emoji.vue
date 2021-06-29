<template>
  <div id="exampleInputEmoji">
    <div class="your-input-box">
      <input type="text" v-model="valueInput" />
      <button @click="toogleDialogEmoji">😃</button>
    </div>
    <VEmojiPicker
      v-show="showDialog"
      :style="{ width: '440px', height: '200' }"
      labelSearch="Search"
      lang="pt-BR"
      @select="onSelectEmoji"
    />
  </div>
</template>

<script>
import { VEmojiPicker, emojisDefault, categoriesDefault } from "v-emoji-picker";

export default {
  name: "exampleInputEmoji",
  components: {
    VEmojiPicker
  },
  data: () => ({
    valueInput: "Someting text ",
    showDialog: false
  }),
  mounted() {
    console.log(categoriesDefault);
    console.log("Total emojis:", emojisDefault.length);
  },
  methods: {
    toogleDialogEmoji() {
      console.log("Toogle!");
      this.showDialog = !this.showDialog;
    },
    onSelectEmoji(emoji) {
      this.valueInput += emoji.data;
      // Optional
      // this.toogleDialogEmoji();
    }
  }
};
</script>

<style lang="css" scoped>
/* THIS IS OPTIONAL */
/* @font-face {
  font-family: NotomojiColor;
  font-weight: 400;
  src: url(
      https://cdn.glitch.com/61908de1-dd0a-4359-a54b-6cb6d41bb5fd%2FNotoColorEmoji.ttf?1513108808150
    )format("truetype");
} */

#exampleInputEmoji {
  position: relative;
}

.your-input-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  padding: 8px;
  font-size: 16px;
  margin-right: 2px;
  border-radius: 4px;
  border: 1px solid #848484;
}

button {
  background: #ececec;
  border-radius: 4px;
  padding: 5px;
  font-size: 22px;
  border: 1px solid #848484;
}
</style>