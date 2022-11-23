<template>
	<div :class="[isSidebarStatus ? 'open-side-bar' : 'hidden-side-bar', 'side-menu']">
		<Logo />
		<div class="open side-bar-item" v-show="isSidebarStatus">
			<Menu ref="menu" theme="dark" :active-name="$route.name" width="auto" @on-select="handleSelect" accordion>
				<side-menu-item v-for="route in menuList" :key="route.name" :routeItem="route" />
			</Menu>
		</div>
		<div class="hidden side-bar-item" v-show="!isSidebarStatus">
			<div class="hidden-content">
				<template v-for="route in menuList">
					<collapsed-menu
						v-if="route.children && route.children.length > 1"
						@on-click="handleSelect"
						:hideTitle="true"
						:key="route.name"
						:routeItem="route"
					></collapsed-menu>
					<content-top v-else @on-click="handleSelect" :key="route.name" :routeItem="route"> </content-top>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import Logo from './Logo';
import SideMenuItem from './SideMenuItem';
import CollapsedMenu from './CollapsedMenu';
import ContentTop from './ContentTop';
import { mapState } from 'vuex';
export default {
	name: 'side-bar',
	data() {
		return {};
	},
	components: {
		Logo,
		SideMenuItem,
		CollapsedMenu,
		ContentTop,
	},

	computed: {
		...mapState({
			menuList: (state) => state.app.menuList,
			isSidebarStatus: (state) => state.app.isSidebarStatus,
		}),
	},
	methods: {
		//菜单栏跳转
		handleSelect(name) {
			if (name == undefined) return;
			if (name.indexOf('https://') !== -1 || name.indexOf('http://') !== -1) {
				window.open(name);
			} else {
				this.$router.push({
					name: name,
				});
			}
		},
	},
};
</script>

<style lang="less" scoped>
.side-menu {
	height: 100%;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.side-bar-item {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
	}
	.open {
		/deep/.ivu-menu {
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow-x: hidden;
			overflow-y: scroll;
			background-color: #304156;
		}
		/deep/.ivu-menu::-webkit-scrollbar {
			display: none; /* Chrome Safari */
		}
		/deep/.ivu-menu-vertical.ivu-menu-light:after {
			display: none;
		}
	}
	.hidden {
		background: #fff;
		.hidden-content {
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow-x: hidden;
			overflow-y: scroll;
			background-color: #304156;
		}
		.hidden-content::-webkit-scrollbar {
			display: none; /* Chrome Safari */
		}
	}
}
.open-side-bar {
	width: 200px;
	transition: width 0.28s;
}
.hidden-side-bar {
	width: 60px;
	transition: width 0.28s;
}
</style>
