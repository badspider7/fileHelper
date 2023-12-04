<template>
	<div class="header">
		<div class="left">
			<div class="icon" @click="goHome">
				<img src="/logo.svg" alt="" />
			</div>
			<div class="username">{{ username }}</div>
			<div class="pull_down" @click="showProfilePanel()">
				<ChevronUpDown20Regular />
			</div>
		</div>
		<div class="middle">
			<div class="search">
				<n-input clearable v-model:value="value" type="text" placeholder="搜索项目(ctrl+k)" />
			</div>
		</div>
		<div class="right">
			<div class="controls">
				<div id="minimize" @click="minimizeHandler">
					<Subtract16Regular />
				</div>
				<div id="maxMize" @click="maxmizeHandler">
					<Maximize16Regular v-if="!isMaxmize" />
					<CopySelect20Regular v-else />
				</div>
				<div id="close" @click="closeHandler">
					<Dismiss16Regular />
				</div>
			</div>
		</div>
		<ProfilePanel :isShowPanel="isShowPanel" v-show="isShowPanel" @emitShowPanel="showProfilePanel" />
	</div>
</template>

<script setup lang="ts">
import {
	Dismiss16Regular,
	Maximize16Regular,
	Subtract16Regular,
	ChevronUpDown20Regular,
	CopySelect20Regular
} from "@vicons/fluent";
import ProfilePanel from "../ProfilePanel.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
//右上角操作
let isMaxmize = ref(false);
const minimizeHandler = () => {
	window.ipcRenderer.invoke("titleBarControl:minimize");
};
const maxmizeHandler = async () => {
	isMaxmize.value = await window.ipcRenderer.invoke("titleBarControl:maximizeOrUnmaximize");
};
const closeHandler = () => {
	window.ipcRenderer.invoke("titleBarControl:close", "hide");
};

//个人资料面板 bug 用节流函数
let isShowPanel = ref(false);
const throttle = (func: Function, delay: number) => {
	let lastTime = 0;
	return function () {
		const now = Date.now();
		if (now - lastTime > delay) {
			lastTime = now;
			return func();
		}
	};
};

const showProfilePanel = throttle(() => {
	isShowPanel.value = !isShowPanel.value;
}, 500);
// type: 0/1 0--自己触发   1-- 子组件触发
// const showProfilePanel = (type: number) => {
// 	let x = throttle(() => {
// 		console.log("11111");
// 		isShowPanel.value = !isShowPanel.value;
// 	}, 1000);
// 	x();
// 	// if (type == 0) {
// 	// 	isShowPanel.value = !isShowPanel.value;
// 	// 	console.log("isShowPanel.value", isShowPanel.value);
// 	// } else {
// 	// 	isShowPanel.value = false;
// 	// }
// };

const value = ref(null);
const username = ref("badspider");

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
	// background-color: rgb(110, 180, 109);
	background-image: radial-gradient(circle at 100%, transparent 0%, #d9b3ff 30%, transparent 100%);
	.left {
		display: flex;
		justify-content: center;
		align-items: center;
		-webkit-app-region: no-drag;
		border-radius: 5px;
		padding: 2px 15px;
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
			height: 30px;
			width: 30px;
			border-radius: 5px;
			cursor: pointer;

			svg {
				height: 100%;
				width: 20px;
				&:hover {
					animation: rotateIcon 1s ease-in-out 0.1s;
				}
			}
			&:hover {
				background-color: rgba(255, 255, 255, 0.45);
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

@keyframes rotateIcon {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
