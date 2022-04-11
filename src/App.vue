<template>
  <soduko-game/>
</template>

<script>
import SodukoGame from './components/SodukoGame.vue'

export default {
  name: 'App',
  components: {
    SodukoGame
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  box-sizing: border-box;
}
</style>
