import { createRouter, createWebHistory } from 'vue-router';
import layout from '@/layout';
// import ParentView from '_c/ParentView';
const { baseRoute } = require('../set/index.js');
import store from '@/store';
/**
 * 路由中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面会缓存 页面name需要和路由名一致
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */
const route = [
	//首页
	{
		path: '/',
		redirect: '/home',
		component: layout,
		children: [
			{
				path: '/home',
				name: 'home',
				meta: {
					title: '首页',
					icon: '_qq',
				},
				component: () => import('_v/Home'),
			},
		],
	},
	//无效的路由地址
	{
		path: '/:catchAll(.*)',
		redirect: '/home',
		meta: {
			hideInMenu: true,
		},
	},
];
let contextList = require.context('../router', true, /\/router-list\.js$/);
let routerList = contextList.keys().map((item) => contextList(item).default || contextList(item));
let list = [];
routerList.forEach((element) => {
	list = list.concat(element);
});
let aaa = route.concat(list);
console.log(aaa, list);
const router = createRouter({
	history: createWebHistory(baseRoute),
	routes: aaa,
});
console.log(router, 'sssssssss');
store.commit('setHomeRoute', aaa); //获取信息概览路由信息
store.commit('setMenuList', aaa); //获取侧边栏路由列表
export default router;
