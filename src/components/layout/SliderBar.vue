<template>
	<div class="slkeyer_bar">
		<n-menu :options="featureList" :value="checkedMenu" @update:value="handleUpdateValue" />
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, h, watch } from "vue";
import { useMessage, type MenuOption } from "naive-ui";
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
const message = useMessage();
const featureList: object[] = reactive([
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: "index"
					}
				},
				{ default: () => "仪表盘" }
			),
		key: "index"
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: "folders"
					}
				},
				{ default: () => "文件" }
			),
		key: "folders"
	},
	{
		label: "任务",
		key: "task",
		children: [
			{
				label: () =>
					h(
						RouterLink,
						{
							to: {
								name: "done"
							}
						},
						{ default: () => "已办" }
					),
				key: "todo"
			},
			{
				label: () =>
					h(
						RouterLink,
						{
							to: {
								name: "todo"
							}
						},
						{ default: () => "待办" }
					),
				key: "done"
			}
		]
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: "calendar"
					}
				},
				{ default: () => "日历" }
			),
		key: "calendar"
	},
	{
		label: () =>
			h(
				RouterLink,
				{
					to: {
						name: "message"
					}
				},
				{ default: () => "消息" }
			),
		key: "message"
	}
]);

let checkedMenu = ref("");
watch(checkedMenu, (newVal, oldVal) => {
	if (newVal != oldVal) {
		// 切换菜单
		router.push({
			name: newVal
		});
	}
});
checkedMenu.value = "index";

const handleUpdateValue = (key: string, item: MenuOption) => {
	checkedMenu.value = key;
};
</script>
<style lang="scss" scoped>
.slkeyer_bar {
	height: 100%;
}
</style>
