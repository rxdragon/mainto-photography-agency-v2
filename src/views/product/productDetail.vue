<template>
  <div id="productDetail">
    <div v-if="loading" v-loading="loading" class="spin-content" />
    <div v-else class="container">
      <el-row class="title">
        <h4><span class="line" /><span>样片素材</span></h4>
      </el-row>
      <section class="form">
        <el-row :span="24" class="item">
          <el-col
            v-for="(item, index) in product.simple_images"
            :key="index"
            class="picture-wrap"
            :span="6"
          >
            <div class="container-wrap">
              <div class="img-wrap">
                <PhotoBox :img-src="`${getHost}${item}${$cutDown}`" />
              </div>
              <div class="mask">
                <i class="bigger-icon el-icon-view" @click="showModel(item)" />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="24" class="product-info">
            <p class="name">产品名称: {{ product.name }}</p>
            <span class="line" />
            <p class="retouch">修图要求: {{ product.retouch_require }}</p>
          </el-col>
        </el-row>
        <el-row v-if="!$route.params.type" class="standard item">
          <el-col :span="6">
            <span class="tip">修图标准: </span>
          </el-col>
          <el-col :span="6">
            <span class="tip">权重等级: </span>
          </el-col>
          <el-col :span="6">
            <span class="tip">模版占位: </span>
          </el-col>
          <el-col :span="6">
            <span class="tip">照片拼接: </span>
          </el-col>
        </el-row>
        <el-row v-if="!$route.params.type" class="parameter item">
          <el-col :span="6">
            <span class="tip">{{ standardText[product.retouch_standard] || '' }}</span>
          </el-col>
          <el-col :span="6">
            <span class="tip">{{ weightState[product.weight_level] }}</span>
          </el-col>
          <el-col :span="6">
            <span class="tip">{{ product.need_template === 0 ? '不需要' : '需要' }}</span>
          </el-col>
          <el-col :span="6">
            <span class="tip">{{ product.need_splicing === 0 ? '不需要' : '需要' }}</span>
          </el-col>
        </el-row>
        <el-row v-if="product.normal_income_config" class="cut">
          <el-col class="title" :span="24">
            <h4><span class="line" /><span>非拼接收益</span></h4>
          </el-col>
          <el-col :span="24" class="item">
            <ul class="profit">
              <li
                v-for="(item, index) in product.normal_income_config.retoucher"
                :key="index"
              >
                <span class="head">{{ `${index}人` }}</span><span>{{ `¥ ${item}` }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-row
          v-if="product.normal_income_config && product.need_splicing !== 0"
          class="cut"
        >
          <el-col class="title" :span="24">
            <h4><span class="line" /><span>拼接收益</span></h4>
          </el-col>
          <el-col :span="24" class="item">
            <ul class="profit">
              <li
                v-for="(item, index) in product.splicing_income_config.retoucher"
                :key="index"
              >
                <span class="head">{{ `${index}人` }}</span><span>{{ `¥ ${item}` }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="title" :span="24">
            <h4><span class="line" /><span>产品备注信息</span></h4>
          </el-col>
          <el-col :span="24" class="item">
            <p class="tip note">{{ product.note || '暂无备注' }}</p>
          </el-col>
        </el-row>
        <el-dialog :visible.sync="previewVisible">
          <img width="100%" :src="previewImage" />
        </el-dialog>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PhotoBox from '@/components/PhotoBox'
import Api from '@/api/index.js'

export default {
  components: { PhotoBox },
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      standardText: {
        blue: '蓝标',
        master: '大师店',
        kids: '海马体儿童',
        mainto: '缦图摄影'
      },
      weightState: {
        weight_first: '一类产品',
        weight_second: '二类产品',
        weight_third: '三类产品',
        weight_fourth: '四类产品',
        weight_fifth: '五类产品'
      },
      loading: true,
      product: {}
    }
  },
  computed: {
    ...mapGetters(['getHost'])
  },
  created () {
    this.reviewProduct()
  },
  methods: {
    showModel (url) {
      this.previewImage = `${this.getHost}${url}`
      this.previewVisible = true
    },
    reviewProduct () {
      this.loading = true
      Api.product.detail({
        id: this.$route.query.id
      }).then((res) => {
        this.product = res.msg
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
@import './styles/productDetail.less';
</style>
