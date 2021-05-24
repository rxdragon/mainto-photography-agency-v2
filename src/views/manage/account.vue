<template>
  <div id="account">
    <el-row class="form">
      <el-row class="item">
        <el-col :span="2">
          <span class="tip name">账号: </span>
        </el-col>
        <el-col :span="7">
          <el-input
            size="small"
            :addon-before="`${getUser.config.orgCode}: `"
            placeholder="请填写账号"
            :value="account.username"
            :max-length="16"
            @input="userChange"
          >
            <template slot="prepend">tx:</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="2">
          <span class="tip name">登录密码: </span>
        </el-col>
        <el-col :span="6">
          <el-input
            size="small"
            placeholder="未有特殊密码要求可不用填写"
            :value="account.password"
            :max-length="16"
            show-password
            @input="passChange"
          />
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="2">
          <span class="tip name">账号昵称: </span>
        </el-col>
        <el-col :span="6">
          <el-input size="small" v-model="account.nick" placeholder="请填写昵称" />
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="6" :offset="2">
          <el-button size="small" type="primary" @click="submit">提 交</el-button>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Api from '@/api/index.js'
export default {
  name: 'AddAccount',
  data () {
    return {
      value: '',
      account: {
        id: '',
        username: '',
        nick: '',
        password: ''
      }
    }
  },
  computed: {
    hasQuery () {
      return this.$route.query.id !== undefined
    },
    ...mapGetters([
      'getUser'
    ])
  },
  created () {
    if (this.hasQuery) {
      let username = this.$route.query.username
      if (username && username.includes(':')) {
        username = username.trim().split(':')[1]
      }
      this.account = Object.assign(this.account, this.$route.query, { username })
    }
  },
  methods: {
    userChange (val) {
      const reg = /^[0-9a-zA-Z]*$/g
      if (reg.test(val) || val === '' || val === '-') {
        this.account.username = val
      }
    },
    passChange (val) {
      const reg = /^[0-9a-zA-Z]*$/g
      if (reg.test(val) || val === '' || val === '-') {
        this.account.password = val
      }
    },
    submit () {
      if (!this.account.username || !this.account.nick) {
        return this.$message.error('请填写完整信息')
      }
      this.$emit('loading', true)
      for (const key in this.account) {
        if (!this.account[key]) {
          delete this.account[key]
        }
      }
      if (!this.hasQuery) {
        Api.manage.create(this.account).then(() => {
          this.$message.success('账号创建成功')
          this.routeBack()
        }).catch((e) => {
          this.$message.error(e.data.error_msg)
        }).finally(() => {
          this.$emit('loading', false)
        })
      } else {
        Api.manage.edit(this.account).then(() => {
          this.$message.success('账号修改成功')
          this.routeBack()
        }).catch((e) => {
          this.$message.error(e.data.error_msg)
        }).finally(() => {
          this.$emit('loading', false)
        })
      }
    }
  }
}
</script>
<style lang="less">
@import './styles/account.less';
</style>
