<template>
	<Dropdown
		class="collapsed-menu"
		ref="dropdown"
		@on-click="handleClick"
		:placement="placement"
	>
		<DropdownItem v-if="hideTitle" class="fu">
			<a
				:class="['drop-menu-a', { select: isSelect }]"
				type="text"
				@mouseover="handleMousemove($event, routeItem)"
				><common-icon v-show="icon" :iconClass="icon" :iconSize="20" />
			</a>
		</DropdownItem>
		<DropdownItem v-if="!hideTitle" class="zi">
			<a
				:class="['drop-menu-a', { select: isSelect }]"
				style="padding: 0 0"
				type="text"
				@mouseover="handleMousemove($event, routeItem)"
			>
				<div class="zi-content">
					<span class="menu-title">{{ showTitle(routeItem) }}</span
					><Icon type="ios-arrow-forward" />
				</div>
			</a>
		</DropdownItem>
		<template #list>
			<DropdownMenu ref="dropdown">
				<template v-for="child in routeItem.children">
					<collapsed-menu
						v-if="showChildren(child)"
						:key="child.name"
						:routeItem="child"
					></collapsed-menu>
					<DropdownItem
						v-else
						:key="`drop-${child.name}`"
						:name="child.href || child.name"
						:class="{ item_select: child.name == $route.name }"
						><span class="menu-title">{{
							showTitle(child)
						}}</span></DropdownItem
					>
				</template>
			</DropdownMenu>
		</template>
	</Dropdown>
</template>

<script>
import mixin from './mixin';
import CommonIcon from '_c/CommonIcon';
export default {
	name: 'collapsed-menu',
	mixins: [mixin],
	props: {
		routeItem: {
			type: Object,
		}, // 侧边导航栏
		hideTitle: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			placement: 'right-end',
		};
	},
	components: {
		CommonIcon,
	},
	computed: {
		title() {
			return this.showTitle(this.routeItem);
		},
		icon() {
			return this.routeItem.icon;
		},
		isSelect() {
			console.log(
				this.forJudge(this.routeItem),
				'this.forJudge(this.routeItem)'
			);
			return this.forJudge(this.routeItem);
		},
	},
	methods: {
		handleClick(name) {
			console.log(name, 'namenamenamenamename');
			// this.$emit('on-click', name);
		},
		//手指离开收起
		handleMousemove(event, children) {
			const { pageY } = event;
			const height = children.length * 38;
			const isOverflow = pageY + height < window.innerHeight;
			this.placement = isOverflow ? 'right-start' : 'right-end';
		},
		//循环判断是否选中
		forJudge(route) {
			console.log(route, 'aaaaaaaaaaaaaaaa');
			if (route.children) {
				let aa = route.children.find(
					(item) => item.name == this.$route.name
				);

				if (aa) {
					return true;
				} else {
					for (
						let index = 0;
						index < route.children.length;
						index++
					) {
						let itemRoute = route.children[index];
						if (this.forJudge(itemRoute)) {
							return true;
						}
					}
				}
			} else {
				if (route.name == this.$route.name) {
					return true;
				} else {
					return false;
				}
			}
		},
	},
};
</script>

<style lang="less" scoped>
.collapsed-menu {
	.fu {
		padding: 0 0;
		.select {
			color: #fff !important;
			background: #363e4f;
		}
	}
	.fu:hover {
		color: #fff;
		background: #515a6e;
	}
	.zi {
		.drop-menu-a {
			text-align: left;
			.zi-content {
				color: #515a6e;
			}
		}
		.select {
			.zi-content {
				color: #2d8cf0;
				.menu-title {
					color: #2d8cf0;
				}
			}
		}
	}
	.drop-menu-a {
		width: 100%;
		display: inline-block;
		padding: 14px 0;
		text-align: center;
		color: rgba(255, 255, 255, 0.7) !important;
		.zi-content {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.menu-title {
				color: #515a6e;
				font-weight: normal;
			}
		}
	}
	.item_select {
		color: #2d8cf0;
		background-color: rgba(45, 140, 240, 0.1);
	}
	/deep/.ivu-select-dropdown {
		.ivu-dropdown-item {
			width: 120px;
			text-align: left;
		}
	}
}
</style>
