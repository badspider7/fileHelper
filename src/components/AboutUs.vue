<template>
	<div class="about_us">
		<div class="left">
			<div class="icon">
				<img src="../../public/logo.svg" alt="" />
			</div>
			<div class="name">fileHelper</div>
		</div>
		<div class="right">
			<div class="version">
				<span>版本:V1.0.3</span>
				<div class="update">
					<n-button :loading="loading" @click="handleClick">{{ loadingText }}</n-button>
				</div>
			</div>
			<div class="moreDetail">更多详情：<a href="https://github.com/badspider7">https://github.com/badspider7</a></div>
			<div class="contact">联系我们：1742969779@qq.com</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const loading = ref(false);
const loadingText = ref("检查更新");
const handleClick = () => {
	loading.value = true;
	loadingText.value = "正在检查中";
	setTimeout(() => {
		loading.value = false;
		loadingText.value = "已是最新版本";
	}, 2000);
	console.log("检查更新");
};
</script>
<style lang="scss" scoped>
.about_us {
	display: flex;
	justify-content: center;
	align-items: center;
	.left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.icon {
			width: 100px;
			height: 100px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.name {
			font-size: 18px;
		}
	}
	.right {
		margin-left: 20px;
		.version {
			display: flex;
			align-items: center;
			font-size: 18px;
			.update {
				margin-left: 20px;
			}
		}
		.moreDetail {
			display: flex;
			/* width: 285px; */
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
}
</style>
