<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <div class="img-wrap">
        <img :src="logo">
      </div>
      <p>云端拍摄中心</p>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            ref="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            name="password"
            show-password
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="validForm"
          />
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px;"
          v-text="islogin"
          @click.native.prevent="validForm"
        />
      </el-form>
    </div>
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
        callback()
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('The password can not be less than 3 digits'))
      } else {
        callback()
      }
    }
    return {
      islogin: '登录',
      logo: require('@/assets/images/single-logo.png'),
      captchaId: '2049380082',
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
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
      this.$refs.loginForm.validate(valid => {
        if (!valid) return
        const captcha = new window.TencentCaptcha(this.captchaId, (res) => {
          if (res.ret === 0) {
            this.handleLogin({
              ticket: res.ticket,
              randStr: res.randstr
            })
          }
        })
        captcha.show()
      })
    },

    handleLogin (captcha) {
      const params = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        ...captcha
      }
      this.loading = true
      this.islogin = '登录中···'
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
        this.islogin = '登录'
        this.loading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
html,
body,
.login-wrap {
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.login-wrap {
  position: relative;
  text-align: center;

  .form-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 360px;
    text-align: center;
    border: 1px solid #ececec;
    border-radius: 5px;
    transform: translate(-50%, -50%);

    .img-wrap {
      display: inline-block;
      width: 60px;
      margin: 30px 0 10px 0;

      img {
        width: 100%;
      }
    }

    p {
      margin: 0;
    }

    .login-form {
      padding: 20px 18px;
      text-align: left;
    }
  }
}
</style>
