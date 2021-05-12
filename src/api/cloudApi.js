import axios from '@/plugins/axios'
import * as SessionTool from '@/util/sessionTool'

export const PRODUCT_TYPE = {
  BLUE: 'blue', // 蓝标
  MASTER: 'master', // 大师
  KIDS: 'kids', // Kids
  MAINTO: 'mainto' // 缦图
}

export const PriductName = {
  [PRODUCT_TYPE.BLUE]: '蓝标',
  [PRODUCT_TYPE.MASTER]: '大师',
  [PRODUCT_TYPE.KIDS]: 'Kids',
  [PRODUCT_TYPE.MAINTO]: '缦图'
}

/**
 * @description 获取云端全部产品
 * @param {*} params 
 */
export async function getCloudProductApi () {
  const cacheProductData = SessionTool.getProductList()
  if (cacheProductData) return Object.freeze(cacheProductData)
  
  const { msg } = await axios({
    url: `${process.env.VUE_APP_BASE_URL}/project_cloud/common/getAllProduct`,
    method: 'GET'
  })

  const createData = {
    [PRODUCT_TYPE.BLUE]: [],
    [PRODUCT_TYPE.MASTER]: [],
    [PRODUCT_TYPE.KIDS]: [],
    [PRODUCT_TYPE.MAINTO]: []
  }
  msg.forEach(productItem => {
    createData[productItem.retouch_standard].push({
      label: `${productItem.name}|${PriductName[productItem.retouch_standard]}`,
      value: `${productItem.name}|${productItem.id}`
    })
  })
  SessionTool.setProductList(createData)
  return Object.freeze(createData)
}
