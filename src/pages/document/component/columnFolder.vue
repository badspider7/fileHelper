<template>
	<div class="column_f">
		<SvgIcon :name="category" class="folder_icon"></SvgIcon>
		<span>{{ folderName }}</span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps(["folderName", "category"]);
</script>

<style lang="scss" scoped>
.column_f {
	display: flex;
	align-items: center;
	cursor: pointer;
	svg {
		flex-shrink: 0;
	}
	span {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.folder_icon {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}
}
</style>
