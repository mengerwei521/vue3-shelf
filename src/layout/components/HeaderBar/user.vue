<template>
	<Dropdown class="user" @on-click="handleClick">
		<div class="user-details">
			<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
			<div class="user-name">啊</div>
			<Icon class="user-icon" font-size="20" type="ios-arrow-down"></Icon>
		</div>
		<template #list>
			<DropdownMenu>
				<DropdownItem name="logout">退出登录</DropdownItem>
			</DropdownMenu>
		</template>
	</Dropdown>
</template>

<script>
export default {
	name: 'user',
	methods: {
		//退出登录
		logout() {},
		//点击菜单项时触发
		handleClick(name) {
			switch (name) {
				case 'logout':
					this.logout();
					break;
			}
		},
	},
};
</script>

<style lang="less" scoped>
.user {
	/deep/.ivu-dropdown-rel {
		height: 100%;
	}
	.user-details {
		height: 100%;
		display: flex;
		align-items: center;
		.user-name {
			margin-left: 10px;
		}
		.user-icon {
			margin-left: 5px;
		}
	}
}
</style>
