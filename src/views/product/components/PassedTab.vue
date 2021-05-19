<template>
  <div>
    <el-row class="search">
      <el-col :span="10" class="date">
        <span class="tip">选择日期: </span>
        <el-date-picker
          v-model="date"
          size="small"
          type="daterange"
          :picker-options="pickerOptions"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-col>
      <el-col :span="3" style="text-align: right;">
        <el-button size="small" type="primary" @click="searchProduct(1)">查 询</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="dataSource">
      <el-table-column label="产品名称" prop="name" />
      <el-table-column label="审核通过时间" prop="review_pass_at" />
      <el-table-column label="状态">
        <span slot-scope="{ row }">
          <span>
            <el-badge
              is-dot
              :type="row.state === 'enable' ? 'success' : 'danger'"
            />
            {{ stateText[row.state] || '状态异常' }}
          </span>
        </span>
      </el-table-column>
      <el-table-column label="操作">
        <span slot-scope="{ row }">
          <div>
            <span v-if="row.state === 'enable'">
              <a href="javascript:;" style="color: #f5222d; text-decoration: none;" @click="switchState(row)">禁用</a>
              <el-divider direction="vertical" />
            </span>
            <span v-else-if="row.state === 'disable'">
              <a href="javascript:;" style="color: #52c41a; text-decoration: none;" @click="switchState(row)">启用</a>
              <el-divider direction="vertical" />
            </span>
            <a href="javascript:;" style="text-decoration: none;" @click="viewDetail(row)">详情</a>
          </div>
        </span>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        :current-page.sync="page.index"
        :total="page.total"
        @current-change="onPageChange"
        class="pagination"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import moment from 'moment'

export default {
  name: 'PassedTab',
  data () {
    return {
      itemKey: '',
      pickerOptions: {
        disabledDate (current) {
          return current && current > moment().endOf('day')
        }
      },
      dataSource: [],
      stateText: {
        disable: '禁用',
        enable: '启用',
        refuse: '已删除'
      },
      date: ['', ''],
      page: {
        size: 10,
        index: 1,
        total: 0
      },
      loading: false
    }
  },
  computed: {
    searchParams () {
      return {
        state: 'pass',
        name: '',
        reviewPassAtStart: this.date ? this.date[0] : '',
        reviewPassAtEnd: this.date ? this.date[1] : '',
        page: this.page.index,
        pageSize: this.page.size
      }
    }
  },
  created () {
    this.searchProduct()
  },
  methods: {
    disabledDate (current) {
      return current && current > moment().endOf('day')
    },
    viewDetail (record) {
      this.$router.push({
        name: 'productDetail',
        params: { id: record.id }
      })
    },
    switchState (record) {
      this.loading = true
      Api.product.switch({
        id: record.id
      }).catch((e) => {
        this.loading = false
        this.$message.error(e.data.error_msg)
        throw new Error(e.data.error_msg)
      }).then(() => {
        this.loading = false
        this.$message.success('更改状态成功')
        this.searchProduct()
      })
    },
    /**
     * @description 搜索产品
     */
    searchProduct (page) {
      this.loading = true
      this.page.index = page || this.page.index
      Api.product.list(this.searchParams).catch((e) => {
        this.loading = false
        this.$message.error(e.data.error_msg)
      }).then((res) => {
        this.dataSource = res.msg.items
        this.page.total = res.msg.count
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    },
    /**
     * @description 监听页面变化
     */
    onPageChange () {
      this.$nextTick(() => {
        this.searchProduct()
      })
    }
  }
}
</script>
<style lang="less">
.search {
  margin-top: 10px;

  .date {
    white-space: nowrap;

    .tip {
      margin-right: 20px;
      font-size: 14px;
    }
  }
}
</style>
