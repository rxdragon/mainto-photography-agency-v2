import Layout from '@/layout/Layout.vue'

const productManagement = {
  path: '/product',
  component: Layout,
  name: 'product',
  redirect: '/product/product',
  meta: { title: '产品管理', icon: '' },
  children: [
    {
      path: 'product',
      name: 'product',
      component: () => import('@/views/product/product.vue'),
      meta: { title: '产品管理', icon: '' }
    },
    {
      path: 'product_detail',
      name: 'productDetail',
      component: () => import('@/views/product/productDetail.vue'),
      meta: { title: '产品详情', icon: '' },
      hidden: true
    },
    {
      path: 'add_product',
      name: 'addProduct',
      component: () => import('@/views/product/addProduct.vue'),
      meta: { title: '新增产品', icon: '' },
      hidden: true
    }
  ]
}

export default productManagement
