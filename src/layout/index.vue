<template>
<<<<<<< HEAD
  <el-container>
    <!-- 内容 -->
    <el-container class="container-main">
      <!-- 菜单 -->
      <el-aside :class="{hideSidebar: false}" class="app-wrapper">
        <Sidebar class="sidebar-container" />
      </el-aside>
      <!-- 内容 -->
      <el-main class="main-box">
        <UserTab />
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { AppMain, Sidebar, UserTab } from './components'
export default {
  name: 'Layout',
  components: { AppMain, Sidebar, UserTab }
}
</script>

<style lang="less">
@import "~@assetsDir/styles/variables.less";

.el-aside {
  position: relative;
  width: @sideBarWidth !important;
  padding: 0 !important;
  margin-bottom: 0;
  line-height: inherit;
  background-color: #0b213a;
}

.el-main {
  width: calc(~'100vw - @{sideBarWidth}');
  height: 100vh;
  padding: 0 !important;
  background-color: #f0f2f5;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cdcdcd;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-button {
    display: none;
    background: #fff;
  }

  ::-webkit-scrollbar-corner {
    display: none;
  }
}

.el-container .main-box {
  overflow: inherit;

  .web-state {
    position: fixed;
    top: 42px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(~'100% - @{sideBarWidth}');
    height: 36px;
    line-height: 36px;
    color: #fb602d;
    text-align: center;
    background-color: #fdeae4;

    .refush-button {
      padding: 2px;
      margin-left: 10px;
      color: #fb602d;
      background-color: #fdeae4;
      border-color: #fb602d;

      &:hover {
        box-shadow: 4px 4px 2px 0 #d4d4d4;
      }
    }
  }
}

.container-main {
  background-color: #131923;
}

.tap-view {
  height: 34px;
  background-color: red;
}
=======
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    device () {
      return this.$store.state.app.device
    },
    fixedHeader () {
      return this.$store.state.settings.fixedHeader
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
</style>
