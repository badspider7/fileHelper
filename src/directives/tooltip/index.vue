<script setup lang="ts">
import { computePosition, flip, offset, shift, arrow } from "@floating-ui/dom";
import { onBeforeUnmount, reactive, ref, toRefs } from "vue";

export type Side = "top" | "right" | "bottom" | "left";
export interface TooltipInfo {
	idx: number;
	showTooltip: boolean;
	content: string;
	placement: Side;
	offset: number;
	arrow: boolean;
}
export interface TooltipReferenceHTMLElement extends HTMLElement {
	_tooltipIdx: number;
}
function validateElIsBindTooltip(el: TooltipReferenceHTMLElement) {
	return el._tooltipIdx ? true : false;
}
const toolipInfoArr = reactive<TooltipInfo[]>([]);
let tooltipIdx = 1;

function addTooltip(el: TooltipReferenceHTMLElement, content: string, placement: Side, offset: number, arrow: boolean) {
	if (!el._tooltipIdx) {
		el._tooltipIdx = tooltipIdx++;
	}
	toolipInfoArr.push({
		// 给tooltip设置唯一标识
		idx: el._tooltipIdx,
		showTooltip: false,
		content,
		placement,
		offset,
		arrow
	});
}
const tooltipContainerRef = ref<HTMLElement>();
function showTooltip(el: TooltipReferenceHTMLElement) {
	if (!validateElIsBindTooltip(el) || !tooltipContainerRef.value) {
		return;
	}
	const tooltipInfo = toolipInfoArr.find((item) => item.idx === el._tooltipIdx);
	if (!tooltipInfo) {
		return;
	}
	tooltipInfo.showTooltip = true;
	setTimeout(() => {
		// 等待界面渲染完毕，找到tooltip所在dom节点
		const arrowEl = document.querySelector("#arrow") as HTMLElement;
		const tooltipDom = tooltipContainerRef.value?.querySelector(
			`[data-tooltip-idx="${tooltipInfo.idx}"]`
		) as HTMLElement;
		if (!tooltipDom) {
			return;
		}
		// 使用floating-ui实现tooltip
		computePosition(el, tooltipDom, {
			placement: tooltipInfo.placement,
			middleware: [offset(tooltipInfo.offset), flip(), shift({ padding: 2 }), arrow({ element: arrowEl })]
		}).then(({ x, y, placement, middlewareData }) => {
			// Accessing the data
			Object.assign(tooltipDom.style, {
				top: `${y}px`,
				left: `${x}px`
			});

			const { x: arrowX, y: arrowY } = middlewareData.arrow;
			const staticSide = {
				top: "bottom",
				right: "left",
				bottom: "top",
				left: "right"
			}[placement.split("-")[0]];

			if (middlewareData.arrow) {
				console.log("tooltipInfo", tooltipInfo.arrow);
				Object.assign(arrowEl.style, {
					display: tooltipInfo.arrow ? "block" : "none",
					left: arrowX != null ? `${arrowX}px` : "",
					top: arrowY != null ? `${arrowY}px` : "",
					right: "",
					bottom: "",
					[staticSide]: "-4px"
				});
			}
		});
	});
}
function hideTooltip(el: TooltipReferenceHTMLElement) {
	if (!validateElIsBindTooltip(el)) {
		return;
	}
	const tooltipInfo = toolipInfoArr.find((item) => item.idx === el._tooltipIdx);
	if (!tooltipInfo) {
		return;
	}

	// dom的销毁交给vue完成
	tooltipInfo.showTooltip = false;
	//销毁arrow
	const arrow = document.querySelector("#arrow");
	arrow && arrow.remove();
}
function updatePlacementAndContent(el: TooltipReferenceHTMLElement, placement: Side, content: string) {
	console.log("updatePlacementAndContent");
	if (!validateElIsBindTooltip(el)) {
		return;
	}
	const tooltipInfo = toolipInfoArr.find((item) => item.idx === el._tooltipIdx);
	if (!tooltipInfo) {
		return;
	}
	// dom的更新交给vue完成
	tooltipInfo.content = content;
	tooltipInfo.placement = placement;
}
function deleteTooltip(el: TooltipReferenceHTMLElement) {
	if (!validateElIsBindTooltip(el)) {
		return;
	}
	const tooltipInfoIdx = toolipInfoArr.findIndex((item) => item.idx === el._tooltipIdx);
	if (tooltipInfoIdx < 0) {
		return;
	}
	toolipInfoArr.splice(tooltipInfoIdx, 1);
}
defineExpose({
	addTooltip,
	showTooltip,
	hideTooltip,
	updatePlacementAndContent,
	deleteTooltip
});
</script>

<template>
	<div ref="tooltipContainerRef">
		<transition name="fade" v-for="toolipInfo in toolipInfoArr" :key="toolipInfo.idx">
			<div v-if="toolipInfo.showTooltip && toolipInfo.content" class="tooltipDom" :data-tooltip-idx="toolipInfo.idx">
				{{ toolipInfo.content }}
				<div id="arrow"></div>
				<slot name="content"></slot>
			</div>
		</transition>
	</div>
</template>

<style lang="scss" scoped>
.tooltipDom {
	width: max-content;
	left: 0;
	top: 0;
	position: absolute;
	background-color: #222;
	color: #fff;
	padding: 4px 10px;
	border-radius: 5px;
	#arrow {
		position: absolute;
		background: #222;
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
		pointer-events: none;
	}
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}
</style>
