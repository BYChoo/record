<template>
	<div id="topBar">
		<router-link :to="reUrl">
			<i class="fa fa-angle-left" aria-hidden="true"></i>
			<span class="reBtn">返回</span>
		</router-link>
		<span class="title">{{ title }}</span>
	</div>
</template>

<script>
	export default {
		name: 'topBar',
		data() {
			return {

			}
		},
		props:{
			title: {
				type: String,
				required: true
			},
			reUrl: {
				type: String,
				required: true
			}
		}
	} 
</script>

<style lang="scss" scoped>
	#topBar{
		padding: 10px;
		height: 30px;
		line-height: 30px;
		background-color: #086ed5;
		position: relative;
		.reBtn{
			color: #fff;
		}
		.title{
			color: #fff;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		i{
	    display: inline-block;
	    width: 19px;
	    height: 19px;
	    text-align: center;
	    line-height: 20px;
	    border-radius: 50%;
	    border: 3px solid #fff;
	    color: #fff;
		}
	}
</style>