<template>
	<div id="login">
		<form method="POST" id="form" @submit.prevent=" send_login ">
			<div class="title">
				登录
				<router-link to="register" id="login">注册<i class="fa fa-angle-right" aria-hidden="true"></i></router-link>
			</div>
			<div class="form-group">
				<div class="group-title">
					<label for="email">登录邮箱</label>
				</div>
				<input type="text" id="email" required v-model.trim=" user.email ">
			</div>
			<div class="form-group">
				<div class="group-title">
					<label for="password">密码</label>
				</div>
				<input type="password" id="password" required v-model.trim=" user.password ">
			</div>
			<button>登录</button>  
		</form>
		<msgBox :config=" config " @closeBox=" closeBox "></msgBox>
	</div>
</template>

<script>
	import msgBox from './common/msgBox.vue';
	export default {
		name: 'login',
		data() {
			return {
				user: {
					name: '',
					password: ''
				},
				config: {
					showBox: false, // 弹出框主体显示
					showMask: false, // 弹出框遮罩显示
					text: '', // 弹出框文字
					title: '' // 弹出框标题
				}
			}
		},
		components: {
			 msgBox
		},
		methods: {
			closeBox() {
				this.config.showBox = false;
				this.config.showMask = false;
				this.config.text = '';
				this.config.title = '';
			},
			send_login() {
				this.$http.post('/api/login',this.user)
					.then((respone) => {
						if(respone.body == 'fail') {
							this.config.showBox = true;
							this.config.showMask = true;
							this.config.text = '请检查用户邮箱或密码是否正确';
							this.config.title = '登录失败';
						}	else {
							this.$store.commit('SET_CURUSER',respone.body[0]);
							this.$router.push('/');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#form{
		padding-bottom: 20px;
		.title{
			font-size: 22px;
			color: #fff;
			padding: 20px;
			background-color: #086ed5;
			a{
				color: #fff;
				float: right;
				i {
					margin-left: 5px;
				}
			}
		}
		.form-group {
			background-color: #fff;
			padding: 0 20px;
			.group-title {
				color: #000;
				padding-top: 10px;
				padding-bottom: 5px;
			}
			input{
				width: 100%;
				height: 30px;
				border:none;
				border-bottom: 1px solid #ccc;
			}
			select{
				width: 100%;
				height: 30px;
				border:none;
				border-bottom: 1px solid #ccc;
  			appearance:none;
			}
		}
		button{
			margin-top: 10px;
			width: 100%;
			height: 35px;
			line-height: 35px;
			background-color: #086ed5;
			border: none;
			color: #fff;
			font-size: 18px;
		}
	}
</style>