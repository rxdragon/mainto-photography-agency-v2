<template>
  <div id="product">
    <el-button class="add-btn" type="primary" @click="routeView('/addProduct')">新增产品</el-button>
    <el-row class="tab">
      <el-tabs default-active-key="1" :animated="{'tabPane': false}">
        <el-tab-pane key="1" label="审核通过">
          <PassedTab class="content" />
        </el-tab-pane>
        <el-tab-pane key="2" label="待审核" force-render>
          <NotPassTab class="content" />
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
import PassedTab from './components/PassedTab'
import NotPassTab from './components/NotPassTab'
export default {
  components: {
    PassedTab,
    NotPassTab
  }
}
</script>
<style lang="less">
@import './styles/index.less';
</style>
