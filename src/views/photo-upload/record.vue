<template>
  <div id="uploadRecord">
    <section class="content">
      <el-row  class="search">
        <div class="search-item" >
          <span class="tip">选择日期: </span>
          <el-date-picker
            size="small"
            v-model="search.date"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div class="search-item" >
          <span class="tip">订单标题: </span>
          <el-input
            clearable
            size="small"
            v-model="search.title"
            placeholder="请输入订单标题"
            style="width: 75%;"
          />
        </div>
        <div class="search-item" >
          <span class="tip">顾客姓名: </span>
          <el-input
            clearable
            size="small"
            v-model="search.customerName"
            placeholder="请输入顾客姓名"
            style="width: 75%;"
          />
        </div>
        <div class="search-item"  style="text-align: right;">
          <el-button size="small" type="primary" @click="searchOrder(1)">查 询</el-button>
        </div>
      </el-row>
      <div class="table">
        <template>
          <el-table v-loading="loading" :data="data">
            <el-table-column
              v-for="(item, index) in colInfo"
              :key="index"
              :header-align="item.align"
              :align="item.align"
              :min-width="item.width"
              :label="item.label"
              :prop="item.prop"
            />
            <el-table-column label="流水号" min-width="90%">
              <span slot-scope="{ row }">
                <p v-for="(item, index) in row.stream_nums" :key="index">
                  {{ `${item.stream_num} (${transText[item.state] || '状态未知'})` }}
                </p>
              </span>
            </el-table-column>
            <el-table-column label="操作" min-width="40%">
              <span slot-scope="{ row }">
                <span v-if="hasRetouchStream(row.stream_nums)" class="cancel">
                  <a href="javascript:;" @click="cancelOrder(row)" style="text-decoration: none;">撤回</a>
                  <el-divider direction="vertical" />
                </span>
                <a href="javascript:;" @click="viewsDetail(row)" style="text-decoration: none;">详情</a>
              </span>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="page-box">
        <el-pagination
          :current-page.sync="search.page.index"
          class="pagination"
          :total="search.page.total"
          @current-change="pageChange"
        />
      </div>
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
      colInfo: [{
        label: '订单标题',
        prop: 'title',
        width: '40%',
        align: 'left'
      }, {
        label: '订单号',
        prop: 'order_num',
        width: '70%',
        align: 'left'
      }, {
        label: '顾客姓名',
        prop: 'clientName',
        width: '40%',
        align: 'left'
      }, {
        label: '上传时间',
        prop: 'created_at',
        width: '70%',
        align: 'left'
      }],
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
        date: ['', ''],
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
        createdAtStart: this.search.date ? this.search.date[0] : '',
        createdAtEnd: this.search.date ? this.search.date[1] : '',
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
        this.$message.success('订单撤回成功')
      }).finally(() => {
        this.loading = false
      })
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
        path: 'recordDetail',
        query: { orderNum: record.order_num }
      })
    }
  }
}
</script>

<style lang="less">
@import './styles/record.less';
</style>
