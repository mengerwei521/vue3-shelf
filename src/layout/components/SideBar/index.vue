<template>
	<div class="side-menu">
		<div class="logo"></div>

		<div class="open" v-show="isSidebarStatus">
			<Menu
				ref="menu"
				theme="dark"
				:active-name="$route.name"
				width="auto"
				@on-select="handleSelect"
				accordion
			>
				<side-menu-item
					v-for="route in menuList"
					:key="route.name"
					:routeItem="route"
				/>
			</Menu>
		</div>
		<div class="put-away" v-show="!isSidebarStatus">
			<template v-for="route in menuList">
				<collapsed-menu
					v-if="route.children && route.children.length > 1"
					@on-click="handleSelect"
					:hideTitle="true"
					:key="route.name"
					:routeItem="route"
				></collapsed-menu>
				<content-top
					v-else
					@on-click="handleSelect"
					:key="route.name"
					:routeItem="route"
				>
				</content-top>
			</template>
		</div>
	</div>
</template>

<script>
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
		handleSelect(name) {
			if (name == undefined) return;
			if (
				name.indexOf('https://') !== -1 ||
				name.indexOf('http://') !== -1
			) {
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
	.logo {
		height: 50px;
		flex-shrink: 0;
		background-color: #304156;
	}
	.open {
		width: 200px;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		/deep/.ivu-menu {
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow-x: hidden;
			overflow-y: scroll;
			scrollbar-width: none; /* firefox */
			-ms-overflow-style: none; /* IE 10+ */
			background-color: #304156;
		}
		/deep/.ivu-menu::-webkit-scrollbar {
			display: none; /* Chrome Safari */
		}
		/deep/.ivu-menu-vertical.ivu-menu-light:after {
			display: none;
		}
	}
	.put-away {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;
		width: 60px;
		overflow-x: hidden;
		overflow-y: scroll;
		scrollbar-width: none; /* firefox */
		-ms-overflow-style: none; /* IE 10+ */
		background-color: #304156;
	}
	.put-away::-webkit-scrollbar {
		display: none; /* Chrome Safari */
	}
}
</style>
