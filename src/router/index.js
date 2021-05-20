import Vue from 'vue'
import Router from 'vue-router'

const deafault = () => import('@/views/home.vue')
const uploadPhoto = () => import('@/views/photo-upload/photoUpload.vue')
const uploadRecord = () => import('@/views/photo-upload/record.vue')
const recordDetail = () => import('@/views/photo-upload/recordDetail.vue')
const product = () => import('@/views/product/product.vue')
const productDetail = () => import('@/views/product/productDetail.vue')
const addProduct = () => import('@/views/product/addProduct.vue')
const manage = () => import('@/views/manage/manage.vue')
const manageAccount = () => import('@/views/manage/account.vue')
const custom = () => import('@/views/custom/custom.vue')
const customDetail = () => import('@/views/custom/detail.vue')

Vue.use(Router)

export const routes = [{
  path: '/',
  component: deafault,
  meta: {
    showButton: false
  }
},
{
  path: '/uploadPhoto',
  name: 'uploadPhoto',
  component: uploadPhoto,
  meta: {
    showButton: false
  }
},
{
  path: '/uploadRecord',
  name: 'uploadRecord',
  component: uploadRecord,
  meta: {
    showButton: false
  }
},
{
  path: '/recordDetail',
  name: 'recordDetail',
  component: recordDetail,
  meta: {
    showButton: true
  }
},
{
  path: '/product',
  name: 'product',
  component: product,
  meta: {
    showButton: false
  }
},
{
  path: '/productDetail',
  name: 'productDetail',
  component: productDetail,
  meta: {
    showButton: true
  }
},
{
  path: '/addProduct',
  name: 'addProduct',
  component: addProduct,
  meta: {
    showButton: true
  }
},
{
  path: '/manage',
  name: 'manage',
  component: manage,
  meta: {
    showButton: false
  }
},
{
  path: '/manageAccount',
  name: 'manageAccount',
  component: manageAccount,
  meta: {
    showButton: true
  }
},
{
  path: '/customs',
  name: 'customs',
  component: custom,
  meta: {
    showButton: false
  }
},
{
  path: '/customDetail',
  name: 'customDetail',
  component: customDetail,
  meta: {
    showButton: true
  }
},
{
  path: '*',
  component: deafault
}
]

export default new Router({ routes })
