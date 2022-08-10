<template>
	<component
		:is="iconType"
		:type="iconName"
		:color="iconColor"
		:size="iconSize"
	/>
</template>

<script>
import Icons from '@/icons';
export default {
	name: 'CommonIcon',
	components: { Icons },
	props: {
		iconClass: {
			type: String,
			required: true,
		},
		iconColor: {
			type: String,
			default: '',
		},
		iconSize: {
			type: Number,
			default: 16,
		},
	},
	computed: {
		iconType() {
			console.log(this.iconClass, 'this.iconClass.indexOf');
			return this.iconClass.indexOf('_') === 0 ? 'Icons' : 'Icon';
		},
		iconName() {
			return this.iconType === 'Icons'
				? this.getCustomIconName(this.iconClass)
				: this.iconClass;
		},
	},
	methods: {
		getCustomIconName(iconName) {
			console.log(iconName.slice(1));
			return iconName.slice(1);
		},
	},
};
</script>

<style></style>
