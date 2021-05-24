<template>
  <div id="manage">
    <el-button
      size="small"
      class="add-btn"
      type="primary"
      @click="routeView('/manageAccount')"
    >
      添加子账号
    </el-button>
    <el-row class="table">
      <el-table v-loading="loading" :data="dataSource">
        <el-table-column
          v-for="(item, index) in colInfo"
          :key="index"
          :align="item.align"
          :header-align="item.align"
          :label="item.label"
          :min-width="item.width"
          :prop="item.prop"
        />
        <el-table-column label="状态" min-width="40%">
          <span slot-scope="{ row }">
            {{ stateText[row.state] }}
          </span>
        </el-table-column>
        <el-table-column label="操作" min-width="40%">
          <span slot-scope="{ row }">
            <div>
              <div v-if="row.state === 'disabled'" class="button-group">
                <a href="javascript:;" style="color: #52c41a; text-decoration: none;" @click="enableSubuser(row)">启 用</a>
                <el-divider direction="vertical" />
              </div>
              <div v-else-if="row.state === 'enabled'" class="button-group">
                <a href="javascript:;" style="color: #f5222d; text-decoration: none;" @click="disableSubuser(row)">禁 用
                </a>
                <el-divider direction="vertical" />
              </div>
              <a
                href="javascript:;"
                class="edit"
                style="text-decoration: none;"
                @click="reviewDetail(row)"
              >编 辑
              </a>
            </div>
          </span>
        </el-table-column>
      </el-table>
      <div class="page-box">
        <el-pagination
          :current-page.sync="page.index"
          :total="page.total"
          @current-change="pageChange"
          class="pagination"
          layout="prev, pager, next"
        />
      </div>
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
      colInfo: [{
        label: '账号',
        prop: 'username',
        width: '40%',
        align: 'left'
      }, {
        label: '摄影师姓名',
        prop: 'nick',
        width: '40%',
        align: 'left'
      }, {
        label: '创建时间',
        prop: 'created_at',
        width: '70%',
        align: 'left'
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
        this.$message.success('账号禁用成功')
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
        this.$message.success('账号启用成功')
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
@import './styles/manage.less';
</style>
