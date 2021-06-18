<template>
  <div id="app">
    <router-view name="nav" v-if="isRouterAlive"></router-view>

    <router-view/>
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
