<template>
	<div class="index">
		<div class="header">
			<div class="left">文件</div>
			<div class="right">
				<div class="addFile" @click="openFileExplorer('file')">
					<DocumentAdd24Regular />
				</div>
				<div class="addFolder" @click="openFileExplorer('folder')">
					<FolderAdd28Regular />
				</div>
			</div>
		</div>
		<n-divider />
		<div class="top">
			<div class="title">
				<n-breadcrumb>
					<n-breadcrumb-item> 全部文件</n-breadcrumb-item>
					<n-breadcrumb-item> altv-plugin</n-breadcrumb-item>
					<n-breadcrumb-item> plugins</n-breadcrumb-item>
				</n-breadcrumb>
			</div>
			<!-- <div class="options">
				<div class="block" @click="switchTab('block')">
					<SvgIcon name="folderBlock" :class="[activeTab == 'block' ? 'switch_active' : '']"></SvgIcon>
				</div>
				<div class="list" @click="switchTab('list')">
					<SvgIcon name="folderList" :class="[activeTab == 'list' ? 'switch_active' : '']"></SvgIcon>
				</div>
			</div> -->
		</div>
		<div class="container">
			<FileTable :file-list="fileList" v-if="flag" @sortFileInfo="sort"></FileTable>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { FolderAdd28Regular, DocumentAdd24Regular } from "@vicons/fluent";
import { reactive, ref, onBeforeMount, watch } from "vue";
import FileTable from "./Table.vue";
import fileApi from "../../api/fileApi";

interface FileListType {
	key: number;
	folderName: string;
	remarks: string;
	size: string;
	category: string;
	lastModify: string;
}
let fileList: any = ref([]);
let flag = ref(false);
onBeforeMount(async () => {
	const list = await fileApi.getAllFiles({ start: 0, size: 50 });
	flag.value = true;
	fileList.value = list;
});
//标准时间格式化
const newDate = (time: string) => {
	let date = new Date(time);
	let y = date.getFullYear();
	let m: string | number = date.getMonth() + 1;
	m = m < 10 ? "0" + m : m;
	let d: string | number = date.getDate();
	d = d < 10 ? "0" + d : d;
	let h: string | number = date.getHours();
	h = h < 10 ? "0" + h : h;
	let minute: string | number = date.getMinutes();
	minute = minute < 10 ? "0" + minute : minute;
	let s: string | number = date.getSeconds();
	s = s < 10 ? "0" + s : s;
	return y + "/" + m + "/" + d + " " + h + ":" + minute + ":" + s;
};

//文件大小格式化
const sizeUnit = ["B", "KB", "MB", "GB", "TB"];
const formatSize = (fileSizeInBytes) => {
	if (fileSizeInBytes === 0) return "0B";
	const sizeType = parseInt(Math.floor(Math.log(fileSizeInBytes) / Math.log(1024)).toString());
	const size = (fileSizeInBytes / Math.pow(1024, sizeType)).toFixed(2);
	return size + sizeUnit[sizeType];
};
//文件展示切换按钮
// const activeTab = ref("list");
// const switchTab = (type: string) => {
// 	activeTab.value = type;
// };

//判断文件类型
const fileCategory = [
	{
		suffix: ".js",
		category: "js"
	},
	{
		suffix: ".pptx",
		category: "ppt"
	},
	{
		suffix: ".text",
		category: "txt"
	},
	{
		suffix: ".txt",
		category: "txt"
	},
	{
		suffix: ".docx",
		category: "word"
	},
	{
		suffix: ".doc",
		category: "word"
	},
	{
		suffix: ".xlsx",
		category: "excel"
	},
	{
		suffix: ".htm",
		category: "html"
	},
	{
		suffix: ".html",
		category: "html"
	}
];
const iconName = ref("folder");
const judgeFileCate = (fileInfo) => {
	if (fileInfo.isDirectory) {
		iconName.value = "folder";
	} else {
		const suffix = fileInfo.name.slice(fileInfo.name.lastIndexOf(".")).toLowerCase();
		for (let item of fileCategory) {
			if (suffix == item.suffix) {
				iconName.value = item.category;
				return;
			} else {
				iconName.value = "unknow";
			}
		}
	}
};
//添加文件
const openFileExplorer = async (type: string) => {
	const fileInfo = await window.renderApi.openFile(type);
	if (fileInfo) {
		iconName.value = "";
		judgeFileCate(fileInfo);
		fileApi.addFile({
			folderName: fileInfo.name,
			remarks: "",
			size: fileInfo.isDirectory ? "-" : formatSize(fileInfo.size),
			category: iconName.value,
			lastModify: newDate(fileInfo.modifiedAt),
			Directory: fileInfo.isDirectory ? "文件夹" : "文件"
		});
		const list = await fileApi.getAllFiles({ start: 0, size: 50 });
		fileList.value = list;
		// fileList.push({
		// 	key: 0,
		// 	folderName: fileInfo.name,
		// 	remarks: "",
		// 	size: fileInfo.isDirectory ? "-" : formatSize(fileInfo.size),
		// 	category: iconName.value,
		// 	lastModify: newDate(fileInfo.modifiedAt),
		// 	Directory: fileInfo.isDirectory ? "文件夹" : "文件"
		// });
		// fileList.forEach((item: FileListType, index: number) => {
		// 	item.key = index;
		// });
	}
};

//排序：文件夹在前
const folderUp = (files) => {
	return files.value.sort((a, b) => {
		if (a.Directory === "文件夹" && b.Directory === "文件夹") {
			return a.folderName.localeCompare(b.folderName);
		} else if (a.Directory === "文件夹") {
			return -1;
		} else if (b.Directory === "文件夹") {
			return 1;
		} else {
			return a.folderName.localeCompare(b.folderName);
		}
	});
};
//排序: 文件在前
const fileUp = (files) => {};

const sort = (type) => {
	console.log("paixu", type);
	if (type == "on") {
		fileList.value = folderUp(fileList);
	} else {
	}
};
</script>

<style lang="scss" scoped>
.index {
	position: relative;
	padding: 10px 20px;
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// padding: 0 40px;
		.left {
			font-size: 20px;
			font-weight: 500;
		}
		.right {
			display: flex;
			flex-direction: row;
			gap: 10px;
			.addFile,
			.addFolder {
				width: 30px;
				height: 30px;
				color: #655e59;
				font-weight: 200;
				cursor: pointer;
			}
		}
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		.options {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-around;
			width: 80px;
			height: 40px;
			border-radius: 5px;
			&:hover {
				box-shadow: 0 0 10px #e6ecfa;
			}
			div {
				cursor: pointer;
			}
			.block {
				height: 30px;
				svg {
					border: 1px solid transparent;
					transition: all 0.3s;
				}
			}
			.list {
				height: 30px;
				svg {
					border: 1px solid transparent;
					transition: all 0.3s;
				}
			}
		}
		.switch_active {
			background-color: #7aae6538;
			border-radius: 5px;
			border: 1px solid rgb(104 174 101) !important;
			fill: rgb(104 174 101);
			path {
				fill: rgb(104 174 101) !important;
			}
		}
	}
	.n-divider {
		margin: 10px 0;
	}
	.container {
		.folder_item {
			display: flex;
			align-items: center;
		}
	}
	.n-empty {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
:global(.svg-raw) {
	width: 30px;
	height: 30px;
}
</style>
