<template>
  <div class="login-wrap" v-loading="loading">
    <div class="form-wrap">
      <div class="img-wrap">
        <img :src="logo" alt="logo" />
      </div>
      <p>云端拍摄中心</p>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        class="login-form"
        :rules="rules"
        @submit.native.prevent
      >
        <el-form-item prop="userName">
          <el-input v-model="ruleForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-button type="primary" class="login-button" @click="submitForm">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Api from '@/api/index.js'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      logo: require('@/assets/img/single-logo.png'),
      captchaId: '2049380082',
      ruleForm: {
        username: 'tx:tunxing',
        password: '123'
      },
      rules: {
        username: { required: true, message: '账号不能为空!', trigger: 'blur' },
        password: { required: true, message: '密码不能为空!', trigger: 'blur' }
      },
      form: null,
      loading: false
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
    // 验证表单
    submitForm (ruleForm) {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        const captcha = new window.TencentCaptcha(this.captchaId, (res) => {
          if (res.ret === 0) {
            this.getAuthLogin({
              ticket: res.ticket,
              randStr: res.randstr
            })
          }
        })
        captcha.show()
      })
    },
    getAuthLogin (captcha) {
      const params = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        ...captcha
      }
      this.loading = true
      Api.user.loginAuth(params, {
        headers: { 'X-Expose-Headers': 'X-Stream-Id, x-stream-id' }
      }).then(() => {
        this.$router.replace({ path: '/' })
        Api.user.getInfo().then((res) => {
          this.setUserInfo(res.msg)
        }).catch((e) => {
          this.$message.error(e.data.error_msg)
        })
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
@import './style/login.less';
</style>
