<template>
  <div id="customDetail">
    <div v-if="loading" v-loading="loading" class="spin-content" />
    <div v-else class="contaner">
      <section class="content">
        <div class="order-info">
          <h4><span class="line" /><span>订单信息</span></h4>
          <el-row>
            <el-col :span="12" class="cell">
              <p class="head">订单标题:</p>
              <p>{{ order.title }}</p>
            </el-col>
            <el-col :span="12" class="cell">
              <p class="head">拍摄产品:</p>
              <p>{{ order.products.join('、') }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="cell">
              <p class="head">上传人:</p>
              <p class="icon-line"><span />{{ order.photographer }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="cell">
              <p class="head">修图备注:</p>
              <p>{{ order.retouch_note }}</p>
            </el-col>
          </el-row>
        </div>
        <el-divider />
        <div class="picture-info">
          <h4>
            <span class="line" /><span>照片信息</span>
            <div class="float-button">
              <el-button size="small" class="origin" @click="createZip('first')">原片下载</el-button>
              <el-button size="small" type="primary" @click="createZip('complete')">云端成片下载</el-button>
            </div>
          </h4>
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
                  <p class="tip">
                    <span class="button" @click="download(`${getHost}${photoItem.path}`)">下载照片</span>
                    <span class="text">{{ versionState[photoItem.version] }}</span>
                  </p>
                </el-col>
              </el-row>
            </li>
          </ul>
        </div>
        <el-dialog :visible.sync="previewVisible">
          <img width="100%" :src="previewImage" />
        </el-dialog>
      </section>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import JsZip from 'jszip'
import moment from 'moment'
import PhotoBox from '@/components/PhotoBox'
import { mapGetters } from 'vuex'
import * as utils from '@/utils'

export default {
  name: 'Custom',
  components: { PhotoBox },
  data () {
    return {
      loading: false,
      previewVisible: false,
      previewImage: '',
      order: {
        title: '',
        products: [],
        photographer: '',
        streams: []
      },
      versionState: {
        original_photo: '原片',
        complete_photo: '云端成片'
      }
    }
  },
  computed: {
    ...mapGetters(['getHost']),
    photoQueue () {
      const photoList = { firstArr: [], completeArr: [] }
      this.order.streams.map((item) => {
        const itemList = item.photos
        itemList.map((item) => {
          item.map((photoItem) => {
            if (photoItem.version === 'complete_photo') {
              photoList.completeArr.push(`${this.getHost}${photoItem.path}`)
            } else if (photoItem.version === 'original_photo') {
              photoList.firstArr.push(`${this.getHost}${photoItem.path}`)
            }
          })
        })
      })
      return photoList
    }
  },
  created () {
    this.reviewOrder()
  },
  methods: {
    previewPicture (url) {
      this.previewImage = `${this.getHost}${url}`
      this.previewVisible = true
    },
    download (url) {
      window.location = `${url}?attname=`
    },
    showModel (url) {
      this.previewImage = `${this.getHost}${url}`
      this.previewVisible = true
    },
    resetPreviewImage () {
      this.previewVisible = false
      this.previewImage = ''
    },
    reviewOrder () {
      this.loading = true
      Api.work.detail({
        orderNum: this.$route.query.id
      }).then((res) => {
        this.order = res.msg
      }).catch((e) => {
        this.$message.error(e.data.error_msg, 1, this.routeBack)
      }).finally(() => {
        this.loading = false
      })
    },
    createZip (type) {
      const photoData = type === 'first' ? this.photoQueue.firstArr : this.photoQueue.completeArr
      const folder = type === 'first' ? '原片' : '成片'
      if (photoData.length === 0) {
        return this.$message.error(`未找到${folder}资源`)
      }
      const zip = new JsZip()
      const fold = zip.folder(folder)
      const transArr = []
      photoData.map(obj => {
        const promiseItem = utils.zipGetFile(obj).then(res => {
          const arrName = obj.split('/')
          const fileName = arrName[arrName.length - 1] // 获取文件名
          fold.file(fileName, res, { base64: true })
        })
        transArr.push(promiseItem)
      })
      Promise.all(transArr).then(() => {
        zip.generateAsync({ type: 'blob' }).then(content => {
          utils.saveAs(content, `${folder} ${moment().format('YYYY-MM-DD HH-mm-ss')}.zip`)
        })
      })
    }
  }
}
</script>
<style lang="less">
@import './styles/customDetail.less';
</style>
