<template>
<<<<<<< HEAD
  <div>
    <logo @click.native="activeExperiment" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :class="$isDev ? 'menuColor' : ''"
        :background-color="$isDev ? variables.devMenuBg : variables.menuBg"
=======
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
<<<<<<< HEAD
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
=======
        <p class="wrap">
          <img v-if="!isCollapse" class="full-logo" src="../../../assets/img/logo.png" alt="logo" :style="{width: '100%'}">
          <img v-else class="half-logo" src="../../../assets/img/single-logo.png" alt="logo">
        </p>
        <SidebarItem v-for="route in permission_routes" :key="route.name" :item="route" :base-path="route.path" />
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
<<<<<<< HEAD
import SidebarItem from './SidebarItem'
import variables from '@assetsDir/styles/variables.less'
import Logo from './Logo'

export default {
  components: { SidebarItem, Logo },
  data () {
    return {
      experimentCounts: 0,
      expireTime: 0
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'personage_routers']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
=======
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
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
<<<<<<< HEAD
    variables () {
      return variables
    }
  },
  methods: {
    activeExperiment () {
      const time = 4 * 1000
      if (this.experimentCounts === 0) {
        this.expireTime = new Date().getTime() + time
      }
      this.experimentCounts++
      if (this.experimentCounts === 7) {
        const nowTime = new Date().getTime()
        if (nowTime < this.expireTime) {
          const hasExperiment = this.permission_routes.find(item => item.path.includes('experiment-view'))
          if (hasExperiment) return
          this.$store.commit('permission/SET_ROUTES', [...this.personage_routers])
          this.experimentCounts = 0
          this.expireTime = 0
        } else {
          this.experimentCounts = 0
          this.expireTime = 0
        }
      }
=======
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
    }
  }
}
</script>
<<<<<<< HEAD
=======

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
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
