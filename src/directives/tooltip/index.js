import TooltipPage from "./index.vue";
import { createVNode, render, createApp } from "vue";

let tooltipApp;
const tooltipContainerClassName = "comm-tooltipContainer";
let tooltipContainerDom = document.querySelector(`.${tooltipContainerClassName}`);

if (tooltipContainerDom === null) {
	tooltipContainerDom = document.createElement("div");
	tooltipContainerDom.className = tooltipContainerClassName;
	document.body.appendChild(tooltipContainerDom);
	tooltipApp = createApp(TooltipPage);
	tooltipApp.mount(tooltipContainerDom);
	tooltipContainerDom._tooltipApp = tooltipApp;
}

if (!tooltipApp && tooltipContainerDom._tooltipApp) {
	tooltipApp.mount(tooltipContainerDom);
	// @ts-ignore
	tooltipApp = tooltipContainerDom._tooltipApp;
}

function initOrUpdate(el, binding) {
	const placement = binding.arg ? binding.arg : "bottom";
	const text = binding.value;
	const { addTooltip, hideTooltip, showTooltip, updatePlacementAndContent } = tooltipApp._instance.exposed;
	if (!el.tooltipIdx) {
		console.log("1111", tooltipApp._instance.exposed);

		addTooltip(el, text, placement);
		function onMouseenter() {
			showTooltip(el);
		}
		function onMouseLeave() {
			hideTooltip(el);
		}
		el._removeEventListener = function () {
			el.removeEventListener("mouseenter", onMouseenter);
			el.removeEventListener("mouseleave", onMouseLeave);
		};

		el.addEventListener("mouseenter", onMouseenter);
		el.addEventListener("mouseleave", onMouseLeave);
	} else {
		updatePlacementAndContent(el, text, placement);
	}
}

export default {
	mounted(el, binding) {
		initOrUpdate(el, binding);
	},
	updated(el, binding) {
		initOrUpdate(el, binding);
	},
	beforeUnmount(el) {
		const { deleteTooltip } = tooltipApp._instance.exposed;
		el._removeEventListener && el._removeEventListener();
		deleteTooltip(el);
	}
};
