/**
 * @description 清除session缓存
 */
export function removeSession () {
  sessionStorage.clear()
}

/**
 * @description 存储productInfo
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

/**
 * @description 存储userInfo
 * @param {*} info
 */
export function setUserInfo (info) {
  const data = JSON.stringify(info)
  sessionStorage.setItem('userInfo', data)
}

/**
 * @description
 * @param {*} code
 */
export function getUserInfo (code) {
  try {
    const data = sessionStorage.getItem('userInfo')
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}

/**
 * @description 存储用户权限
 * @param {*} permission
 */
export function setUserPermission (permission) {
  const data = JSON.stringify(permission)
  sessionStorage.setItem('userPermission', data)
}

/**
 * @description
 * @param {*} code 获取用户权限
 */
export function getUserPermission () {
  try {
    const data = sessionStorage.getItem('userPermission')
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}

/**
 * @description 获取XStreamId
 * @param {*} params
 */
export function getXStreamId (params) {
  return sessionStorage.getItem('xStreamId')
}

/**
 * @description 存储xStreamId
 * @param {*} code
 */
export function setXStreamId (code) {
  sessionStorage.setItem('xStreamId', code)
}

/**
 * @description 设置登录过期时间
 * @param {*} time
 */
export function setXStreamIdExpireTime (time) {
  sessionStorage.setItem('xStreamIdExpireTime', time)
}

/**
 * @description 获取登录过期时间
 * @param {*} time
 */
export function getStreamIdExpireTime (time) {
  const returnTime = sessionStorage.getItem('xStreamIdExpireTime')
  return returnTime
}
