<template>
	<div class="header">
		<div class="left">
			<div class="icon" @click="goHome">
				<img src="/logo.svg" alt="" />
			</div>
			<div class="username">{{ username }}</div>
			<div class="pull_down">
				<ChevronUpDown20Regular />
			</div>
		</div>
		<div class="middle">
			<div class="search">
				<n-input clearable v-model:value="value" type="text" placeholder="搜索(ctrl+k)" />
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
import { Dismiss16Regular, Maximize16Regular, Subtract16Regular, ChevronUpDown20Regular } from "@vicons/fluent";
import { useRouter } from "vue-router";
const router = useRouter();
//右上角操作
const minimizeHandler = () => {
	window.ipcRenderer.invoke("titleBarControl:minimize");
};
const maxmizeHandler = () => {
	window.ipcRenderer.invoke("titleBarControl:maximizeOrUnmaximize");
};
const closeHandler = () => {
	window.ipcRenderer.invoke("titleBarControl:close");
};

const value: string | null = ref(null);
const username: string = ref("badspider");

//返回首页
const goHome = () => {
	router.push({ name: "done" });
	console.log(router);
};
</script>
<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px 15px;
	height: 40px;
	-webkit-user-select: none; //文本不可选中
	-webkit-app-region: drag; //设置为可拖拽
	background-color: rgb(110, 180, 109);
	.left {
		display: flex;
		justify-content: center;
		align-items: center;
		-webkit-app-region: no-drag;
		border-radius: 5px;
		padding: 2px 15px;
		&:hover {
			background-color: #e3e1e1;
			border-radius: 5px;
			padding: 2px 15px;
			cursor: pointer;
		}
		.icon {
			width: 40px;
			height: 40px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.username {
			margin: 0 30px 0 10px;
		}
		.pull_down {
			height: 20px;
			cursor: pointer;
			svg {
				height: 100%;
				width: 20px;
			}
		}
	}
	.middle {
		position: relative;
		width: 204px;
		height: 100%;
		margin-left: -10%;
		-webkit-app-region: no-drag;
		.search {
			display: flex;
			flex-flow: row nowrap;
			width: 204px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			transition: all 0.2s ease;
		}

		.search:has(div input:focus) {
			width: 240px !important;
		}
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
			display: flex;
			justify-content: center;
			align-items: center;
			width: 30px;
			height: 30px;
			cursor: pointer;
			-webkit-app-region: no-drag;
			border-radius: 5px;
		}
		#minimize:hover {
			background-color: rgba(255, 255, 255, 0.45);
		}

		#maxMize:hover {
			background-color: rgba(255, 255, 255, 0.45);
		}

		#close:hover {
			background-color: rgba(255, 255, 255, 0.45);
		}
	}
}
</style>
