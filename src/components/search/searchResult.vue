<template>
	<div class="search-result">
		<div class="result-item" v-for="item in searchList">
			{{ item.path }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import utils from "@/api/utils";

let searchList = ref([]);

const search = async (keyword: string) => {
	if (typeof keyword == "string") {
		const data = await utils.searchInExplorer(keyword);
		console.log("data", data);
	}
};

defineExpose({
	search
});
</script>
<style lang="scss" scoped>
.search-result {
	width: 540px !important;
	height: 400px;
	position: absolute;
	left: 0;
	background-color: #fff;
	border: 1px solid #ccc;
	// animation: name duration timing-function delay iteration-count direction fill-mode;
	// animation: panelShow 0.3s ease-in-out 0.3s;
}

@keyframes panelShow {
	0% {
		height: 0%;
	}

	100% {
		height: 400px;
	}
}
</style>
