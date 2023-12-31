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

function initOrUpdate(el, binding, vnode) {
	const placement = binding.arg ? binding.arg : "bottom";
	const text = binding.value;
	const offset = vnode.props?.offset ?? 6;
	const showArrow = vnode.props?.arrow ?? true;

	const { addTooltip, hideTooltip, showTooltip, updatePlacementAndContent } = tooltipApp._instance.exposed;
	if (!el.tooltipIdx) {
		addTooltip(el, text, placement, offset, showArrow);
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
	mounted(el, binding, vnode) {
		initOrUpdate(el, binding, vnode);
	},
	updated(el, binding, vnode) {
		initOrUpdate(el, binding, vnode);
	},
	beforeUnmount(el) {
		console.log("beforeUnmount====");
		const { deleteTooltip } = tooltipApp._instance.exposed;
		el._removeEventListener && el._removeEventListener();
		deleteTooltip(el);
	}
};
