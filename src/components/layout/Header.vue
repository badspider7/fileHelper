<template>
	<div class="header">
		<div class="left">
			<div class="icon">
				<img src="/logo.svg" alt="" />
			</div>
		</div>
		<div class="middle">
			<div class="search">
				<input type="text" placeholder="输入内容" />
			</div>
		</div>
		<div class="right">
			<div class="controls">
				<div id="minimize" @click="minimizeHandler">
					<Subtract16Regular />
				</div>
				<div id="maxMize" @click="maxmizeHandler">
					<Maximize16Regular />
				</div>
				<div id="close" @click="closeHandler">
					<Dismiss16Regular />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Dismiss16Regular, Maximize16Regular, Subtract16Regular } from "@vicons/fluent";
const minimizeHandler = () => {
	window.ipcRenderer.invoke("titleBarControl:minimize");
};
const maxmizeHandler = () => {
	window.ipcRenderer.invoke("titleBarControl:maximizeOrUnmaximize");
};
const closeHandler = () => {
	window.ipcRenderer.invoke("titleBarControl:close");
};
</script>
<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px;
	-webkit-user-select: none; //文本不可选中
	-webkit-app-region: drag; //设置为可拖拽
	background-color: rgb(110, 180, 109);
	.left {
		.icon {
			width: 40px;
			height: 40px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.middle {
	}
	.right {
		.controls {
			display: flex;
			svg {
				width: 14px;
				height: 14px;
			}
		}

		.controls > div {
			width: 30px;
			height: 30px;
			cursor: pointer;
			-webkit-app-region: no-drag;
		}
		#minimize:hover {
			background-color: rgba(255, 255, 255, 0.45);
		}

		#maxMize:hover {
			background-color: rgba(245, 92, 45, 0.45);
		}

		#close:hover {
			background-color: rgba(255, 0, 0, 0.45);
		}
	}
}
</style>
