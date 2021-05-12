import JSZipUtils from 'jszip-utils'

// 获取图片地址
export function getUglifyImg (url, needUglify = false) {
  const fullUrl = process.env.VUE_APP_UPYUN_HOST + url
  if (needUglify) return fullUrl + this.$cutDown
  return fullUrl
}

// 转化成64位格式图片
export function getBase64Image (img, removeBase64) {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  let dataURL = canvas.toDataURL('image/' + ext)
  if (removeBase64) {
    dataURL = dataURL.replace('data:image/png;base64,', '')
  }
  return dataURL
}

// 获取远程图片资源
export function getRemoteImg (url, removeBase64 = true) {
  return new Promise(resolve => {
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = url
    image.onload = () => {
      const dataUrl = getBase64Image(image, removeBase64)
      resolve(dataUrl)
    }
  })
}

export function zipGetFile (url) {
  return new Promise(function (resolve, reject) {
    // 避免跨域
    JSZipUtils.getBinaryContent(`${url}?nocache=${Date.now()}`, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 下载功能
export const saveAs = (obj, fileName) => {
  const tmpa = document.createElement('a')
  tmpa.download = fileName || '未命名'
  // 兼容ie 火狐 下载文件
  if (navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(obj, fileName)
  } else if (window.navigator.userAgent.includes('Firefox')) {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(obj)
    a.download = fileName
    document.body.appendChild(a)
    a.click()
  } else {
    tmpa.href = URL.createObjectURL(obj)
  }
  tmpa.click()
  setTimeout(function () {
    URL.revokeObjectURL(obj)
  }, 100)
}

export function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export function base64ToBlob (code) {
  const parts = code.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}

// 下载单张图片
export function downOneImg (imgObj) {
  getRemoteImg(imgObj.url, false).then(res => {
    saveAs(base64ToBlob(res), imgObj.name)
  })
}
