<template>
	<div class="logo">
		<div class="item big" v-show="isSidebarStatus">
			<img src="../../../assets/logo.jpg" class="sidebar-logo" />
		</div>
		<div class="item min" v-show="!isSidebarStatus">
			<img src="../../../assets/logo-min.jpg" class="sidebar-logo" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'logo',
	data() {
		return {};
	},
	computed: {
		...mapState({
			isSidebarStatus: (state) => state.app.isSidebarStatus,
		}),
	},
};
</script>

<style lang="less" scoped>
.logo {
	.item {
		height: 50px;
		flex-shrink: 0;
		background-color: #304156;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			height: 85%;
		}
	}
}
</style>
