<template>
	<div class="table-wrapper">
		<n-data-table
			:columns="columns"
			:data="fileList"
			:max-height="750"
			:row-key="rowKey"
			striped
			@update:checked-row-keys="handleCheck" />
	</div>
</template>

<script setup lang="ts">
import { h, defineComponent, ref, nextTick, reactive } from "vue";
import type { DataTableRowKey } from "naive-ui";
import { NInput } from "naive-ui";
const props = defineProps(["fileList"]);

//编辑备注
const ShowOrEdit = defineComponent({
	props: {
		value: [String, Number],
		onUpdateValue: [Function, Array]
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
			isEdit.value = false;
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
							ref: inputRef,
							clearable: true,
							value: inputValue.value,
							onUpdateValue: (v) => {
								inputValue.value = v;
							},
							onChange: handleChange,
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
};

//表头
const columns = [
	{
		type: "selection"
	},
	{
		key: "folderName",
		ellipsis: {
			tooltip: true
		},
		title() {
			return h("div", { size: "20", type: "info" }, { default: () => "文件名" });
		},
		width: 200
	},
	{
		key: "remarks",

		title() {
			return h("div", ["备注", h("span", { style: { fontSize: "12px", color: "#676363" } }, "（点击行即可备注）")]);
		},
		render(row: RowData) {
			const index = getDataIndex(row.key);
			return h(ShowOrEdit, {
				value: row.remarks,
				onUpdateValue(v: any) {
					console.log(v);
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
		title() {
			return h("div", { size: "20", type: "info" }, { default: () => "类型" });
		},
		ellipsis: {
			tooltip: true
		},
		width: 100
	},
	{
		key: "lastModify",
		title() {
			return h("div", { size: "20", type: "info" }, { default: () => "最后修改" });
		},
		ellipsis: {
			tooltip: true
		},
		width: 180
	}
];
//每行绑定的key
const rowKey = (row: RowData) => row.key;

const getDataIndex = (key: number) => {
	return props.fileList.findIndex((item) => item.key === key);
};

//选中的行
const checkedRowKeysRef = ref<DataTableRowKey[]>([]);

const handleCheck = (rowKeys: DataTableRowKey[]) => {
	checkedRowKeysRef.value = rowKeys;
	console.log("checked-row", checkedRowKeysRef.value);
};
</script>
<style lang="scss" scoped>
:global(.row-ellipsis) {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
</style>
