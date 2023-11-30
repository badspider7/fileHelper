<template>
	<n-config-provider :inline-theme-disabled="true" :locale="zhCN">
		<n-global-style />
		<n-dialog-provider>
			<n-message-provider>
				<router-view v-slot="{ Component }">
					<keep-alive>
						<component :is="Component" />
					</keep-alive>
				</router-view>
			</n-message-provider>
		</n-dialog-provider>
	</n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, zhCN } from "naive-ui";
</script>

<style></style>
