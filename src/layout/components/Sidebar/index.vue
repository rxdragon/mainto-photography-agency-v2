<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <p class="wrap">
          <img v-if="!isCollapse" class="full-logo" src="../../../assets/img/logo.png" alt="logo" :style="{width: '100%'}">
          <img v-else class="half-logo" src="../../../assets/img/single-logo.png" alt="logo">
        </p>
        <SidebarItem v-for="route in permission_routes" :key="route.name" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  padding: 20px 40px;

  img {
    width: 47px;
    height: 28px;
  }

  .full-logo {
    width: 100%;
  }

  .half-logo {
    position: absolute;
    top: 58%;
    left: 34%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
