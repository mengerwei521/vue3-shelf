<template>
	<div class="layout function_flex">
		<Layout class="main function_flex">
			<side-bar />
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
		return {};
	},
	watch: {
		$route(newRoute) {
			this.setBreadCrumb(newRoute);
			this.addTags();
		},
	},
	mounted() {
		this.setBreadCrumb(this.$route);
		this.getDocumentWidth();

		window.onresize = () => {
			this.getDocumentWidth();
		};
	},
	methods: {
		...mapMutations([
			'setBreadCrumb',
			'getCachedRoute',
			'getSidebarStatus',
		]),
		//记录缓存路由
		addTags() {
			const { name } = this.$route;
			if (name) {
				this.getCachedRoute(this.$route);
			}
			return false;
		},
		//获取窗口高度
		getDocumentWidth() {
			if (document.body.clientWidth <= 960) {
				this.getSidebarStatus(false);
			} else {
				this.getSidebarStatus(true);
			}
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
