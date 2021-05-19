<template>
  <div id="manage">
    <el-button class="add-btn" type="primary" @click="routeView('/manageAccount')">添加子账号</el-button>
    <el-row class="table">
      <el-table
        :row-key="bindKey"
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
      >
        <span slot="state" slot-scope="record">
          {{ stateText[record.state] }}
        </span>
        <span slot="action" slot-scope="record">
          <div>
            <div v-if="record.state === 'disabled'" class="button-group">
              <a href="javascript:;" style="color: #52c41a;" @click="enableSubuser(record)">启 用</a>
              <el-divider direction="vertical" />
            </div>
            <div v-else-if="record.state === 'enabled'" class="button-group">
              <a
                href="javascript:;"
                style="color: #f5222d;"
                ghost
                @click="disableSubuser(record)"
              >禁 用
              </a>
              <el-divider direction="vertical" />
            </div>
            <a href="javascript:;" class="edit" @click="reviewDetail(record)">编 辑</a>
          </div>
        </span>
      </el-table>
      <el-pagination
        v-model="page.index"
        class="pagination"
        :total="page.total"
        @change="pageChange"
      />
    </el-row>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'Manage',
  data () {
    return {
      dataSource: [],
      stateText: {
        enabled: '启用',
        disabled: '禁用'
      },
      loading: false,
      columns: [{
        title: '账号',
        dataIndex: 'username',
        width: 300,
        align: 'left'
      }, {
        title: '摄影师姓名',
        dataIndex: 'nick',
        width: 300,
        align: 'left'
      }, {
        title: '创建时间',
        dataIndex: 'created_at',
        width: 200,
        align: 'left'
      }, {
        title: '状态',
        scopedSlots: { customRender: 'state' },
        width: 200,
        align: 'left'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        width: 200,
        align: 'right'
      }],
      page: {
        size: 10,
        index: 1,
        state: '',
        total: 0
      }
    }
  },
  created () {
    this.searchSubuser()
  },
  methods: {
    bindKey (record, index) {
      return index
    },
    reviewDetail (record) {
      this.$router.push({
        name: 'manageAccount',
        query: {
          id: record.id,
          username: record.username,
          nick: record.nick
        }
      })
    },
    /**
     * @description 搜索账号
     */
    searchSubuser () {
      this.loading = true
      const req = {
        page: this.page.index,
        pageSize: this.page.size
      }
      if (this.page.state) {
        req.state = this.page.state
      }
      Api.manage.list(req).then((res) => {
        this.dataSource = res.msg.items
        this.page.total = res.msg.total
      }).finally(() => {
        this.loading = false
      })
    },
    disableSubuser (record) {
      this.loading = true
      Api.manage.disable({
        id: record.id
      }).then(() => {
        this.searchSubuser()
        this.$message.success('账号禁用成功', 2)
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    },
    enableSubuser (record) {
      this.loading = true
      Api.manage.enable({
        id: record.id
      }).then(() => {
        this.searchSubuser()
        this.$message.success('账号启用成功', 2)
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    },
    /**
     * @description 监听页面变化
     */
    pageChange () {
      this.$nextTick(() => {
        this.searchSubuser()
      })
    }
  }
}
</script>
<style lang="less">
@import './styles/index.less';
</style>
