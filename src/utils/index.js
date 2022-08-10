
/**
 * @description 用于找到路由列表中name为home的对象
 * @param {Array} routers 路由列表数组
 * @return 
 */
export const getHomeRoute = (routers, homeName = 'home') => {
    let i = -1
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
        let item = routers[i]
        if (item.children && item.children.length) {
            let res = getHomeRoute(item.children, homeName)
            if (res.name) return res
        } else {
            if (item.name === homeName) homeRoute = item
        }
    }
    return homeRoute
}
/**
 * @desc 得到侧边栏菜单列表
 * @param {Array} list 通过路由列表
 * @returns {Array}
 */
export const getMenuByRouter = (list) => {
    let res = []
    list.forEach(item => {
        if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
            let obj = {
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta: item.meta
            }
            if (item.children && item.children.length !== 0) {
                obj.children = getMenuByRouter(item.children)
            }
            if (item.href) obj.href = item.href
            res.push(obj)
        }
    })
    return res
}
/**
 * @desc 得到面包屑菜单列表
 * @param {Array} route 当前路由metched
 * @param {Obj} homeRoute 信息概览路由
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
    let homeItem = { ...homeRoute, icon: homeRoute.meta.icon }
    let routeMetched = route.matched
    if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
    let res = routeMetched.filter(item => {
        return item.meta === undefined || !item.meta.hideInBread
    }).map(item => {
        console.log(item, 'items')
        let meta = { ...item.meta }
        if (meta.title && typeof meta.title === 'function') {
            meta.__titleIsFunction__ = true
            meta.title = meta.title(route)
        }
        let obj = {
            icon: (item.meta && item.meta.icon) || '',//图标
            name: item.name,//路由名
            to: (item.meta && item.meta.to) || '', //触发后跳转的页面路由
            meta: meta
        }
        return obj
    })
    return [{ ...homeItem, to: homeRoute.path }, ...res]
}
