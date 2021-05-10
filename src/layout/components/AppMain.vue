<template>
<<<<<<< HEAD
  <section
    v-loading.lock="isLoading"
    element-loading-custom-class="main-loading"
    class="app-main"
    :class="{'overhidden':isLoading}"
  >
    <transition name="breadcrumb-box" mode="out-in">
      <div class="header-title" v-show="$route.name !== 'Home'">
        <Breadcrumb />
        <div class="page-title">{{ $route.meta.title }}</div>
      </div>
    </transition>
    <transition :name="transitionName" mode="out-in">
      <keep-alive :include="cachedViews" exclude="" :max="4">
        <router-view :key="key" />
      </keep-alive>
=======
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
    </transition>
  </section>
</template>

<script>
<<<<<<< HEAD
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'AppMain',
  components: { Breadcrumb },
  data () {
    return {
      isLoading: false,
      // 根据组件名字
      cachedViews: ['userManage', 'userDetail', 'orderManagement', 'financeIndex', 'CouponManagement'],
      notCacheViews: ['CouponDetail']
    }
  },
  computed: {
    key () {
      return this.$route.path
    },
    transitionName () {
      return ''
    }
  },
  methods: {
    /**
     * @description 监听页面
     */
    scrollMove (e) {
      const scrollTop = e.target.scrollTop
      if (scrollTop > 0) {
        document.body.style.setProperty('--boxShadow', '0px 2px 4px 0px rgba(0,0,0,0.08)')
      } else {
        document.body.style.setProperty('--boxShadow', '')
      }
=======
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
    }
  }
}
</script>

<<<<<<< HEAD
<style lang="less" scoped>
@import "~@assetsDir/styles/variables.less";

.app-main {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: @minWidth;
  height: @appMainHeight;
  padding: @appMainPadding;
  overflow-x: hidden;
  overflow-y: overlay;
  scroll-behavior: smooth;

  .header-title {
    position: sticky;
    top: 0;
    z-index: 1990;
    width: calc(~'100vw - @{sideBarWidth}');
    height: 98px;
    padding: 12px 32px;
    margin-left: -24px;
    background-color: #fff;

    .page-title {
      margin-top: 12px;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      color: #000;
    }
  }
}

.fixed-header + .app-main {
=======
<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
  padding-top: 50px;
}
</style>

<<<<<<< HEAD
<style lang="less">
@import "~@assetsDir/styles/variables.less";
=======
<style lang="scss">
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
<<<<<<< HEAD

.overhidden {
  overflow: hidden !important;
}

.main-loading {
  position: fixed !important;
  top: 78px !important;
  left: @sideBarWidth !important;
  width: calc(~'100vw - @{sideBarWidth}');
}
=======
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
</style>
