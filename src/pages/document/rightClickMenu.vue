<template>
	<div class="fileOptions">
		<n-dropdown
			placement="bottom-start"
			trigger="manual"
			:x="position.x"
			:y="position.y"
			:options="clickMenu"
			:show="showDropdown"
			size="small"
			:on-clickoutside="onClickoutside"
			@select="handleSelect" />
	</div>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { ref, h } from "vue";
import fileApi from "@/api/fileApi";
import useFileStore from "@/store/fileSystem";
const store = useFileStore();
const message = useMessage();
const props = defineProps({
	position: {
		type: Object,
		required: true
	},
	rowInfo: {
		type: String
	}
});

const showDropdown = ref(false);

const clickMenu = ref([
	{
		label: () => h("span", { style: { fontWeight: "bold" } }, "打开"),
		key: "open"
	},
	{
		label: "查看详情",
		key: "detail"
	},
	{
		label: "用vscode打开",
		key: "openWithVscode"
	},
	{
		label: "在文件夹打开",
		key: "openWithFolder"
	},
	{
		label: "添加备注",
		key: "addBackup"
	},
	{
		label: () => h("span", { style: { color: "red" } }, "删除"),
		key: "delete"
	}
]);
const showContextMenu = () => {
	showDropdown.value = true;
};
const onClickoutside = () => {
	showDropdown.value = false;
};
const handleSelect = (key: string) => {
	showDropdown.value = false;
	if (key === "delete") {
		fileApi.deleteFile(JSON.parse(props.rowInfo).key);
		store.getFileList();
		message.success("删除成功");
	}
};

defineExpose({
	showDropdown,
	showContextMenu
});
</script>
<style lang="scss" scoped>
:global(.n-dropdown-menu) {
	width: fit-content;
}
</style>
