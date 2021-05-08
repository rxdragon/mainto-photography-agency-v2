<template>
  <div
    v-loading="loading"
    class="login-container"
    element-loading-text="登录中···"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <div class="login-logo">
          <img src="../../assets/img/single-logo.png" alt="logo">
        </div>
        <h3 class="title">
          云端拍摄中心
        </h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          clearable
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          clearable
          show-password
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="validForm"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="validForm"
      >Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: tx:tunxing</span>
        <span> password: 123</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import Api from '@/api/index.js'
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能少于3位数'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'tx:tunxing',
        password: '123'
      },
      captchaId: '2049380082',
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    validForm (e) {
      e.preventDefault()
      const captcha = new window.TencentCaptcha(this.captchaId, res => {
        if (res.ret === 0) {
          this.handleLogin({
            ticket: res.ticket,
            randStr: res.randstr
          })
        }
      })
      captcha.show()
    },

    handleLogin (captcha) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            ...captcha
          }
          Api.user.loginAuth(params, {
            headers: { 'X-Expose-Headers': 'X-Stream-Id, x-stream-id' }
          }).then(() => {
            console.log(111)
            this.$router.push({ path: this.redirect || '/' })
            console.log(222)
            Api.user.getInfo().then((res) => {
              this.$store.dispatch('user/setUserInfo', res.msg)
            }).catch((e) => {
              this.$message.error(e.data.error_msg)
            })
          }).catch((e) => {
            this.$message.error(e.data.error_msg)
          }).finally(() => {
            this.loading = false
          })
          // this.$store
          //   .dispatch('user/login', this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: this.redirect || '/' })
          //     this.loading = false
          //   })
          //   .catch(() => {
          //     this.loading = false
          //   })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #82aee4;
$light_gray: rgb(20, 15, 15);

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 190px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: rgb(0, 0, 0);
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .login-logo {
      margin: 0px auto 10px auto;
      width: 100px;
      display: flex;
      img {
        width: 100%;
      }
    }

    .title {
      font-size: 26px;
      color: black;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
