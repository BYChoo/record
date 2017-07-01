<template>
	<div id="cls_call">
		<topBar :title=" '请选择旷课学生' " :reUrl=" 'select_restor' "></topBar>
		<ul>
			<li v-for=" person in curcls " class="item clearfix" @click=" addStudent(person,$event) ">
				<i class="fa fa-square-o" aria-hidden="true"></i>
				<span v-text=" person.student_name " class="name"></span>
				<span v-text=" person.student_id " class="numbers pull-right"></span>
			</li>
		</ul>
		<button @click=" send_cutStudents " v-if=" flicker ">提交</button>
		<msgBox :config=" config " @closeBox=" closeBox "></msgBox>
	</div>
</template>

<script>
	import msgBox from './common/msgBox.vue';
	import topBar from '../components/common/topBar.vue';
	export default {
		name: 'cls_call',
		data() {
			return {
				curcls: [],
				cutStudents: [],
				flicker: false,
				config: {
					showBox: false, // 弹出框主体显示
					showMask: false, // 弹出框遮罩显示
					text: '', // 弹出框文字
					title: '' // 弹出框标题
				}
			}
		},
		methods: {
			closeBox() {
				this.config.showBox = false;
				this.config.showMask = false;
				this.config.text = '';
				this.config.title = '';
			},
			addStudent(person,e) {
				var i;
				if(e.target.tagName.toLocaleLowerCase() == 'li') {
					i = e.target.querySelector('i').classList;
				} else {
					i = e.target.parentNode.querySelector('i').classList;
				}
				// fa-square-o未选择，fa-check-square-o已选择
				// 如果当前状态为已经选择，就变为未曾选择
				if(i.contains('fa-square-o')) {
					i.remove('fa-square-o');
					i.add('fa-check-square-o');
					this.cutStudents.push(person);
				}	else {
					i.remove('fa-check-square-o');
					i.add('fa-square-o');
					this.cutStudents.forEach((item,index) => {
							if(item.student_id === person.student_id) {
								this.cutStudents.splice(index,1);
							}
					});
				};
			},
			format(hours,min,sec) {
				let h = hours > 9? hours: '0' + hours;
				let m = min > 9? min: '0' + min;
				let s = sec > 9? sec: '0' + sec;
				return `${h}-${m}-${s}`;
			},
			send_cutStudents() {
				let date = new Date();
				let time = this.format(date.getHours(),date.getMinutes(),date.getSeconds());
				let _self = this;
				let email = this.$store.state.user.user.user_email;
				this.$http.post('/api/add_cutStudents',{
					cutStudents: _self.cutStudents,
					cls_name: this.$route.query.cls_name,
					time,
					email
				}).then((respone) => {
					this.config.showBox = true;
					this.config.showMask = true;
					this.config.text = '缺勤学生已记录';
					this.config.title = '记录成功';
				}).catch((err) => {
					console.log(err);
				})
			}
		},
		components: {
			topBar,
			msgBox
		},
		created() {
			if(this.$store.state.cls.curDate == '') {
				this.$router.push('/');
				return;
			};
			let _self = this;
			let cls_name = this.$route.query.cls_name;
			let user_email = this.$store.state.user.user.user_email
			this.$http.get('/api/get_cls',{params: {cls_name,user_email}})
				.then((respone) => {
					_self.curcls = respone.body;
				})
				.then(() => {
					this.flicker = true;
				})
				.catch((error) => {
					console.log(error);
				})
		}
	}
</script>

<style lang='scss' scoped>
	ul{
		box-shadow: 0 0 5px 1px #9b9ba9;
	}
	.item{
		padding: 20px;
		border-bottom: 1px solid #f3f3f4;
		background-color: #fff;
		.numbers{
			color: #ccc;
		}
		i{
			color: #000;
			cursor: pointer;
		}
		.name{
			color: #000;
		}
		@media screen and (min-width: 768px) {
			&:hover{
				background-color: #f3f3f4;
			}
		}
	}
	button{
		display: block;
		width: 35%;
		height: 35px;
		line-height: 35px;
		margin: 0 auto;
		margin-top: 10px;
		border: none;
		border-radius: 10px;
		background-color: #086ed5;
		color: #fff;
	}
</style>