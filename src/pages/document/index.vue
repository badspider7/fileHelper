<template>
	<div class="index">
		<div class="header">
			<div class="left">文件</div>
			<div class="right">
				<div class="addFile">
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
			<div class="options">
				<div class="block" @click="switchTab('block')">
					<SvgIcon name="folderBlock" :class="[activeTab == 'block' ? 'switch_active' : '']"></SvgIcon>
				</div>
				<div class="list" @click="switchTab('list')">
					<SvgIcon name="folderList" :class="[activeTab == 'list' ? 'switch_active' : '']"></SvgIcon>
				</div>
			</div>
		</div>
		<div class="container" v-if="fileList.length !== 0">
			<div class="folder_item" v-for="(item, index) in fileList" :key="index">
				<SvgIcon name="folder" class="folder_icon"></SvgIcon>
				<div class="folder_name">{{ item }}</div>
			</div>
		</div>
		<n-empty description="一个文件都没有" v-else>
			<template #extra>
				<n-button size="small" @click="openFileExplorer">添加文件夹</n-button>
			</template>
		</n-empty>
	</div>
</template>

<script lang="ts" setup>
import { FolderAdd28Regular } from "@vicons/fluent";
import { reactive, ref } from "vue";
//文件展示切换按钮
const activeTab = ref("list");
const switchTab = (type: string) => {
	activeTab.value = type;
};
let fileList: string[] = reactive([]);
//添加文件
const openFileExplorer = async () => {
	const filePathContainer = await window.renderApi.openFile();
	if (filePathContainer) {
		fileList.push(filePathContainer);
	}
	console.log("fileList", fileList);
};
</script>
<style lang="scss" scoped>
.index {
	position: relative;
	padding: 10px;
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
			.addFile {
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
				// border: 1px solid transparent;
			}
			.block {
				height: 30px;
				svg {
					border: 1px solid transparent;
					// width: 25px;
					// height: 25px;
				}
			}
			.list {
				// border: 1px solid transparent;
				height: 30px;
				svg {
					border: 1px solid transparent;
				}
			}
		}
		.switch_active {
			background-color: #7aae6538;
			border-radius: 5px;
			border: 1px solid rgb(104 174 101) !important;
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
