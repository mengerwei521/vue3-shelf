export default {
    methods: {
        //线上路由标题
        showTitle(route) {
            let title = '';
            if (route.meta && route.meta.title) {
                if (typeof route.meta.title === 'function') {
                    title = route.meta.title(route)
                } else {
                    title = route.meta.title
                }
            } else {
                title = route.name
            }
            return title
        },
        //路由模块中是否含有子集且子集数组长度大于等于1
        showChildren(route) {
            return route.children && route.children.length >= 1
        },
        //获取路由模块中的name或者href
        getNameOrHref(route) {
            console.log(route, 'route')
            return route.href ? route.href : route.name
        },

    }
}