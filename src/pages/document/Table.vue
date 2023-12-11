<template>
	<div class="table-wrapper">
		<n-data-table
			:columns="columns"
			:data="fileList"
			:row-key="rowKey"
			:max-height="500"
			striped
			:row-props="rightClick"
			@update:checked-row-keys="handleRowCheck" />
		<rightClickMenu :position="position" ref="clickMenu" :rowInfo="rowInfo" />
	</div>
</template>

<script setup lang="ts">
import { h, defineComponent, ref, nextTick, reactive, watch, computed } from "vue";
import type { DataTableRowKey } from "naive-ui";
import { NInput, useMessage } from "naive-ui";
import ColumnF from "./component/columnFolder.vue";
import customHeaderCell from "./component/customHeaderCell.vue";
import rightClickMenu from "./rightClickMenu.vue";
const props = defineProps(["fileList"]);
const emit = defineEmits(["sortFileInfo"]);
const message = useMessage();
import fileApi from "../../api/fileApi";

watch(
	() => props.fileList,
	(newVal) => {
		console.log("table fileList changed", newVal);
	}
);
//编辑备注
const ShowOrEdit = defineComponent({
	props: {
		value: [String, Number],
		onUpdateValue: [Function, Array<string>],
		rowInfo: [Object, Array<object>]
	},
	setup(props) {
		const isEdit = ref(false);
		const inputRef = ref(null);
		const inputValue = ref(props.value);
		function handleOnClick() {
			isEdit.value = true;
			nextTick(() => {
				inputRef.value.focus();
			});
		}
		function handleChange() {
			props.onUpdateValue(inputValue.value);
			let tempFileInfo = props.rowInfo;
			fileApi.updateFileInfo(JSON.stringify(tempFileInfo));
			isEdit.value = false;
			message.success("修改成功", { duration: 1000 });
			//TODO:更新数据
		}
		return () =>
			h(
				"div",
				{
					style: "min-height: 22px",
					class: "row-ellipsis",
					onClick: handleOnClick
				},
				isEdit.value
					? h(NInput, {
							maxlength: 30,
							ref: inputRef,
							clearable: true,
							value: inputValue.value,
							onUpdateValue: (v) => {
								inputValue.value = v.trim();
							},
							onInput: () => {
								if (inputValue.value.length >= 30) {
									message.error("字数不能大于30个");
								}
							},
							onBlur: handleChange
					  })
					: props.value
			);
	}
});

type RowData = {
	key: number;
	folderName: string;
	remarks: string;
	size: string;
	category: string;
	lastModify: string;
	Directory: string;
};
//表头
const columns = [
	{
		type: "selection"
	},
	{
		//排序功能，把文件夹放在一起或者把文件放在一起
		key: "folderName",
		title() {
			return h(customHeaderCell, {
				onEmitSort(type) {
					emit("sortFileInfo", type);
				}
			});
		},
		render: (item) => {
			return h(ColumnF, { folderName: item.folderName, category: item.category });
		}
	},
	{
		key: "remarks",
		title() {
			return h("div", { class: "remarks" }, [
				"备注",
				h("span", { style: { fontSize: "12px", color: "#676363" } }, "（点击行即可备注）")
			]);
		},
		render(row: RowData) {
			const index = getDataIndex(row.key);
			return h(ShowOrEdit, {
				rowInfo: row,
				value: row.remarks,
				onUpdateValue(v: any) {
					console.log("v", v);
					props.fileList[index].remarks = v;
				}
			});
		}
	},
	{
		key: "size",
		title() {
			return h("div", { size: "20", type: "info" }, { default: () => "大小" });
		},
		ellipsis: {
			tooltip: true
		},
		width: 80
	},
	{
		key: "category",
		align: "center",
		title() {
			return h("div", { type: "info" }, { default: () => "类型" });
		},
		render: (item) => {
			return h("span", item.Directory == "文件夹" ? "文件夹" : item.category);
		},
		ellipsis: {
			tooltip: true
		}
	},
	{
		key: "lastModify",
		title() {
			return h("div", { size: "20", type: "info" }, { default: () => "最后修改" });
		},
		ellipsis: {
			tooltip: true
		}
	}
];
//每行绑定的key
const rowKey = (row: RowData) => row.key;

const getDataIndex = (key: number) => {
	return props.fileList.findIndex((item) => item.key === key);
};

//选中的行
const checkedRowKeysRef = ref<DataTableRowKey[]>([]);

const handleRowCheck = (rowKeys: DataTableRowKey[]) => {
	checkedRowKeysRef.value = rowKeys;
	console.log("被选中的行", checkedRowKeysRef.value);
};

let position = reactive({ x: 0, y: 0 });
const clickMenu = ref(null);
let rowInfo = ref(null);
//右击行
const rightClick = (row) => {
	return {
		onContextmenu: (e: MouseEvent) => {
			position.x = e.clientX;
			position.y = e.clientY;
			clickMenu.value.showContextMenu();
			// console.log("clickMenu",);
			rowInfo.value = JSON.stringify(row);
			console.log("position", position);
			console.log("row", row);
		}
	};
};
</script>
<style lang="scss" scoped>
:global(.row-ellipsis) {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
:deep(.n-data-table-th) {
	.remarks {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}
</style>
