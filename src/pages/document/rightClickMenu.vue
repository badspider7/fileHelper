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
import { useMessage, useDialog } from "naive-ui";
import { ref, h, inject } from "vue";
import fileApi from "@/api/fileApi";
import useFileStore from "@/store/fileSystem";
const store = useFileStore();
const message = useMessage();
const dialog = useDialog();
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
	let fileInfo = JSON.parse(props.rowInfo);
	if (key === "delete") {
		handlerClickDeleteFile(fileInfo);
	} else if (key == "addBackup") {
		handlerClickAddBackup(fileInfo);
	} else if (key == "openWithFolder") {
		handlerClickOpenOnFolder(fileInfo);
	} else if (key == "openWithVscode") {
		handlerClickOpenOnVscode(fileInfo);
	}
};

//删除文件
const handlerClickDeleteFile = (fileInfo) => {
	dialog.warning({
		title: "警告",
		// `确定删除文件${fileInfo.folderName}，删除后无法恢复`
		content: () => h("div", ["确定删除文件", h("span", { style: { color: "#57B8AA" } }, fileInfo.folderName)]),
		positiveText: "确定",
		negativeText: "取消",
		closeOnEsc: false,
		maskClosable: false,
		onPositiveClick: () => {
			fileApi.deleteFile(JSON.parse(props.rowInfo).key);
			store.getFileList();
			message.success("删除成功");
		},
		onNegativeClick: () => {
			message.warning("取消删除");
		}
	});
};
//在文件夹打开选中的文件
const handlerClickOpenOnFolder = (fileInfo) => {
	fileApi.openOnFolder(fileInfo.filePath);
};

//用vscode打开选中的文件
const handlerClickOpenOnVscode = (fileInfo) => {
	fileApi.openOnVscode(fileInfo.filePath);
};

//添加备注
const handlerClickAddBackup = (fileInfo) => {
	// let res = inject("handleOnClick");
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
