<template>
  <div>
    <el-row class="search">
      <el-col :span="8" class="date">
        <span class="tip">选择状态: </span>
        <el-select v-model="selectValue" default-value="" style="width: 50%;">
          <el-select-option value="not_pass">全部</el-select-option>
          <el-select-option value="wait_review">待审核</el-select-option>
          <el-select-option value="refuse">审核拒绝</el-select-option>
        </el-select>
      </el-col>
      <el-col :span="1" style="text-align: right;">
        <el-button type="primary" @click="searchProduct(1)">查 询</el-button>
      </el-col>
    </el-row>
    <el-table
      class="table"
      :columns="columns"
      :data-source="dataSource"
      :row-key="bindKey"
      :pagination="false"
      :loading="loading"
    >
      <span slot="status" slot-scope="record">
        <span>{{ stateText[record.state] }}</span>
      </span>
      <span slot="action" slot-scope="record">
        <div>
          <span v-if="record.state === 'refuse'" class="cancel">
            <a href="javascript:;" @click="resubmit(record)">重新提交</a>
            <el-divider type="vertical" />
          </span>
          <a href="javascript:;" @click="viewDetail(record)">详情</a>
        </div>
      </span>
    </el-table>
    <el-pagination
      v-model="page.index"
      class="pagination"
      :total="page.total"
      @change="onPageChange"
    />
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'NotPassTab',
  data () {
    return {
      dataSource: [],
      columns: [{
        title: '产品名称',
        dataIndex: 'name',
        width: 300,
        align: 'left'
      }, {
        title: '生成时间',
        dataIndex: 'created_at',
        width: 300,
        align: 'left'
      }, {
        title: '审核状态',
        scopedSlots: { customRender: 'status' },
        width: 200,
        align: 'left'
      }, {
        title: '拒绝原因',
        dataIndex: 'refuse_reason',
        width: 200,
        align: 'left'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        width: 200,
        align: 'right'
      }],
      stateText: {
        wait_review: '等待审核',
        refuse: '审核拒绝'
      },
      selectValue: 'not_pass',
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
        state: this.selectValue,
        name: '',
        reviewPassAtStart: '',
        reviewPassAtEnd: '',
        page: this.page.index,
        pageSize: this.page.size
      }
    }
  },
  created () {
    this.searchProduct()
  },
  methods: {
    bindKey (record, index) {
      return index
    },
    resubmit (record) {
      this.$router.push({
        name: 'addProduct',
        query: {
          id: record.id,
          name: record.name,
          standard: record.retouch_require,
          url: JSON.stringify(record.simple_photo_paths)
        }
      })
    },
    viewDetail (record) {
      this.$router.push({
        name: 'productDetail',
        params: { id: record.id, type: 'notpass' }
      })
    },
    /**
     * @description 搜索产品
     */
    searchProduct (page) {
      this.loading = true
      this.page.index = page || this.page.index
      Api.product.list(this.searchParams).then((res) => {
        this.dataSource = res.msg.items
        this.page.total = res.msg.count
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
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
    }
  }
}

.table {
  min-height: 200px;
  margin-top: 20px;
}
</style>
