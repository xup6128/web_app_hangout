<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
body{
  margin: 0;
}
*{
  box-sizing: content-box;
}
#app {
  font-family: Arial, Helvetica, "LiHei Pro", "微軟正黑體", MintLiu, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
}
</style>
