<template>
<<<<<<< HEAD
  <div id="App">
    <transition name="app-transform" mode="out-in">
      <router-view />
    </transition>
=======
  <div id="app">
    <router-view />
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
  </div>
</template>

<script>
<<<<<<< HEAD
import variables from '@assetsDir/styles/variables.less'

export default {
  name: 'App',
  created () {
    if (this.$isDev) {
      document.body.style.setProperty('--subMenuBg', variables.devSubMenuBg)
      document.body.style.setProperty('--menuBg', variables.devMenuBg)
    }
  }
}
</script>

<style lang="less">
@import "~@assetsDir/styles/variables.less";

html {
  background-color: white;
}

body {
  padding: 0;
  margin: 0;
  overflow: hidden;

  --menuBg: @menuBg;
  --subMenuBg: @subMenuBg;
  --boxShadow: '';
  --navbarMainLeft: 120px;
}

#App {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
=======
export default {
  name: 'App'
}
</script>
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
