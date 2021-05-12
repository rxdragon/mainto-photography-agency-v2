import QiNiuETag from './qetag.js'

/**
 * @description 处理图片地址
 * @param {String} path 图片地址
 * @param {String} type 系统类型，外包系统相关(bpo)，云端系统相关(cloud)，云学院相关(cschool)，不传默认为：云端
 */
export function handlePicPath (path, type) {
  let resPath = ''
  // 线上环境存储目录
  const prodFilePath = 'upload/'
  // 开发环境存储目录
  const devFilePath = 'upload_dev/'
  resPath = (path.replace(devFilePath, '')).replace(prodFilePath, '')
  return resPath
}

/**
 * @description 获取文件后缀
 * @param {*} name
 */
export function getFilePostfix (name) {
  const indexPoint = name.lastIndexOf('.') + 1
  return name.substring(indexPoint)
}

/**
 * @description 截取文件名
 * @param {*} name
 */
export function fileNameFormat (name) {
  const fileName = realName(name)
  const indexPoint = fileName.lastIndexOf('.')
  const returnName = fileName
  return returnName.substring(0, indexPoint)
}

/**
 * @description 获取图片md5值
 * @param {*} file
 */
export async function getImgBufferPhoto (file) {
  const reader = new QiNiuETag()
  await reader.updateBlob(file)
  const data = reader.fileInfo
  const fileExt = getFilePostfix(file.name).toLowerCase()
  const originalExt = data.typeInfo.ext.toLowerCase()
  if (fileExt !== originalExt) {
    const errorMessage = `
        <span class="danger-color">${file.name}</span>格式错误，
        文件原始格式为<span class="danger-color">${originalExt}</span>格式，
        请使用<span class="danger-color">PS另存为</span>保存!`
    return Promise.reject(errorMessage)
  }
  return data
}

/**
 * @description 去除日期的真实名字
 * @param {*} path
 */
export function realName (path) {
  const pathArr = path.split('/')
  return pathArr[pathArr.length - 1]
}
