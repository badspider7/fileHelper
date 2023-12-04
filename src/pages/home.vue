<template>
	<div class="index">
		<div class="container">
			<SvgIcon name="folder"></SvgIcon>
		</div>
		<n-empty description="一个文件都没有">
			<template #extra>
				<n-button size="small" @click="openFileExplorer">添加文件夹</n-button>
			</template>
		</n-empty>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const fileList = ref<File[]>([]);
//添加文件
const openFileExplorer = async () => {
	const filePathContainer = await window.renderApi.openFile();
	console.log("filePathContainer", filePathContainer);
};
</script>
<style lang="scss" scoped>
.index {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
