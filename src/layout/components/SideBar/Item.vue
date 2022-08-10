<template>
	<div class="item">
		<common-icon v-if="icon" :iconClass="icon" />
		<div class="title">{{ title }}</div>
		<Badge class="unread" v-if="badge_num" :count="badge_num" />
	</div>
</template>

<script>
import CommonIcon from '_c/CommonIcon';
export default {
	name: 'item',
	components: {
		CommonIcon,
	},
	props: {
		icon: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			default: '',
		},
		badge_num: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			show: false,
		};
	},
	created() {
		console.log(this.icon, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		if (this.icon.includes('_')) {
			this.show = true;
			this.icon.slice(1);
		} else {
			this.show = false;
		}
	},
	computed: {
		iconContent() {
			return this.data;
		},
	},
};
</script>

<style lang="less" scoped>
.item {
	display: flex;
	align-items: center;
	.title {
		margin-left: 10px;
	}
	.unread {
		margin-left: 10px;
	}
}
</style>
