<template>
	<Breadcrumb class="app-breadcrumb" separator="/">
		<BreadcrumbItem
			v-for="item in breadCrumbList"
			:to="item.to"
			:key="item.name"
		>
			<common-icon :iconClass="item.icon" :iconSize="15" />
			{{ item.meta.title }}
		</BreadcrumbItem>
	</Breadcrumb>
</template>

<script>
import CommonIcon from '_c/CommonIcon';
import { mapState } from 'vuex';
export default {
	name: 'bread-crumb',
	components: {
		CommonIcon,
	},
	computed: {
		...mapState({ breadCrumbList: (state) => state.app.breadCrumbList }),
	},
};
</script>

<style lang="less" scoped>
.app-breadcrumb {
	width: 100%;
	display: flex;
	align-items: center;
}
</style>
