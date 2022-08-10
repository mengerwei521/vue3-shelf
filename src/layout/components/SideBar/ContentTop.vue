<template>
	<div class="content-top">
		<Tooltip
			transfer
			:content="title"
			placement="right"
			:key="`drop-menu-${routeItem.name}`"
		>
			<a
				@click="jumpEvent"
				:class="['drop-menu-a', { select: isSelect }]"
			>
				<common-icon v-if="icon" :iconClass="icon" :iconSize="25" />
			</a>
		</Tooltip>
	</div>
</template>

<script>
import mixin from './mixin';
import CommonIcon from '_c/CommonIcon';
export default {
	name: 'contentp-top',
	mixins: [mixin],
	components: {
		CommonIcon,
	},
	props: {
		routeItem: {
			type: Object,
		}, // 侧边导航栏
	},
	data() {
		return {
			route: {},
		};
	},
	created() {
		this.route =
			this.routeItem.children && this.routeItem.children[0]
				? this.routeItem.children[0]
				: this.routeItem;
	},
	computed: {
		title() {
			return this.showTitle(this.route);
		},
		icon() {
			return this.route.icon;
		},
		isSelect() {
			console.log(this.route, ';dandandandan');
			if (this.$route.name == this.route.name) {
				return true;
			} else {
				return false;
			}
		},
	},
	methods: {
		jumpEvent() {
			let name = this.getNameOrHref(this.route);
			this.$emit('on-click', name);
		},
	},
};
</script>

<style lang="less" scoped>
.content-top {
	/deep/.ivu-tooltip {
		width: 100%;
		.drop-menu-a {
			width: 100%;
			display: inline-block;
			padding: 14px 0;
			text-align: center;
			color: rgba(255, 255, 255, 0.7) !important;
		}

		.select {
			color: #fff !important;
			background: #363e4f;
		}
	}
}
.content-top:hover {
	color: #fff;
	background: #515a6e;
}
</style>
