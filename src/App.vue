<template>
  <div id="app">
    <router-view name="nav" v-if="isRouterAlive"></router-view>

    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  provide(){    
    return {
      reload: this.reload      
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  methods: {
    reload () {
      console.log('reload occure')
      this.isRouterAlive = false;
      this.$nextTick( ()=> { this.isRouterAlive=true } ) ;
    },
  },
}
</script>

<style>
body{
  margin: 0;
  background-color: #F3F3F3;
}
.gradient{
  position: relative;
}
.image--resp{
  width: 100%;
  max-height:100%;
}
textarea{
  width: 100%;
  resize: none;
  font-size: 1.5em;
}
input[type="text"],
input[type="number"],
input[type="date"],
input[type="datetime-local"],
input[type="email"],
input[type="password"],
select{
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  border-bottom: 2px solid gray;
}
input:focus{
  outline: none;
}
[readonly="readonly"] {
  pointer-events: none;
}
*{
  box-sizing: content-box;
}
#app {
  font-family: Arial, Helvetica, "LiHei Pro", "微軟正黑體", MintLiu, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
}
::-webkit-scrollbar {
  display: none;
}
.mostly-customized-scrollbar {
  width: 100%;
  overflow: auto;
  height: 100vh;
}
.mostly-customized-scrollbar::-webkit-scrollbar {
  display: block;
  width: 17px;
  /* height: 15px; */
  background-color: white;
}
.mostly-customized-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E5E5;
  border-radius: 15px;
}
.mostly-customized-scrollbar::-webkit-scrollbar-thumb:hover{
  background: #777777;
}
</style>
