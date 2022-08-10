<template>
	<div class="icon-wrapper">
		<svg
			:class="['svg-icon', svgClass]"
			:style="svgStyle"
			aria-hidden="true"
		>
			<use :xlink:href="iconName"></use>
		</svg>
	</div>
</template>

<script>
const importAll = (requireContext) =>
	requireContext.keys().forEach(requireContext);
try {
	importAll(require.context('./svg', false, /\.svg$/));
} catch (error) {
	console.log(error);
}
export default {
	name: 'svg-icon',
	props: {
		type: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: '',
		},
		size: {
			type: Number,
			default: 16,
		},
	},

	computed: {
		iconName() {
			console.log(this.type, 'ssssssssssssssss');
			return `#icon-${this.type}`;
		},
		svgClass() {
			return this.type;
		},
		svgStyle() {
			let style = '';
			if (this.size) {
				style = `width:${this.size}px;height:${this.size}px`;
			}
			if (this.color) {
				style += `color:${this.color};`;
			}
			return style;
		},
	},
	created() {
		console.log(this.type, 'iconClass');
	},
};
</script>

<style lang="less">
.icon-wrapper {
	display: inline-block;
}
.svg-icon {
	width: 100%;
	height: 100%;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
