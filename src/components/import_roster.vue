<template>
	<div id="import_restor">
		<form id="myForm" enctype="multipart/form-data" @submit.prevent v-if=" showRoster ">
			<div class="form-group"> 
				<span class="title">命名名册:{{ csvFile.name }}</span>
				<i class="fa fa-times-circle-o" aria-hidden="true" @click=" close "></i>
			</div>
			<div class="form-group">
				<input type="text" name="restor_cls" v-model=" restor_cls " placeholder="如：计媒体152" id="restor_cls" @click=" error = '' ">
			</div>
			<div class="form-group">
				<input type="file" multiple name="restor_file" @change=" fileChange " id="restor_file">
				<label for="restor_file">导入名册</label>
			</div>
			<div class="error" v-text=" error "></div>
			<button @click=" uploadFile ">保存名册</button>
		</form>
		<div class="mask" v-if=" showRoster "></div>
		<msgBox :config=" config " @closeBox=" closeBox "></msgBox>
	</div>
</template>

<script>
	import mixin_msgBox from '../mixin/msgBox.js';
	export default {
		name: 'import_roster',
		title: '导入名册',
		mixins: [mixin_msgBox],
		data() {
			return {
				csvFile: '',
				restor_cls: '',
				error: ''
			}
		},
		props:['showRoster'],
		methods: {
			close() {
				this.$emit('changeShow',false);
			},
			fileChange(e) {
				this.error = '';
				if(!e.target.files.length) return;
				this.csvFile= e.target.files[0] || e.srcElement.files[0];
			},
			uploadFile() {
				if(!(/.*csv$/.test(this.csvFile.name)) || this.csvFile.type != 'application/vnd.ms-excel') {
					this.error = '只能上传csv文件,请重新上传';
					return false;
				} else if (this.restor_cls == '') {
					this.error = '请填写名册班别';
					return false;
				}
				let _self = this;
				let formData = new FormData();
				formData.append('file',this.csvFile);
				formData.append('cls_name',this.restor_cls);
				formData.append('email', this.$store.state.user.user.user_email);
				this.$http.post('/api/uploadFile',formData)
					.then((respone) => {
						if(respone.body == 'fail') {
							this.changeCfg('该名册已存在','保存失败');
							_self.$emit('changeShow',false);
							return;
						}
						this.changeCfg('该名册已保存','保存成功');
						this.csvFile = '';
						this.restor_cls = '';
						_self.$emit('changeShow',false);
					})
					.catch((error) => {
						console.log(error);
					})
			}
		},
		created() {
			if(this.$store.state.cls.curDate == '') {
				this.$router.push('/');
			};
		}
	}
</script>

<style lang="scss" scoped>
	#myForm {
		box-shadow: 0 0 5px 1px #3f4244;
		position: fixed;
		display: block;
		width: 75%;
		max-width: 220px;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		z-index: 100;
		padding: 10px 20px;
		border-radius: 5px;
		.error {
			margin-bottom: 7px;
    	color: #eb515b;
		}
		.form-group{
			margin: 7px 0;
			#restor_file{
				position: absolute;
				left: -999px;
			}
			input[type=text]{
				height: 28px;
				border: 1px solid #000;
				width: 99%;
				text-indent: 1em;
			}
			label {
				display: block;
				background-color: rgb(243,243,243);
				height: 30px;
				line-height: 30px;
				text-align: center;
				color: #000;
				border: 1px solid #ccc;
				cursor: pointer;
			}
			.title{
				color: #000;
				vertical-align: middle;
			}
			i{
				float: right;
				font-size: 18px;
				vertical-align: middle;
				color: #6a6a6a;
			}
		}
		button{
			cursor: pointer;
			width: 100%;
			background-color: #086ed5;
			display: block;
			height: 30px;
			color: #fff;
			line-height: 30px;
			text-align: center;
			border: 1px solid #ccc;
		}
	}

  .mask{
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