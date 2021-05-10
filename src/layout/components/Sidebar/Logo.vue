<template>
<<<<<<< HEAD
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link key="expand" class="sidebar-logo-link" to="/">
        <div class="sidebar-logo">
          <img class="logo" src="../../../assets/images/logo.png" alt="">
        </div>
=======
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
<<<<<<< HEAD
  data () {
    return {
      title: 'MAINTO'
=======
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: 'Vue Admin Template',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
    }
  }
}
</script>

<<<<<<< HEAD
<style lang="less" scoped>
@import "~@assetsDir/styles/variables.less";

=======
<style lang="scss" scoped>
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
<<<<<<< HEAD
  height: @logoHeight;
  overflow: hidden;
  text-align: center;

  .sidebar-logo-link {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100%;
    height: 100%;

    .sidebar-logo {
      width: 200px;
      vertical-align: middle;
    }

    .logo {
      width: 100%;
    }

    .sidebar-title {
      display: inline-block;
      margin: 0;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-size: 14px;
      font-weight: 600;
      line-height: 50px;
      color: #fff;
      vertical-align: middle;
    }
  }
=======
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
}
</style>
