<template>
  <div class="photo-box">
    <el-image :src="src" fit="contain">
      <div slot="error" class="image-slot">
        <i class="err-icon el-icon-picture-outline"></i>
        <div class="err-desc">网络加载错误</div>
      </div>
    </el-image>
  </div>
</template>

<script>
export default {
  name: 'PhotoBox',
  props: {
    imgSrc: { type: String, required: true },
    fileObj: { type: Object, default: null }
  },
  data () {
    return {
      isError: false,
      fileData: null,
      quality: 0.8,
      width: 700,
      src: ''
    }
  },
  created () {
    if (!this.fileObj) {
      const imgSrcArr = this.imgSrc.split('/')
      const isOldPath = imgSrcArr.length <= 5
      if (isOldPath) {
        this.src = this.imgSrc
      } else {
        this.src = this.handleCompressImg(this.imgSrc)
      }
    } else {
      this.fileData = this.fileObj.raw
      this.pressImg()
    }
  },
  methods: {
    handleErrorImg () {
      this.isError = true
    },
    handleCompressImg (src) {
      // 线上环境存储目录
      const prodFilePath = 'upload/'
      // 开发环境存储目录
      const devFilePath = 'upload_dev/'
      const resPath = (src.replace(devFilePath, 'compress/')).replace(prodFilePath, 'compress/')
      return resPath
    },
    /**
     * @param {二进制文件流} file
     */
    changeFileToBaseURL (file) {
      return URL.createObjectURL(file)
    },
    /**
     * @description 压缩图片
     */
    async pressImg () {
      // 得到文件类型
      const fileType = this.fileData.type
      const imgSrc = this.changeFileToBaseURL(this.fileData)
      const image = new Image()
      image.src = imgSrc
      image.onload = () => {
        const scale = image.width / image.height
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = this.width
        canvas.height = parseInt(this.width / scale)
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        canvas.toBlob((blobData) => {
          this.src = URL.createObjectURL(blobData)
        }, fileType, this.quality)
      }
    }
  }
}
</script>

<style lang="less">
.photo-box {
  width: 100%;
  height: 100%;

  .el-image {
    width: 100%;
    height: 100%;

    .err-icon {
      font-size: 40px;
      color: rgb(218, 214, 214);
    }

    .image-slot {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      .err-desc {
        margin-top: 16px;
        font-size: 16px;
        color: rgb(218, 214, 214);
      }
    }
  }
}
</style>
