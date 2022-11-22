<template>
	<div class="header-bar">
		<Icons @click="clickSwitch" class="svg-icon" :type="iconName" :size="30" />
		<bread-crumb />
		<user />
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import BreadCrumb from './BreadCrumb';
import Icons from '@/icons';
import user from './user';
export default {
	name: 'header-bar',
	data() {
		return {
			iconName: '',
		};
	},
	components: {
		BreadCrumb,
		user,
		Icons,
	},
	created() {},
	watch: {
		isSidebarStatus: {
			immediate: true,
			deep: true,
			handler(newValue, oldValue) {
				if (1 == 1) {
				}
				this.iconName = newValue == true ? 'put-away' : 'open';
			},
		},
	},
	computed: {
		...mapState({
			menuList: (state) => state.app.menuList,
			isSidebarStatus: (state) => state.app.isSidebarStatus,
		}),
	},
	methods: {
		...mapMutations(['getSidebarStatus']),
		//点击切换
		clickSwitch() {
			console.log(this.iconName, 'this.iconName this.iconName this.iconName ');
			if (this.iconName == 'put-away') {
				this.iconName = 'open';
				this.getSidebarStatus(false);
			} else {
				this.iconName = 'open';
				this.getSidebarStatus(true);
			}
		},
	},
};
</script>

<style lang="less" scoped>
.header-bar {
	flex-shrink: 0;
	padding: 0 25px;
	height: 50px;
	background-color: #fff;
	display: flex;
	align-items: center;
	.svg-icon {
		flex-shrink: 0;
		width: 50px;
		display: flex;
		align-items: center;
	}
}
</style>
