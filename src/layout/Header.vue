<template>
  <div id="header">
    <el-row class="info">
      <i
        :class="collapsed ? 'el-icon-s-unfold fold-button' : 'el-icon-s-fold fold-button'"
        @click="triggerCollapsed"
      />
      <section :style="{ float: 'right' }">
        <span>{{ getUser.nick }}</span>
        <el-tag effect="dark" class="organization">{{ getUser.organization.nick }}</el-tag>
        <i class="el-icon-switch-button out-button" @click="showConfirm"/>
      </section>
    </el-row>
    <el-row class="route-tip">
      <el-col :span="18" class="title">
        <h3>{{ title }}</h3>
      </el-col>
      <el-col :span="5" v-if="showButton" class="back-button">
        <el-button
          size="small"
          type="primary"
          @click="routeBack"
          style="margin-top: 23px;"
        >
          返回
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Api from '@/api/index.js'
import * as SessionTool from '@/utils/sessionTool.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      title: '',
      collapsed: false,
      showButton: false
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  watch: {
    $route: function (route) {
      this.title = this.switchText(route.name)
      this.showButton = route.meta.showButton
    }
  },
  methods: {
    switchText (name) {
      let text = ''
      switch (name) {
        case 'uploadPhoto':
          text = '上传拍摄'
          break
        case 'uploadRecord':
          text = '历史记录'
          break
        case 'recordDetail':
          text = '历史详情'
          break
        case 'product':
          text = '产品管理'
          break
        case 'addProduct':
          text = '新增产品'
          break
        case 'productDetail':
          text = '产品详情'
          break
        case 'customs':
          text = '客片中心'
          break
        case 'customDetail':
          text = '客片详情'
          break
        case 'manage':
          text = '子账号管理'
          break
        case 'manageAccount':
          text = '添加子账号'
          break
        default:
          text = '首页'
      }
      return text
    },
    triggerCollapsed () {
      this.collapsed = !this.collapsed
      this.$emit('collapsedEvent', this.collapsed)
    },
    showConfirm () {
      this.$confirm('是否确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        SessionTool.removeSession()
        Api.user.loginOut().then(async (res) => {
          if (res.success) {
            await this.$message({
              type: 'success',
              message: '退出中...',
              duration: 500,
              onClose: () => {
                window.localStorage.clear()
                window.location.reload()
              }
            })
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!',
            duration: 1000
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: 1000
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
#header {
  padding: 0;
  background: #fff;

  .info {
    height: 64px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);

    .fold-button {
      padding: 23px 24px;
      font-size: 20px;
      vertical-align: middle;
    }

    .fold-button:hover {
      color: rgb(64, 158, 255);
      cursor: pointer;
    }

    section {
      padding: 13px;
      font-size: 14px;

      .organization {
        margin: auto 10px;
        color: #fff;
      }

      .out-button {
        margin-right: 10px;
        font-size: 20px;
        vertical-align: middle;
      }

      .out-button:hover {
        color: red;
        cursor: pointer;
      }
    }
  }

  .route-tip {
    height: 64px;

    h3 {
      margin: 23px 0;
    }

    .title {
      height: 100%;
      padding-left: 24px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }

    .back-button {
      text-align: right;
    }
  }
}
</style>
