<template>
	<div class="side-menu-item">
		<template v-if="hasOneShowingChild(routeItem)">
			<MenuItem :name="getNameOrHref(routeObj)" class="dan">
				<item
					:icon="routeObj.icon"
					:title="showTitle(routeObj)"
					:badge_num="routeObj.badge_num"
				/>
			</MenuItem>
		</template>
		<template v-else>
			<Submenu :name="getNameOrHref(routeItem)" class="duo">
				<template #title>
					<item
						:icon="routeItem.icon"
						:title="showTitle(routeItem)"
						:badge_num="badge_num"
					/>
					<div v-if="noReading" class="no-reading"></div>
				</template>

				<side-menu-item
					v-for="child in routeItem.children"
					:key="child.name"
					:routeItem="child"
				/>
			</Submenu>
		</template>
	</div>
</template>

<script>
import Item from './Item';
import mixin from './mixin';
export default {
	name: 'side-menu-item',
	mixins: [mixin],
	props: {
		routeItem: {
			type: Object,
		}, // 侧边导航栏
	},
	data() {
		return {
			badge_num: 0,
			noReading: false,
		};
	},
	components: {
		Item,
	},

	methods: {
		//路由没有子级或只有一个子级 为true 否则为 false
		hasOneShowingChild(route) {
			if (route.children) {
				if (route.children.length === 1) {
					this.routeObj = route.children[0];
					return true;
				} else {
					return false;
				}
			} else {
				this.routeObj = route;
				return true;
			}
			return false;
		},
	},
};
</script>

<style lang="less" scoped>
.side-menu-item {
	.dan {
	}
	.duo {
	}
	/deep/.ivu-menu-opened {
		.ivu-menu-submenu-title {
			background-color: #304156 !important;
		}
	}
}
</style>
