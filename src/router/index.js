import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import Layout from '@/layout'

Vue.use(Router)

// 基础权限路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  }, {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    hidden: true
  }, {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/home.vue'),
        meta: { title: '首页', icon: 'iconfont icongailan', affix: true }
      }
    ]
  }, {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }, {
    path: '*',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
=======

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/work',
    component: Layout,
    redirect: '/work/upload',
    name: 'Work',
    meta: { title: '照片上传', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/work/upload'),
        meta: { title: '上传拍摄', icon: 'table' }
      },
      {
        path: 'record',
        name: 'Record',
        component: () => import('@/views/work/record'),
        meta: { title: '上传历史记录', icon: 'tree' }
      }
    ]
  },

  {
    path: '/customs',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/customs/index'),
        meta: { title: '客片中心', icon: 'nested' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 根据用户权限进行不同侧边栏生成
 */
export const asyncRoutes = [
  {
    path: '/product',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/product/index'),
        meta: { title: '产品管理', icon: 'form', role: ['admin', 'master'] }
      }
    ]
  },

  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/manageAccount',
    name: 'Manage',
    alwaysShow: true,
    meta: { title: '管理中心', icon: 'el-icon-s-help', role: ['admin', 'master'] },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/manage/index'),
        meta: { title: '子账户管理', icon: 'table', role: ['admin', 'master'] }
      }
    ]
  },

  {
    path: '/manage/manageAccount',
    component: Layout,
    children: [
      {
        path: 'manageAccount',
        name: 'ManageAccount',
        component: () => import('@/views/manage/account'),
        meta: { hidden: true, role: ['admin', 'master'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

<<<<<<< HEAD
// url不变强制刷行
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
=======
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
}

export default router
