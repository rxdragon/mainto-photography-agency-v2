// eslint-disable-next-line no-unused-vars
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * @param roles // 权限
 * @param route // 路由
 */
function hasPermission (roles, route) {
  return roles.includes(route.name)
}

/**
 * 过滤含有权限路由
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: [],
  personageRouters: [],
  roles: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERSONAGE_ROUTES: (state, routes) => {
    state.personageRouters = routes
  }
}

const actions = {
  // 判断动态路由
  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = []
      let newRolesArr = []
      let newPermissionArr = []
      const baseRoute = ['Home', 'photoUpload', 'uploadRecord', 'recordDetail', 'Customs',
        'customDetail', 'manage', 'account', 'product', 'productDetail', 'addProduct']
      // const allRoute = ['manage', 'account', 'product', 'productDetail', 'addProduct']
      // 全部权限列表
      newPermissionArr = [...baseRoute]
      const componentNames = [...baseRoute]
      newRolesArr = [...newRolesArr, ...componentNames]

      commit('SET_ROLES', newPermissionArr)
      newRolesArr = [...new Set(newRolesArr)]
      accessedRoutes = [...filterAsyncRoutes(asyncRoutes, newRolesArr)]
      commit('SET_PERSONAGE_ROUTES', accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
