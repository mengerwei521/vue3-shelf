<template>
	<div class="header-bar">
		<bread-crumb />
		<user />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import BreadCrumb from './BreadCrumb';
import user from './user';
export default {
	name: 'header-bar',
	components: {
		BreadCrumb,
		user,
	},
	computed: {
		...mapState({ userInfor: (state) => state.user.userInfor }),
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
}
</style>
