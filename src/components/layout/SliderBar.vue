<template>
	<div class="slkeyer_bar">
		<n-menu :options="featureList" :value="checkedMenu" @update:value="handleUpdateValue" />
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, h, watch, Component } from "vue";
import { useMessage, type MenuOption, NIcon } from "naive-ui";
import { RouterLink, useRouter } from "vue-router";
import {
	TasksApp24Regular,
	CalendarLtr16Regular,
	DocumentEndnote24Regular,
	TaskListSquareLtr20Regular,
	Archive16Regular,
	Bookmark16Regular,
	CalligraphyPen20Regular,
	CalligraphyPenCheckmark20Regular
} from "@vicons/fluent";
const router = useRouter();
const message = useMessage();

function renderIcon(icon: Component) {
	return () => h(NIcon, null, { default: () => h(icon) });
}

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
		key: "index",
		icon: renderIcon(Bookmark16Regular)
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
		key: "folders",
		icon: renderIcon(Archive16Regular)
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
								name: "todo"
							}
						},
						{ default: () => "待办" }
					),
				key: "done",
				icon: renderIcon(CalligraphyPen20Regular)
			},
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
				key: "todo",
				icon: renderIcon(CalligraphyPenCheckmark20Regular)
			}
		],
		icon: renderIcon(TaskListSquareLtr20Regular)
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
		key: "calendar",
		icon: renderIcon(CalendarLtr16Regular)
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
				{ default: () => "日志" }
			),
		key: "message",
		icon: renderIcon(DocumentEndnote24Regular)
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

watch(
	() => router.currentRoute.value.path,
	(newVal, oldVal) => {
		handleUpdateValue(newVal.replace("/", ""));
		// console.log("router", newVal);
		// checkedMenu.value = newVal.replace("/", "");
	}
);
checkedMenu.value = "index";

const handleUpdateValue = (key: string) => {
	if (key == "") {
		checkedMenu.value = "index";
	} else {
		checkedMenu.value = key;
	}
};
</script>
<style lang="scss" scoped>
.slkeyer_bar {
	height: 100%;
}
</style>
