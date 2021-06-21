import Layout from '@/layout/Layout.vue'

const manageCenter = {
  path: '/manage',
  component: Layout,
  name: 'manage',
  redirect: '/manage/manage',
  meta: { title: '管理中心', icon: '' },
  children: [
    {
      path: 'manage',
      name: 'manage',
      component: () => import('@/views/manage/manage.vue'),
      meta: { title: '子账号管理', icon: '' }
    },
    {
      path: 'account',
      name: 'account',
      component: () => import('@/views/manage/account.vue'),
      meta: { title: '添加子账号', icon: '' },
      hidden: true
    }
  ]
}

export default manageCenter
