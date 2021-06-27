<template>
  <div ref="editable">
    <a style="display:block;color:blue" @click="click">{{value}}</a>
    <div v-if="isPopup" class="vue-popUpSmall" :style="popPosition">
      <slot/>
      <slot name="footer">
        <div class="text-center">

          <div class="button">
            <input type="button" value="submit" class="btn_refresh refresh_roll tool_goal_submit" @click="$emit('submit')"/>
          </div>

          <div class="button">
            <input type="button" value="Cancel" class="btn_refresh refresh_roll" @click="cancel()" />
          </div>

        </div>
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'editable',
  props: {
    value: {
      type: [Number, String]
    },
    position: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      isPopup: false
    }
  },
  computed: {
    popPosition() {
      return `margin-left:${this.position}`
    }
  },
  methods: {
    close() {
      this.isPopup = false
    },
    click() {
      this.$emit('click')
      this.isPopup = !this.isPopup
    },
    cancel() {
      this.isPopup = false
    },
    documentClick(e) {
      let el = this.$refs.editable
      // 下面最主要目的是為了比對如果el和e.target取得的dom有不相同，或不包含的話，就把視窗關閉起來
      if (el !== e.target && !el.contains(e.target)) {
        this.isPopup = false
      }
    }
  },
  mounted() {
    //監聽dom的click事件
    document.addEventListener('click', this.documentClick)
  },
  destroyed() {
    //銷毀元件的時候，記得要remove以防memory leak
    document.removeEventListener('click', this.documentClick)
  }
}
</script>

<style lang="scss" scoped>
.vue-popUpSmall {
  position: absolute;
  background-color: #e6e6e6;
  border: 4px solid #b9b9b9;
  color: #000000;
  padding: 5px;
  max-height: 300px;
  z-index: 1;
}
td {
  border: 0;
  padding: 2px;
}
.button {
  display: inline;
  margin: 2px;
}
</style>