<template>
  <div id="upload">
    <ul class="el-upload-list el-upload-list--picture-card">
      <li v-for="(item, index) in fileList" :key="item.sha1" class="list-wrap">
        <div class="el-upload-list__item is-success">
          <PhotoBox v-if="item.status === 'success' && item.response" :file-obj="item" :img-src="item.response.url" />
          <el-progress v-else type="circle" :percentage="item.percentage | formatProgress" />
          <p class="picture-name">{{ `文件名: ${item.name}` }}</p>
          <label class="el-upload-list__item-status-label">
            <i class="el-icon-upload-success el-icon-check"/>
          </label>
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview">
              <i v-if="item.status === 'success' && item.response" class="el-icon-zoom-in" @click="previewPicture(item.response.url)"/>
            </span>
            <span class="el-upload-list__item-delete">
              <i class="el-icon-delete" @click="deletePicture(item, index)"/>
            </span>
          </span>
        </div>
        <p class="picture-count">
          填写人数:
          <el-input-number
            size="small"
            v-model="item.people_num"
            controls-position="right"
            placeholder="请填写人数"
            :min="0"
            :max="20"
          />
        </p>
        <p class="picture-product">
          选择产品:
          <el-select
            size="small"
            v-model="item.product_id"
            filterable
            placeholder="请选择产品类型"
            @change="onProductChange(item)"
          >
            <el-option
              v-for="(child, childIndex) in productList.msg"
              :key="childIndex"
              :label="child.name"
              :value="child.cloud_product_id"
            />
          </el-select>
        </p>
        <p v-if="needSplit(item)" class="picture-concat">
          <el-select size="small" v-model="item.splice_mark" placeholder="选择拼接类型">
            <el-option
              v-for="(positionItem, positionIndex) in splitArray"
              :key="positionIndex"
              :label="positionItem"
              :value="positionItem"
            />
          </el-select>
          <el-input-number
            controls-position="right"
            size="small"
            v-model="item.splice_position"
            style="width: 40%; margin-left: 4%;"
            :min="1"
            :max="99"
            placeholder="序号"
          />
        </p>
      </li>
      <el-upload
        ref="upload"
        accept="image/*"
        drag
        multiple
        :headers="uploadHeader"
        :action="upyunAction"
        :data="getUpyun"
        :file-list="fileList"
        :show-file-list="false"
        list-type="picture-card"
        :before-upload="checkFile"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </ul>
    <el-dialog :visible.sync="previewVisible">
      <img width="100%" :src="previewImage" />
    </el-dialog>
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
      splitArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      loading: false
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
    async handleSuccess (response, file, fileList) {
      this.fileList = fileList
      fileList.forEach(fileItem => {
        const isAdded = Boolean(fileItem.sha1)
        if (fileItem.status === 'success' && !isAdded) {
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
    handleProgress (event, file, fileList) {
      this.fileList = fileList
    }
  }
}
</script>

<style lang="less">
@import '../styles/photoUpload.less';
</style>
