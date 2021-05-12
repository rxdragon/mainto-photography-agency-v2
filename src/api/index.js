/**
 * api接口的统一出口
 */
import user from './user'
import work from './work'
import product from './product'
import manage from './manage'
import custom from './custom'
import upyun from './upyun'

export default {
  user,
  work,
  product,
  manage,
  custom,
  upyun
}
