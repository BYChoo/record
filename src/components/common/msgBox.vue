<template>
	<div id="msgBox">
		<div class="box" v-if=" config.showBox ">
			<div class="header">
				<div class="title">
					{{ config.title }}
				</div>
				<button class="headerbtn">
					<i class="fa fa-times" aria-hidden="true" @click = " close "></i>
				</button>
			</div>
			<div class="content">
				<div class="message">
					<p>{{ config.text }}</p>
				</div>
			</div>
			<div class="btns">
				<button class="btn-primary" @click = " close ">
					确定
				</button>
			</div>
		</div>
		<div class="mask" v-if=" config.showMask "></div>
	</div>
</template>

<script>
	export default {
		name: 'msgBox',
		data() {
			return {

			}
		},
		props : {
			config : {
				type: Object
			}
		},
		methods: {
			close () {
				this.$emit('closeBox');
			}
		}
	}
</script>

<style lang="scss" scoped>
	#msgBox{

	}
	.box {
		text-align: left;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    width: 80%;
   	max-width: 400px;
    border-radius: 3px;
    font-size: 16px;
    overflow: hidden;
    z-index: 1000;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .header {
	    position: relative;
	    padding: 20px 20px 0;
	    .title {
		    padding-left: 0;
		    margin-bottom: 0;
		    font-size: 16px;
		    font-weight: 700;
		    height: 18px;
		    color: #333;
			}
			.headerbtn {
		    position: absolute;
		    top: 19px;
		    right: 20px;
		    background: transparent;
		    border: none;
		    outline: none;
		    padding: 0;
		    cursor: pointer;
		    i{
		    	color: #999;
		    	font-size: 14px;
		    }
			}
		}
		.content {
	    padding: 30px 20px;
	    color: #48576a;
	    font-size: 14px;
	    position: relative;
		}
		.btns {
    	padding: 10px 20px 15px;
	    text-align: right;
	    .btn-primary {
	    	margin-left: 10px;
	    	background: #086ed5;
		    border-color: #4db3ff;
		    color: #fff;
		    display: inline-block;
		    line-height: 1;
		    white-space: nowrap;
		    cursor: pointer;
        border: 1px solid #bfcbd9;
		    text-align: center;
		    box-sizing: border-box;
		    outline: none;
        padding: 10px 15px;
		    font-size: 14px;
		    border-radius: 4px;
			}
		}
	}
	.mask {
		position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
	}
</style>