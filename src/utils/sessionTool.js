/**
 * @description 清除session缓存
 */
export function removeSession () {
  sessionStorage.clear()
}

/**
 * @description 存储userInfo
 * @param {*} info
 */
export function setProductList (info) {
  const saveKey = 'cloud-product'
  const data = JSON.stringify(info)
  sessionStorage.setItem(saveKey, data)
}

/**
 * @description
 */
export function getProductList () {
  try {
    const saveKey = 'cloud-product'
    const data = sessionStorage.getItem(saveKey)
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}
