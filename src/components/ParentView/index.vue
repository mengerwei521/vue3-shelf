<template>
	<keep-alive :include="cachedRouteList">
		<router-view />
	</keep-alive>
</template>
<script>
import { mapState } from 'vuex';
export default {
	name: 'parent-view',
	data() {
		return {};
	},
	computed: {
		...mapState({
			cachedRouteList: (state) => state.app.cachedRouteList,
		}),
	},
};
</script>
