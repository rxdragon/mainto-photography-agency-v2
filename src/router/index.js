import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout.vue' // 产品中心

import manageCenter from './modules/manageCenter.js' // 订单管理
import productManagement from './modules/productManagement.js'

Vue.use(Router) // 订单管理

// 基础权限路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/redirect.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/home.vue'),
        meta: { title: '首页', icon: 'iconfont icongailan' }
      }
    ]
  },
  {
    path: '/photo_upload',
    component: Layout,
    redirect: '/photo_upload/upload_photo',
    meta: { title: '照片上传', icon: '' },
    alwaysShow: true,
    children: [
      {
        path: 'upload_photo',
        name: 'photoUpload',
        component: () => import('@/views/photo_upload/photoUpload.vue'),
        meta: { title: '上传照片', icon: '' }
      },
      {
        path: 'upload_record',
        name: 'uploadRecord',
        component: () => import('@/views/photo_upload/uploadRecord.vue'),
        meta: { title: '上传历史记录', icon: '' }
      },
      {
        path: 'record_detail',
        name: 'recordDetail',
        component: () => import('@/views/photo_upload/recordDetail.vue'),
        meta: { title: '历史详情', icon: '' },
        hidden: true
      }
    ]
  },
  {
    path: '/custom',
    component: Layout,
    redirect: '/custom/custom',
    children: [
      {
        path: 'custom',
        name: 'Custom',
        component: () => import('@/views/custom/custom.vue'),
        meta: { title: '客片中心', icon: '' }
      },
      {
        path: 'custom_detail',
        name: 'customDetail',
        component: () => import('@/views/custom/customDetail.vue'),
        meta: { title: '客片详情', icon: '' },
        hidden: true
      }
    ]
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '*',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  }
]

export const asyncRoutes = [
  manageCenter,
  productManagement
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// url不变强制刷行
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
