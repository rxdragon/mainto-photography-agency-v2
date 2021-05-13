<template>
  <div id="upload">
    <!-- 照片上传 -->
    <div class="upload">
      <div class="clearfix">
        <ul class="el-upload-list el-upload-list-picture-card">
          <!-- 单张照片列表 -->
          <li v-for="(item, index) in fileList" :key="item.sha1" class="list-wrap">
            <div class="el-upload-list-item el-upload-list-item-done">
              <div class="el-upload-list-item-info">
                <PhotoBox />
                <el-progress></el-progress>
                <p class="picture-name">{{ `文件名: ${item.name}` }}</p>
              </div>
              <span class="el-upload-list-item-actions">
                <i v-if="item.status === 'done' && item.response" class="anticon anticon-eye-o" @click="previewPicture(item.response.url)">
                  <i type="eye" /></i>
                <i class="anticon anticon-delete" @click="deletePicture(item, index)">
                  <i type="delete" /></i>
              </span>
            </div>
            <p class="picture-count">
              填写人数:
              <el-input-number
                controls-position="right"
                v-model="item.people_num"
                placeholder="请填写人数"
                :min="0"
                :max="20"
              />
            </p>
            <p class="picture-product">
              选择产品:
              <el-select v-model="item.product_id" placeholder="请选择产品类型" @change="onProductChange(item)">
                <el-option v-for="(child, childIndex) in productList.msg" :key="childIndex" :value="child.cloud_product_id">{{ child.name }}</el-option>
              </el-select>
            </p>
            <p v-if="needSplit(item)" class="picture-product">
              <el-select v-model="item.splice_mark" class="concat" placeholder="选择拼接类型">
                <el-option
                  v-for="(positionItem, positionIndex) in splitArray"
                  :key="positionIndex"
                  :value="positionItem"
                >
                  {{ positionItem }}
                </el-option>
              </el-select>
              <el-input-number
                v-model="item.splice_position"
                style="width: 40%; margin-left: 4%;"
                :min="1"
                :max="99"
                placeholder="拼接序号"
              />
            </p>
          </li>
          <el-upload
            drag
            multiple
            accept="image/*"
            :headers="uploadHeader"
            :action="upyunAction"
            :before-upload="checkFile"
            list-type="picture-card"
            :data="getUpyun"
            :file-list="fileList"
            :show-file-list="false"
            @change="handleChange"
          >
            <div class="el-icon-plus" slot="trigger"><br><br>点击上传</div>
          </el-upload>
        </ul>
        <el-dialog :visible="previewVisible" :footer="null" :before-close="handleCancel">
          <img style="width: 100%;" :src="previewImage">
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/index.js'
import PhotoBox from '@/components/PhotoBox'
import { mapGetters, mapState, mapActions } from 'vuex'
import * as PhotoTool from '@/utils/photoTool'

export default {
  name: 'Upload',
  filters: {
    // 过滤进度条
    formatProgress (value) {
      return Number(value.toFixed(0))
    }
  },
  components: { PhotoBox },
  data () {
    return {
      productList: [],
      uploadHeader: { 'X-Requested-With': null },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      shaList: [], // 用于判断一次性多选文件时间,重复文件判断
      count: 0,
      splitIndex: '',
      splitArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      loading: false,
      productValue: undefined,
      spliceValue: undefined
    }
  },
  computed: {
    ...mapGetters(['getUpyun']),
    ...mapState({
      getHost: state => {
        //  去除域名后面的「upload_dev」
        return state.upyun.host.replace(/com\/(\S*)\//, 'com/')
      }
    }),
    // 上传地址
    upyunAction () {
      // eslint-disable-next-line quotes
      return `https://upload.qiniup.com/`
    }
  },
  async created () {
    this.productList = await Api.product.listAll()
    this.initUpyun()
  },
  methods: {
    ...mapActions(['initUpyun']),
    /**
     * @description 更改图片地址
     */
    changeImagePath (url) {
      const imgPath = this.getHost + url + this.$cutDown
      return imgPath
    },
    /**
     * @description 监听产品变化
     */
    onProductChange (fileItem) {
      const isSplitProduct = this.needSplit(fileItem)
      if (!isSplitProduct) {
        fileItem.splice_mark = null
        fileItem.splice_position = null
      }
    },
    /**
     * @description 上传前生命周期
     */
    async checkFile (file) {
      try {
        this.$emit('loading', true)
        const info = await PhotoTool.getImgBufferPhoto(file)
        const sha1 = info.sha1
        const hasSamePhoto = this.fileList.find(fileItem => fileItem.name === file.name || fileItem.sha1 === sha1)
        if (hasSamePhoto) throw new Error('重复照片上传')
        if (this.shaList.indexOf(sha1) > -1) throw new Error('存在相同的照片')
        this.shaList.push(sha1)
        return Promise.resolve()
      } catch (error) {
        this.$message.warning(error.message || error)
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject()
      } finally {
        this.$emit('loading', false)
      }
    },
    /**
     * @description 监听上传变化
     */
    async handleChange ({ file, fileList }) {
      this.fileList = fileList
      fileList.forEach(fileItem => {
        const isAdded = Boolean(fileItem.sha1)
        if (fileItem.status === 'done' && !isAdded) {
          const photoPathName = PhotoTool.handlePicPath(file.response.url)
          const photoName = PhotoTool.fileNameFormat(photoPathName)
          const sha1 = photoName
          this.$set(fileItem, 'people_num', '')
          this.$set(fileItem, 'splice_mark', null)
          this.$set(fileItem, 'splice_position', null)
          this.$set(fileItem, 'product_id', undefined)
          this.$set(fileItem, 'sha1', sha1)
        }
      })
    },
    getChildPhotos () {
      const isFinish = this.fileList.every(photoItem => photoItem.sha1)
      if (!isFinish) {
        this.$message.error('未上传完毕')
        return false
      }
      this.$emit('sendPhotos', this.fileList)
      return true
    },
    needSplit (item) {
      const selectId = item.product_id || 0
      const proList = this.productList.msg
      for (const option of proList) {
        const matchId = option.cloud_product_id === selectId
        const needSplicing = option.need_splicing > 0
        if (matchId && needSplicing) {
          return true
        }
      }
      return false
    },
    deletePicture (picture, index) {
      this.fileList.splice(index, 1)
      const idx = this.shaList.indexOf(picture.sha1)
      this.shaList.splice(idx, 1)
    },
    resetshaList () {
      this.shaList = []
    },
    previewPicture (url) {
      this.previewImage = `${this.getHost}${url}`
      this.previewVisible = true
    },
    handleCancel () {
      this.previewVisible = false
    }
  }
}
</script>

<style lang="less">
@import '../styles/index.less';
</style>
