<template>
  <div>
    <el-row class="search">
      <el-col :span="8" class="date">
        <span class="tip">选择状态: </span>
        <el-select size="small" v-model="selectValue" style="width: 50%;">
          <el-option value="not_pass" label="全部" />
          <el-option value="wait_review" label="待审核" />
          <el-option value="refuse" label="审核拒绝" />
        </el-select>
      </el-col>
      <el-col :span="1" style="text-align: right;">
        <el-button size="small" type="primary" @click="searchProduct(1)">查 询</el-button>
      </el-col>
    </el-row>
    <el-table class="table" v-loading="loading" :data="dataSource">
      <el-table-column
        header-align="left"
        align="left"
        prop="name"
        label="产品名称"
      />
      <el-table-column
        header-align="left"
        align="left"
        prop="created_at"
        label="生成时间"
      />
      <el-table-column header-align="left" align="left" label="审核状态">
        <span slot-scope="{ row }">
          <span>{{ stateText[row.state] }}</span>
        </span>
      </el-table-column>
      <el-table-column
        header-align="left"
        align="left"
        prop="refuse_reason"
        label="拒绝原因"
      />
      <el-table-column header-align="left" align="left" label="操作">
        <span slot-scope="{ row }">
          <div>
            <span v-if="row.state === 'refuse'" class="cancel">
              <a href="javascript:;" style="text-decoration: none;" @click="resubmit(row)">重新提交</a>
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
        class="pagination"
        :total="page.total"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'NotPassTab',
  data () {
    return {
      dataSource: [],
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
        query: { id: record.id, type: 'notpass' }
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
