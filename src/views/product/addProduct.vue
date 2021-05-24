<template>
  <div id="addProduct">
    <section class="form">
      <el-row class="item">
        <el-col class="left-title">
          <span class="tip name"><b>*</b> 产品名称: </span>
        </el-col>
        <el-col :span="6">
          <el-input size="small" v-model="product.name" placeholder="填写产品名称" />
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col class="left-title">
          <span class="tip"><b>*</b> 修图要求: </span>
        </el-col>
        <el-col :span="6">
          <el-input
            size="small"
            type="textarea"
            v-model="product.standard"
            placeholder="请输入修图要求"
            :rows="4"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col class="left-title">
          <div class="tip"><b>*</b> 样片素材: </div>
        </el-col>
        <el-col :span="21">
          <div class="upload">
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
          <el-button type="primary" class="submit" @click="sumbitAdd">
            提交审核
          </el-button>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import Api from '@/api/index.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import * as PhotoTool from '@/utils/photoTool'
import PhotoBox from '@/components/PhotoBox'

export default {
  components: { PhotoBox },
  filters: {
    // 过滤进度条
    formatProgress (value) {
      return Number(value.toFixed(0))
    }
  },
  data () {
    return {
      previewImage: '',
      previewVisible: false,
      fileList: [],
      shaList: [], // 用于判断一次性多选文件时间,重复文件判断
      product: {
        name: '',
        standard: ''
      },
      uploadHeader: {
        'X-Requested-With': null
      }
    }
  },
  computed: {
    ...mapGetters(['getUpyun', 'getHost']),
    ...mapState({
      getHost: state => {
        //  去除域名后面的「upload_dev」
        return state.upyun.host.replace(/com\/(\S*)\//, 'com/')
      }
    }),
    params () {
      return {
        id: this.$route.query.id || '',
        name: this.product.name,
        retouchRequire: this.product.standard,
        simplePhotoPaths: this.fileList.map((item) => {
          const url = (item.response && item.response.url) || item.name
          const returnUrl = PhotoTool.handlePicPath(url)
          return returnUrl.replace('https:', '').replace('http:', '')
        })
      }
    },
    upyunAction () {
      return 'https://upload.qiniup.com/'
    },
    hasQuery () {
      return this.$route.query.id !== undefined
    },
    addSubmit () {
      return this.hasQuery === true ? Api.product.readd : Api.product.add
    }
  },
  created () {
    if (this.hasQuery) {
      this.initQuery()
    }
    this.initUpyun()
  },
  methods: {
    ...mapActions(['initUpyun']),
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ file, fileList }) {
      this.fileList = fileList
      if (file.status === 'error') {
        return this.$message.error('upyun 上传异常')
      }
    },
    sumbitAdd () {
      if (!this.product.name || !this.product.standard || !this.fileList.length) {
        return this.$message.error('请填写完整信息')
      }
      for (const photo of this.fileList) {
        if (photo.status !== 'success') {
          return this.$message.error('请等待图片上传完成!')
        }
      }
      this.$emit('loading', true)
      this.addSubmit(this.params).then(() => {
        this.product = { name: '', standard: '' }
        this.fileList = []
        this.$message.success('产品添加成功')
        this.routeBack()
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.$emit('loading', false)
      })
    },
    initQuery () {
      this.product = {
        name: this.$route.query.name,
        standard: this.$route.query.standard
      }
      JSON.parse(this.$route.query.url).map((item) => {
        this.fileList.push({
          uid: this.$route.query.name,
          status: 'success',
          name: item,
          url: `${this.getHost}${item}`
        })
      })
    },
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
@import './styles/addProduct.less';
</style>
