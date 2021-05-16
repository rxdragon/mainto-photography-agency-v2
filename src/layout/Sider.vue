<template>
  <el-aside :class="collapsed ? 'hide-sider' : 'sider'">
    <el-scrollbar>
      <p class="wrap">
        <img v-if="!collapsed" :src="logo">
        <img v-else class="single-photo" :src="singleLogo">
      </p>
      <el-menu
        router
        :collapse="collapsed"
        default-active="2"
        background-color="#001529"
        text-color="rgba(255, 255, 255, 0.65)"
        active-text-color="#409EFF"
      >
        <el-submenu index="uploadPhoto">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>照片上传</span>
          </template>
          <el-menu-item index="uploadPhoto">上传拍摄</el-menu-item>
          <el-menu-item index="uploadRecord">上传历史记录</el-menu-item>
        </el-submenu>
        <el-menu-item v-if="getUser.level === 'master'" index="product">
          <i class="el-icon-menu"></i>
          <span slot="title">产品管理</span>
        </el-menu-item>
        <el-menu-item index="customs">
          <i class="el-icon-document"></i>
          <span slot="title">客片中心</span>
        </el-menu-item>
        <el-submenu v-if="getUser.level === 'master'" index="manage">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>管理中心</span>
          </template>
          <el-menu-item index="manage">子账号管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Sider',
  props: {
    collapsed: Boolean
  },
  data () {
    return {
      logo: require('@/assets/img/logo.png'),
      singleLogo: require('@/assets/img/single-logo.png')
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  }
}
</script>

<style lang="less" scoped>
.el-aside {
  background-color: #001529;
}

.el-menu {
  border: none !important;
}

.hide-sider {
  width: 80px !important;

  .el-scrollbar {
    width: 80px;
    height: 100%;
  }

  .el-menu {
    padding-left: 5px;
  }
}

.sider {
  width: 256px !important;
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
  height: 23px;
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
