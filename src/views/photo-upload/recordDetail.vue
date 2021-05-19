<template>
  <div id="recordDetail">
    <div v-if="!loading">
      <section class="content">
        <div class="order-info">
          <h4><span class="line"/><span>订单信息</span></h4>
          <el-row class="item">
            <el-col :span="12">
              <span>订单标题: </span>
              <p class="text">{{ order.title }}</p>
            </el-col>
            <el-col :span="12">
              <span>拍摄产品: </span>
              <p class="text">{{ order.title }}</p>
            </el-col>
          </el-row>
          <el-row class="item">
            <span class="head">修图备注:</span>
            <p class="text">{{ order.retouch_note }}</p>
          </el-row>
        </div>
        <div class="picture-info">
          <h4><span class="line" /><span>照片信息</span></h4>
          <ul>
            <li v-for="(item, index) in order.streams" :key="index">
              <div class="alert-wrap">
                <el-alert
                  :title="`${item.product} (流水号: ${item.stream_num}) `"
                  type="info"
                  :style="{ textAlign: 'left', marginBottom: '24px', backgroundColor: '#e6f7ff', border: '1px solid #91d5ff'}"
                />
              </div>
              <el-row
                v-for="(childItem, childIndex) in item.photos"
                :key="childIndex"
                type="flex"
                justify="start"
                class="pirture-wrap"
              >
                <el-col
                  v-for="(photoItem, photoIndex) in childItem"
                  :key="photoIndex"
                  :span="7"
                  class="item"
                >
                  <div class="container">
                    <div class="img-wrap">
                      <PhotoBox :img-src="`${getHost}${photoItem.path}${$cutDown}`" />
                    </div>
                    <div class="mask">
                      <i class="el-icon-view" @click="previewPicture(photoItem.path)"></i>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </li>
          </ul>
        </div>
      </section>
      <el-dialog :visible.sync="previewVisible">
        <img width="100%" :src="previewImage" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Api from '@/api/index.js'
import PhotoBox from '@/components/PhotoBox'
import { mapGetters } from 'vuex'

export default {
  name: 'RecordDetail',
  components: { PhotoBox },
  data () {
    return {
      order: {},
      previewImage: '',
      previewVisible: false,
      versionState: {
        original_photo: '原片',
        complete_photo: '云端成片',
        first_photo: '一次成片'
      },
      loading: true
    }
  },
  computed: {
    ...mapGetters(['getHost'])
  },
  created () {
    this.reviewOrder()
  },
  methods: {
    previewPicture (url) {
      this.previewImage = `${this.getHost}${url}`
      this.previewVisible = true
    },
    reviewOrder () {
      Api.work.detail({
        orderNum: this.$route.query.orderNum
      }).then((res) => {
        this.order = res.msg
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
@import './styles/recordDetail.less';
</style>
