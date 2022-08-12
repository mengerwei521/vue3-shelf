module.exports = {
	//停止在父级目录中寻找
	root: true,
	//指定想启用的环境
	env: {
		browser: true, //浏览器全局变量
		es6: true, //启用es6
		node: true, //node.js 全局变量和 node.js作用域
	},
	//启用推荐规则
	extends: ['plugin:vue/vue3-essential', 'plugin:prettier/recommended', '@vue/prettier', 'prettier'],
	//向ESLint规则中添加全局变量
	globals: {
		__dirname: false,
		process: false,
	},
	parserOptions: {
		parser: 'babel-eslint', //解析器
		ecmaVersion: 2018, //支持ECMAScript版本
		sourceType: 'module', //指定来源的类型
	},
	//eslint-plugin-* 相关规则插件
	plugins: ['vue'],
	// 规则配置 "off"或者0//关闭规则关闭  "warn"或者1//在打开的规则作为警告（不影响退出代码） "error"或者2//把规则作为一个错误（退出代码触发时为1）
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', //禁止使用控制台
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', //禁止使用调试器
		'quotes': 'off', //强制一致使用反引号，双引号或单引号
		'no-empty': 'off', //禁止空块语句
		'space-before-function-paren': 'off', //在函数定义左括号之前加强一致的间距
		'eqeqeq': 'off', //需要使用===和！==
		'semi': 'off', //在语句结尾需要分号
		'no-tabs': 'off', //允许使用 tab 字符，包括在注释内
		'spaced-comment': 'off', //在注释中的//或/ *之后强制执行一致的间距
		'no-unused-vars': ['error', { args: 'none' }], //任何地方声明和不使用的变量很可能是由于重构不完全导致的错误
		'no-inner-declarations': 'off', //不允许嵌套块中的变量或函数声明
		'vue/no-unused-components': 'off', //禁止注册不在模板中使用的组件
		'vue/no-parsing-error': 'off', //禁止 `<template>` 中的解析错误
		'prettier/prettier': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/comment-directive': 'off',
		'vue/no-template-key': 'off'
	},
};
