<template>
	<div id="layout">
		<Header></Header>
		<div class="container">
			<SliderBar></SliderBar>
			<router-view v-slot="{ Component }">
				<transition-slide :offset="[-16, 0]" mode="out-in">
					<keep-alive>
						<component :is="Component" />
					</keep-alive>
				</transition-slide>
			</router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TransitionSlide } from "@morev/vue-transitions";
</script>
<style lang="scss" scoped>
:global(.n-config-provider) {
	height: 100%;
	width: 100%;
}
#layout {
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	.container {
		display: grid;
		grid-template-columns: 3fr 7fr;
		flex: 1;
	}
}
</style>
