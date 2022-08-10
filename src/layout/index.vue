<template>
	<div class="layout function_flex">
		<Layout class="main function_flex">
			<side-bar :collapsed="collapsed" />
			<Layout class="function_flex">
				<header-bar />
				<Content class="content function_flex">
					<router-view
				/></Content>
				<Footer class="footer-bar">&copy; 凯德尼医疗科技</Footer>
			</Layout>
		</Layout>
	</div>
</template>

<script>
import SideBar from './components/SideBar';
import HeaderBar from './components/HeaderBar';
import { mapMutations } from 'vuex';
export default {
	name: 'layout',
	components: {
		SideBar,
		HeaderBar,
	},
	data() {
		return {
			collapsed: true, //侧边栏是否展示
		};
	},
	watch: {
		$route(newRoute) {
			console.log(newRoute, 'newRoutenewRoute');
			this.setBreadCrumb(newRoute);
			this.addTags();
		},
	},
	mounted() {
		this.setBreadCrumb(this.$route);
		const that = this;
		window.onresize = () => {
			if (document.body.clientWidth <= 960) {
				that.collapsed = false;
			} else {
				that.collapsed = true;
			}
		};
	},
	methods: {
		...mapMutations(['setBreadCrumb', 'getCachedRoute']),
		addTags() {
			const { name } = this.$route;
			console.log(name, 'sssssssssssssssssssss');
			if (name) {
				this.getCachedRoute(this.$route);
			}
			return false;
		},
	},
};
</script>

<style lang="less" scoped>
.main {
	display: flex;
	flex-direction: unset;
	.content {
		margin: 15px;
		border-radius: 5px;
		background-color: #ffff;
	}
	.footer-bar {
		background: #fff;
		border-top: 1px solid #e5e5e5;
		height: 50px;
		padding: 15px 20px;
		box-sizing: border-box;
	}
}
</style>
