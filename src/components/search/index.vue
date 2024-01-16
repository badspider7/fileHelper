<template>
	<div class="search">
		<n-input
			clearable
			v-model:value="searchValue"
			type="text"
			placeholder="搜索项目(ctrl+k)"
			@blur="searchBlur"
			@focus="searchFocus" />
		<div class="result">
			<search-result-panel v-show="isShowPanel"></search-result-panel>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "search"
};
</script>

<script setup lang="ts">
import searchResultPanel from "./searchResult.vue";
import { ref } from "vue";

const searchValue = ref(null);
const isShowPanel = ref(false);

//search
const searchBlur = () => {
	isShowPanel.value = false;
};

const searchFocus = () => {
	isShowPanel.value = true;
};
</script>

<style lang="scss" scope>
.search {
	// display: flex;
	flex-flow: row nowrap;
	width: 204px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	transition: all 0.2s ease;
	.result {
		width: 100%;
	}
}

.search:has(div input:focus) {
	width: 540px !important;
}
</style>
