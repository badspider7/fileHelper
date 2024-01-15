<template>
	<div class="custom_header_cell">
		<div class="title">文件名</div>
		<div class="btn">
			<div
				class="up"
				v-tooltip:top="'文件夹在前'"
				:class="[activeArrow == 'up' ? 'on' : '']"
				@click="sortDocument('up')">
				<CaretSortUp />
			</div>
			<div
				class="down"
				v-tooltip:top="'文件在前'"
				:class="[activeArrow == 'down' ? 'on' : '']"
				@click="sortDocument('down')">
				<CaretSortDown />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { CaretSortDown, CaretSortUp } from "@vicons/carbon";
const emit = defineEmits(["EmitSort"]);

const activeArrow = ref(null);
/**
 *
 * @param type
 * 文档按照一定规则排序：up 文件夹在前  down 文件在前 ，并且按照文件名字a-z来排序
 *
 */
const sortDocument = (type) => {
	activeArrow.value = type;
	emit("EmitSort", type);
};
</script>
<style lang="scss" scoped>
.custom_header_cell {
	display: flex;

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-left: 5px;
		margin-top: -3px;
		.up,
		.down {
			width: 20px;
			height: 10px;
			cursor: pointer;
			overflow: hidden;
			&:hover {
				svg {
					color: #000;
				}
			}
		}
		.up {
			z-index: 99;
			svg {
				transform: translateY(5px);
			}
		}
		.down {
			svg {
				transform: translateY(-10px);
			}
		}
		svg {
			width: 18px;
			height: 18px;
			color: #ccc;
			z-index: -1;
		}
	}
	.on {
		svg {
			color: #8bcf70 !important;
		}
	}
}
</style>
