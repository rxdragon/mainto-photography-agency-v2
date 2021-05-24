<template>
  <div id="custom">
    <section class="content">
      <el-row class="search">
        <el-col :span="8">
          <span class="tip">上传时间: </span>
          <el-date-picker
            v-model="search.date"
            class="wrap"
            size="small"
            type="daterange"
            :picker-options="pickerOptions"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-col>
        <el-col :span="8">
          <span class="tip">顾客姓名: </span>
          <el-input
            clearable
            size="small"
            v-model="search.clientName"
            class="wrap"
            placeholder="请输入顾客姓名"
          />
        </el-col>
        <el-col :span="6">
          <span class="tip">订单号: </span>
          <el-input
            clearable
            size="small"
            v-model="search.number"
            class="wrap"
            placeholder="请输入订单号"
          />
        </el-col>
        <el-col :span="2">
          <el-button size="small" type="primary" @click="searchOrder(1)">查 询</el-button>
        </el-col>
      </el-row>
      <el-table class="table" v-loading="loading" :data="data">
        <el-table-column
          v-for="(item, index) in colInfo"
          :key="index"
          :align="item.align"
          :header-align="item.align"
          :min-width="item.width"
          :prop="item.prop"
          :label="item.label"
        />
        <el-table-column
          min-width="90%"
          header-align="left"
          align="left"
          label="流水号"
        >
          <span slot-scope="{ row }">
            <p v-for="(item, index) in row.stream_nums" :key="index">
              {{ `${item.stream_num} (${transText[item.state] || '状态未知'})` }}
              <el-popover
                width="200"
                placement="top-start"
                trigger="hover"
                title="修图信息"
                :content="'修图主管：' + item.retoucherLeader"
              >
                <i slot="reference" class="el-icon-info" />
              </el-popover>
            </p>
          </span>
        </el-table-column>
        <el-table-column
          min-width="40%"
          header-align="left"
          align="left"
          label="操作"
        >
          <span slot-scope="{ row }">
            <a href="javascript:;" @click="routeView(row)" style="text-decoration: none;">详情</a>
          </span>
        </el-table-column>
      </el-table>
      <div class="page-box">
        <el-pagination
          :current-page.sync="search.page.index"
          class="pagination"
          :total="search.page.total"
          @current-change="onPageChange"
        />
      </div>
    </section>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import moment from 'moment'

export default {
  name: 'Custom',
  data () {
    return {
      data: [],
      colInfo: [{
        label: '订单标题',
        width: '40%',
        prop: 'title',
        align: 'left'
      }, {
        label: '订单号',
        width: '70%',
        prop: 'order_num',
        align: 'left'
      }, {
        label: '顾客姓名',
        width: '40%',
        prop: 'clientName',
        align: 'left'
      }, {
        label: '上传时间',
        width: '70%',
        prop: 'updated_at',
        align: 'left'
      }, {
        label: '摄影师',
        width: '40%',
        prop: 'photographer',
        align: 'left'
      }],
      pickerOptions: {
        disabledDate (current) {
          return current && current > moment().endOf('day')
        }
      },
      transText: {
        wait_retouch: '等待修片',
        finish: '云端修图完成',
        retouching: '修片中',
        wait_review: ' 审核中',
        reviewing: '等待审核',
        hanging: '挂起中',
        review_return_retouch: '审核退回修片中'
      },
      search: {
        date: ['', ''],
        clientName: '',
        number: '',
        page: {
          index: 1,
          size: 10,
          total: 0
        }
      },
      loading: false
    }
  },
  computed: {
    searchParams () {
      return {
        type: 'global',
        createdAtStart: this.search.date ? this.search.date[0] : '',
        createdAtEnd: this.search.date ? this.search.date[1] : '',
        customerName: this.search.clientName,
        title: '',
        orderNum: this.search.number,
        page: this.search.page.index,
        pageSize: this.search.page.size
      }
    }
  },
  created () {
    this.searchOrder()
  },
  methods: {
    routeView (record) {
      this.$router.push({
        name: 'customDetail',
        query: { id: record.order_num }
      })
    },
    /**
     * @description 查询订单数据
     */
    searchOrder (page) {
      this.loading = true
      this.search.page.index = page || this.search.page.index
      Api.work.list(this.searchParams).then((res) => {
        res.msg.items = res.msg.items.map(listItem => {
          listItem.stream_nums.forEach(streamItem => {
            const retoucherInfo = streamItem.retoucher
            streamItem.retoucherName = '-'
            streamItem.retoucherLeader = '-'
            if (retoucherInfo) {
              streamItem.retoucherName = retoucherInfo.name || retoucherInfo.real_name || '-'
              if (retoucherInfo.retoucher_leader) {
                streamItem.retoucherLeader = retoucherInfo.retoucher_leader.nickname || retoucherInfo.retoucher_leader.name || '-'
              }
            }
          })
          return {
            ...listItem,
            clientName: listItem.customer_name || '-'
          }
        })
        this.data = res.msg.items
        this.search.page.total = res.msg.count
      }).catch((e) => {
        this.$message.error(e.data.error_msg || e)
      }).finally(() => {
        this.loading = false
      })
    },
    /**
     * @description 页面变动
     */
    onPageChange () {
      this.$nextTick(() => {
        this.searchOrder()
      })
    }
  }
}
</script>
<style lang="less">
@import './styles/custom.less';
</style>
