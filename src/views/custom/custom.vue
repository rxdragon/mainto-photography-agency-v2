<template>
  <div id="custom">
    <section class="content">
      <el-row class="search">
        <el-col :span="8">
          <span class="tip">上传时间: </span>
          <el-date-picker type="daterange" class="wrap" @change="dateChange" />
        </el-col>
        <el-col :span="8">
          <span class="tip">顾客姓名: </span>
          <el-input v-model="search.clientName" class="wrap" placeholder="请输入顾客姓名" />
        </el-col>
        <el-col :span="6">
          <span class="tip">订单号: </span>
          <el-input v-model="search.number" class="wrap" placeholder="请输入订单号" />
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="searchOrder(1)">查 询</el-button>
        </el-col>
      </el-row>
      <el-table
        class="table"
        :loading="loading"
        :row-key="bindKey"
        :columns="columns"
        :data-source="data"
        :pagination="false"
      >
        <span slot="stream_nums" slot-scope="record">
          <p v-for="(item, index) in record.stream_nums" :key="index">
            {{ `${item.stream_num} (${transText[item.state] || '状态未知'})` }}
            <el-popover title="修图信息">
              <template slot="content">
                <p>修图主管：{{ item.retoucherLeader }}</p>
              </template>
              <el-icon type="info-circle" />
            </el-popover>
          </p>
        </span>

        <span slot="action" slot-scope="record">
          <a href="javascript:;" @click="routeView(record)">详 情</a>
        </span>
      </el-table>
      <el-pagination
        v-model="search.page.index"
        class="pagination"
        :total="search.page.total"
        @change="onPageChange"
      />
    </section>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'Custom',
  data () {
    const rowInfo = [{
      title: '订单标题',
      width: 300,
      dataIndex: 'title',
      align: 'left'
    }, {
      title: '订单号',
      width: 300,
      dataIndex: 'order_num',
      align: 'left'
    }, {
      title: '顾客姓名',
      width: 200,
      dataIndex: 'clientName',
      align: 'left'
    }, {
      title: '上传时间',
      width: 200,
      dataIndex: 'updated_at',
      align: 'left'
    }, {
      title: '摄影师',
      width: 200,
      dataIndex: 'photographer',
      align: 'left'
    }, {
      title: '流水号',
      width: 400,
      scopedSlots: { customRender: 'stream_nums' },
      align: 'left'
    }, {
      title: '操作',
      scopedSlots: { customRender: 'action' },
      width: 100,
      align: 'right'
    }]
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
      search: {
        date: [],
        clientName: '',
        number: '',
        page: {
          index: 1,
          size: 10,
          total: 0
        }
      },
      loading: false,
      columns: rowInfo
    }
  },
  created () {
    this.searchOrder()
  },
  methods: {
    bindKey (record, index) {
      return index
    },
    dateChange (date, dateString) {
      this.search.date = dateString
    },
    routeView (record) {
      this.$router.push({
        name: 'customDetail',
        params: { id: record.order_num }
      })
    },
    /**
     * @description 查询订单数据
     */
    searchOrder (page) {
      this.loading = true
      this.search.page.index = page || this.search.page.index
      const reqData = {
        type: 'global',
        createdAtStart: this.search.date[0] || '',
        createdAtEnd: this.search.date[1] || '',
        customerName: this.search.clientName,
        title: '',
        orderNum: this.search.number,
        page: this.search.page.index,
        pageSize: this.search.page.size
      }
      Api.work.list(reqData).then((res) => {
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
@import './styles/index.less';
</style>
