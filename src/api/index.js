/**
 * api接口的统一出口
 */
import user from './user/index'
import work from './work/index'
import product from './product/index'
import manage from './manage/index'
import custom from './custom/index'
import upyun from './upyun/index'

export default {
  user,
  work,
  product,
  manage,
  custom,
  upyun
}
