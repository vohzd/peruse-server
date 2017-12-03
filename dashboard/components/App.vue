<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
	import { mapActions, mapGetters }					from "vuex";
	import io 																from "socket.io-client";

	export default {
		data(){
			return {
				socket: io("http://localhost:1337")
			}
		},
		methods: {
			...mapActions([
				"setVisitorData"
			])
		},
		mounted(){
			this.socket.on("informDashboard", (allVisitorData) => {
				this.setVisitorData(allVisitorData)
			});
		}
	}
</script>

<style lang="css">

	body {
		margin: 0;
		padding: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #8c829b;
		background: #ffffff;
		font-size: 18px;
	}

	h1, h2, h3, h4, h5, h6, p, ul, li {
		margin: 0;
		padding: 0;
		font-weight: normal;
		margin-bottom: 16px;
	}

	a {
		color: #9d7660;
		text-decoration: none;
	}

	a:hover{
		color: #82718e;
	}

</style>
