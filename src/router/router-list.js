import layout from '@/layout';
import ParentView from '_c/ParentView';
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
export default [
	{
		path: '/doc',
		name: 'doc',
		href: 'http://www.baidu.com',
		meta: {
			title: '文档',
			icon: 'ios-book',
		},
	},

	{
		path: '/about',
		name: 'about',
		component: layout,
		meta: {
			hideInBread: true,
		},
		children: [
			{
				path: 'about_page',
				name: 'about_page',
				meta: {
					title: '关于',
					icon: 'md-albums',
				},
				component: () => import('_v/About'),
			},
		],
	},

	{
		path: '/doctor',
		name: 'doctor',
		meta: {
			title: '医生模块',
			icon: 'md-albums',
		},
		component: layout,
		children: [
			{
				path: 'doctor-list',
				name: 'doctor-list',
				meta: {
					title: '医生列表',
					icon: 'md-albums',
				},
				component: () => import('_v/doctor/doctor-list'),
			},
			{
				path: 'doctor-details',
				name: 'doctor-details',
				meta: {
					title: '医生详情',
					icon: 'md-albums',
				},
				component: () => import('_v/doctor/doctor-details'),
			},
		],
	},

	{
		path: '/patient',
		name: 'patient',
		meta: {
			title: '患者模块',
			icon: 'md-albums',
		},
		component: layout,
		children: [
			{
				path: 'patient-list',
				name: 'patient-list',
				meta: {
					title: '患者列表',
					icon: 'md-albums',
				},
				component: () => import('_v/patient/patient-list'),
			},
			{
				path: 'patient-details',
				name: 'patient-details',
				meta: {
					title: '患者详情',
					icon: 'md-albums',
				},
				component: () => import('_v/patient/patient-details'),
			},
			{
				path: 'warning',
				name: 'warning',
				meta: {
					title: '预警',
					icon: 'md-albums',
				},
				component: ParentView,
				children: [
					{
						path: 'warning-list',
						name: 'warning-list',
						href: 'https://juejin.cn/',
						meta: {
							notCache: true,
							hideInBread: true,
							title: '预警列表',
						},
						component: () => import('_v/patient/warning/warning-list'),
					},
					{
						path: 'warning-details',
						name: 'warning-details',
						meta: {
							title: '预警详情',
						},
						component: () => import('_v/patient/warning/warning-details'),
					},
				],
			},
		],
	},

	{
		path: '/user',
		name: 'user',
		component: layout,
		meta: {
			hideInBread: true,
		},
		children: [
			{
				path: 'user_page',
				name: 'user_page',
				meta: {
					title: (route) => {
						return '用户';
					},
					icon: 'md-albums',
				},
				component: () => import('_v/user/index'),
			},
		],
	},
];
