<template>
  <div id="uploadRecord">
    <section class="content">
      <el-row  class="search">
        <div class="search-item" >
          <span class="tip">选择日期: </span>
          <el-date-picker
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            v-model="search.date"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="search-item" >
          <span class="tip">订单标题: </span>
          <el-input v-model="search.title" placeholder="请输入订单标题" style="width: 75%;" />
        </div>
        <div class="search-item" >
          <span class="tip">顾客姓名: </span>
          <el-input v-model="search.customerName" placeholder="请输入顾客姓名" style="width: 75%;" />
        </div>
        <div class="search-item"  style="text-align: right;">
          <el-button type="primary" @click="searchOrder(1)">查 询</el-button>
        </div>
      </el-row>
      <div class="table">
        <template>
          <el-table :data="data" :row-key="bindKey" :loading="loading">
            <el-table-column label="订单标题" prop="title" column-key="title"/>
            <el-table-column label="订单号" prop="order_num" column-key="order_num"/>
            <el-table-column label="顾客姓名" prop="clientName" column-key="clientName"/>
            <el-table-column label="上传时间" prop="created_at" column-key="created_at"/>
            <el-table-column label="流水号" prop="stream_nums" column-key="stream_nums">
              <span slot="stream_nums" slot-scope="record">
                <p v-for="(item, index) in record.stream_nums" :key="index">
                  {{ `${item.stream_num} (${transText[item.state] || '状态未知'})` }}
                </p>
              </span>
            </el-table-column>
            <el-table-column label="操作" prop="action" column-key="action">
              <span slot="action" slot-scope="record">
                <span v-if="hasRetouchStream(record.stream_nums)" class="cancel">
                  <a href="javascript:;" @click="cancelOrder(record)">撤回</a>
                  <el-divider type="vertical" />
                </span>
                <a href="javascript:;" @click="viewsDetail(record)">详情</a>
              </span>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <el-pagination
        :current-page.sync="search.page.index"
        class="pagination"
        :total="search.page.total"
        @change="pageChange"
      />
    </section>
  </div>
</template>

<script>
import Api from '@/api/index.js'
import moment from 'moment'
export default {
  name: 'UploadRecord',
  data () {
    return {
      data: [],
      transText: {
        wait_retouch: '等待修片',
        finish: '云端修图完成',
        retouching: '修片中',
        wait_review: ' 审核中',
        reviewing: '等待审核',
        hanging: '挂起中',
        review_return_retouch: '审核退回修片中'
      },
      loading: true,
      search: {
        date: [],
        title: '',
        customerName: '',
        page: {
          size: 10,
          index: 1,
          total: 0
        }
      },
      pickerOptions: {
        disabledDate (current) {
          return current && current > moment().endOf('day')
        }
      }
    }
  },
  computed: {
    searchParams () {
      return {
        type: 'person',
        createdAtStart: this.search.date[0] || '',
        createdAtEnd: this.search.date[1] || '',
        title: this.search.title,
        customerName: this.search.customerName,
        page: this.search.page.index,
        pageSize: this.search.page.size
      }
    }
  },
  created () {
    this.searchOrder()
  },
  methods: {
    bindKey (record, index) {
      return index
    },
    hasRetouchStream (streamNums) {
      for (const stream of streamNums) {
        if (stream.state === 'wait_retouch') {
          return true
        }
      }
      return false
    },
    cancelOrder (record) {
      this.loading = true
      Api.work.cancel({
        orderNum: record.order_num
      }).then(() => {
        this.searchOrder()
        this.$message.success('订单撤回成功', 2)
      }).finally(() => {
        this.loading = false
      })
    },
    dateChange (date, dateString) {
      this.search.date = dateString
    },
    /**
     * @description 监听页面变化
     */
    pageChange () {
      this.$nextTick(() => {
        this.searchOrder()
      })
    },
    /**
     * @description 搜索订单
     */
    searchOrder (page) {
      this.loading = true
      this.search.page.index = page || this.search.page.index
      Api.work.list(this.searchParams).then((res) => {
        res.msg.items = res.msg.items.map(listItem => {
          return {
            ...listItem,
            clientName: listItem.customer_name || '-'
          }
        })
        this.data = res.msg.items
        this.search.page.total = res.msg.count
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    },
    viewsDetail (record) {
      this.$router.push({
        name: 'recordDetail',
        params: { id: record.order_num }
      })
    }
  }
}
</script>

<style lang="less">
@import './styles/record.less';
</style>
