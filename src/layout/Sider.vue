<template>
  <el-asider :class="true ? 'hide-sider' : 'sider'">
    <el-scrollbar>
      <p class="wrap">
        <img v-if="!true" :src="logo">
        <img v-else class="single-photo" :src="singleLogo">
      </p>
      <el-menu
        :collapse="true"
        default-active="2"
        background-color="#001529"
        text-color="rgba(255, 255, 255, 0.65)"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-asider>
</template>

<script>
import { mapGetters } from 'vuex'
const RouteConfig = [{
  path: ['manage', 'manageAccount'],
  selectedKeys: ['account'],
  openKeys: ['manage']
}, {
  path: ['workRecord', 'recordDetail'],
  selectedKeys: ['record'],
  openKeys: ['work']
}, {
  path: ['work'],
  selectedKeys: ['upload'],
  openKeys: ['work']
}, {
  path: ['product', 'addProduct', 'productDetail'],
  selectedKeys: ['product'],
  openKeys: []
}, {
  path: ['customs', 'customDetail'],
  selectedKeys: ['customs'],
  openKeys: []
}]
export default {
  name: 'Sider',
  props: {
    collapsed: Boolean
  },
  data () {
    return {
      logo: require('@/assets/img/logo.png'),
      singleLogo: require('@/assets/img/single-logo.png'),
      selectedKeys: [],
      openKeys: []
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  watch: {
    $route: function (route) {
      this.checkRoute(route.name)
    }
  },
  methods: {
    checkRoute (path) {
      RouteConfig.map(item => {
        if (item.path.indexOf(path) > -1) {
          this.openKeys = item.openKeys
          this.selectedKeys = item.selectedKeys
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
el-asider {
  background-color: #001529;
}

.el-menu {
  border: none !important;
}

.hide-sider {
  width: 80px;

  .el-scrollbar {
    width: 80px;
    height: 100%;
  }
}

.sider {
  height: 100%;

  .el-scrollbar {
    width: 256px;
    height: 100%;
    overflow: hidden;
    background-color: #001529;

    .el-menu {
      width: 100% !important;
      height: 100%;
      border: none;
    }
  }
}

.wrap {
  position: relative;
  height: 44px;
  padding: 20px 40px;
  margin: 0;

  img {
    width: 100%;
    height: 28px;
  }

  .single-photo {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 47px;
    height: 28px;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
