<template>
  <div id="app">
    <el-container v-if="getUser.id">
      <Sider :collapsed="collapsed"/>
      <el-container>
        <el-header height="128px">
          <Header @collapsedEvent="collapsedHandle"/>
        </el-header>
        <el-main>
          <router-view @loading="sendLoding" />
        </el-main>
      </el-container>
    </el-container>
    <Login v-else/>
  </div>
</template>

<script>
import Header from '@/layout/Header.vue'
import Sider from '@/layout/Sider.vue'
import { mapActions, mapGetters } from 'vuex'
import Login from '@/views/login/login.vue'
export default {
  name: 'app',
  components: { Header, Sider, Login },
  data () {
    return {
      loading: false,
      collapsed: false
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  async created () {
    if (this.getUser.id) {
      await this.initUpyun().then().catch((e) => {
        this.$message.error(e.data.error_msg)
      })
    }
  },
  methods: {
    ...mapActions(['initUpyun', 'initHost']),
    sendLoding (state) {
      this.loading = state
    },
    collapsedHandle (type) {
      this.collapsed = type
    }
  }
}
</script>

<style lang="less">
html {
  background-color: #f0f2f5;
}

body {
  padding: 0;
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.el-container {
  height: 100%;

  .el-header {
    padding: 0;
    margin: 0;
  }

  .el-main {
    min-width: 1080px;
    padding: 0;
    background-color: rgb(247, 247, 247);
  }
}
</style>
