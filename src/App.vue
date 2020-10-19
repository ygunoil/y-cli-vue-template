<template>
	<div id="app">
		<router-view name="header" />
		<router-view name="content" />
		<!--<router-view name="footer" />-->
	</div>
</template>
<script>
	export default {
		name: 'App',
		created() {
			
		},
		methods: {

		}
	}
</script>
<style>
	#app {}

	.main {
		min-width: 1360px;
		max-width: 1920px;
		background: #fff;
		padding: 0 20px;
		min-height: 500px;
	}
</style>
