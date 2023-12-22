import { Directive, createVNode, render, createApp } from 'vue'
//@ts-ignore
import CustomTooltip4 from './index.vue'

// 创建tooltip的总容器
let tooltipApp
const tooltipContainerClassName = 'comm-tooltipContainer'
let tooltipContainerDom = document.querySelector(`.${tooltipContainerClassName}`)
if (tooltipContainerDom === null) {
    tooltipContainerDom = document.createElement('div')
    tooltipContainerDom.className = tooltipContainerClassName
    document.body.appendChild(tooltipContainerDom)
    tooltipApp = createApp(CustomTooltip4)
    tooltipApp.mount(tooltipContainerDom)
    // @ts-ignore
    tooltipContainerDom._tooltipApp = tooltipApp
}
// @ts-ignore
if (!tooltipApp && tooltipContainerDom._tooltipApp) {
    tooltipApp.mount(tooltipContainerDom)
    // @ts-ignore
    tooltipApp = tooltipContainerDom._tooltipApp
}
/**
 * 初始化或更新自定义指令
 *
 * @param   {[type]}  el       [el description]
 * @param   {[type]}  binding  [binding description]
 *
 * @return  {[type]}           [return description]
 */
function initOrUpdate(el, binding) {
    const placement = binding.arg ? binding.arg : 'bottom'
    const text = binding.value
    const { addTooltip, hideTooltip, showTooltip, updatePlacementAndContent } = tooltipApp._instance.exposed
    if (!el._tooltipIdx) {
        addTooltip(el, text, placement)
        function onMouseenter() {
            showTooltip(el)
        }
        function onMouseLeave() {
            hideTooltip(el)
        }
        el._removeEventListener = function () {
            el.removeEventListener('mouseenter', onMouseenter)
            el.removeEventListener('mouseleave', onMouseLeave)
        }
        el.addEventListener('mouseenter', onMouseenter)
        el.addEventListener('mouseleave', onMouseLeave)
    } else {
        updatePlacementAndContent(el, placement, text)
    }
}

export default {
    mounted(el, binding) {
        initOrUpdate(el, binding)
    },
    updated(el, binding) {
        initOrUpdate(el, binding)
    },
    beforeUnmount(el) {
        const { deleteTooltip } = tooltipApp._instance.exposed
        el._removeEventListener && el._removeEventListener()
        deleteTooltip(el)
    },
} as Directive

