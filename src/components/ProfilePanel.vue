<template>
	<div class="profilePanel">
		<div class="container">
			<n-dropdown
				placement="bottom-start"
				trigger="manual"
				:x="panelPositionX"
				:y="panelPositionY"
				:options="menu"
				:show="showDropdown"
				:on-clickoutside="onClickoutside"
				@select="handleSelect" />
		</div>
		<!-- <Teleport to="body">
			<div class="_mask" @click="maskEmit" v-show="isShowPanel"></div>
		</Teleport> -->
	</div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch, h } from "vue";
import { useRouter } from "vue-router";
import { useMessage, useDialog } from "naive-ui";
import AboutUs from "./AboutUs.vue";
const message = useMessage();
const dialog = useDialog();
const router = useRouter();

const props = defineProps({
	isShowPanel: {
		type: Boolean,
		default: false
	}
});
const emit = defineEmits(["emitShowPanel"]);
const stop = watch(props, (newVal, oldVal) => {
	showDropdown.value = newVal.isShowPanel;
});
// const maskEmit = () => {
// 	// 触发 showProfilePanel
// 	emit("emitShowPanel");
// };
//panel
const showDropdown = ref(false);
const panelPositionX = ref(20);
const panelPositionY = ref(44);

//自定义退出按钮
// const exitBtn = () => {
// 	return h("div", { class: "n-dropdown-option-body", style: "color:red" }, "退出登录");
// };

//个人菜单
const menu = [
	{
		label: "最近打开的任务",
		key: "0",
		children: [
			{
				label: "暂无数据",
				key: "0-1"
			}
		]
	},
	{
		type: "divider",
		key: "a"
	},
	{
		label: "系统设置",
		key: "1"
	},
	{
		label: "新增项目",
		key: "2"
	},
	{
		label: "所有项目",
		key: "3"
	},
	{
		label: "团队管理",
		key: "4"
	},

	{
		type: "divider",
		key: "b"
	},
	{
		label: "关于我们",
		key: "5",
		props: {
			onClick: () => {
				handleAboutUs();
			}
		}
	},
	{
		label: "打开首页",
		key: "6",
		props: {
			onClick: () => {
				router.push({ name: "index" });
			}
		}
	},
	{
		label: "退出登录",
		key: "7",
		props: {
			onClick: () => {
				message.info("退出登录");
			}
		}
	}
];

//关于我们
const handleAboutUs = () => {
	dialog.success({
		title: "关于我们",
		content: () => h(AboutUs),
		showIcon: false,
		negativeText: "关闭"
	});
};

//点击 select 选项触发
const handleSelect = (key: string | number) => {
	emit("emitShowPanel");
};
const onClickoutside = () => {
	// message.info("clickoutside");
	emit("emitShowPanel");
};

//组件卸载前
onBeforeUnmount(() => {
	console.log("profilePanel 卸载了");
	stop();
});
</script>
<style lang="scss" scoped>
.profilePanel {
	position: absolute;
	top: 50px;
	left: 2px;
	width: 100px;
	height: 200px;
	// background-color: aqua;
	z-index: 999;

	.container {
	}
}
:global(._mask) {
	position: fixed;
	top: 50px;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: transparent;
	z-index: 99;
}
:global(.v-binder-follower-content) {
	width: 180px;
	height: fit-content;
}
</style>
