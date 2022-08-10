import { homeName } from '@/set/index.js';
import { getMenuByRouter, getBreadCrumbList, getHomeRoute } from '@/utils/index.js'

export default {
  state: {
    homeRoute: {},//默认信息概览路由数据
    menuList: [],//侧边栏导航列表
    breadCrumbList: [],//面包屑列表
    cachedRouteList: [],//缓存路由
  },
  mutations: {

    //获取信息概览路由数据
    setHomeRoute(state, routes) {
      console.log(routes, '获取信息概览路由数据')
      state.homeRoute = getHomeRoute(routes, homeName)
      console.log(state.homeRoute)
    },

    //获取侧边栏导航列表
    setMenuList(state, routes) {
      state.menuList = getMenuByRouter(routes)
    },

    //获取面包屑列表
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    //缓存路由
    getCachedRoute(state, route) {
      console.log(route, state.cachedRouteList, state.cachedRouteList.includes(route.name), '缓存路由')
      if (state.cachedRouteList.includes(route.name)) return
      console.log(route, '缓存路由')
      if (route.meta.notCache) {
        state.cachedRouteList.push(route.name)
      }

    }
  },
  actions: {},
  getters: {}
}