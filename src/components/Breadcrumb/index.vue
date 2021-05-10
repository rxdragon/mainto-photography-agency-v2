<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
<<<<<<< HEAD
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index === levelList.length - 1"
          class="no-redirect"
        >{{ item.meta.title }}
        </span>
=======
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
<<<<<<< HEAD
import * as pathToRegexp from 'path-to-regexp'
=======
import pathToRegexp from 'path-to-regexp'
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6

export default {
  data () {
    return {
      levelList: null
    }
  },
  watch: {
<<<<<<< HEAD
    $route (route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
=======
    $route () {
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
<<<<<<< HEAD
    /**
     * @description 是否相同地址
     */
    isSamePath (item) {
      const { redirect, path } = item
      const nowPath = this.$route.fullPath
      return nowPath === redirect || nowPath === path
    },
    /**
     * @description 获取裂解列表
     */
    getBreadcrumb () {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    /**
     * @description 获取拼接地址
     */
    pathCompile (path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      const toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    /**
     * @description 链接跳转
     */
    handleLink (item) {
      const { redirect, path } = item
      const nowPath = this.$route.fullPath
      if (nowPath === redirect || nowPath === path) return
=======
    getBreadcrumb () {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile (path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<<<<<<< HEAD
<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
=======
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
