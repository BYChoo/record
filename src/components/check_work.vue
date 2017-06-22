<template>
	<div id="check_work">
		<topBar :title=" '查看缺勤学生' " :reUrl=" 'select_cls' "></topBar>
		<ul v-for=" row in students ">
			<li v-for=" person in row.students " class="item clearfix">
				<span v-text=" person.student_name " class="name"></span>
				<span v-text=" person.student_id " class="numbers pull-right"></span>
				<p class="time">{{ row.absend_date }} {{ row.absend_time | formatTime }}</p>
			</li>
		</ul>
		<p v-if=" students.length <= 0 " class="noPerson">无人旷课</p>
	</div>
</template>

<script>
	import topBar from '../components/common/topBar.vue';
	export default {
		name: 'check_work',
		data() {
			return {
				students:{}
			}
		},
		props: ['nowDate'],
		components: {
			topBar
		},
		filters: {
			formatTime(value) {
				return value.replace(/-/g, ":");
			}
		},
		created() {
			if(this.$store.state.cls.curDate == '') {
				this.$router.push('/');
				return;
			};
			
			let _self = this;
			this.$http.get('/api/get_dayAbsent',{params:{
				objDate: this.$store.state.cls.curDate,
				cls_name: this.$route.query.cls_name,
				email: this.$store.state.user.user.user_email
			}}).then((respone) => {
				_self.students = respone.body;
			}).catch((error) => {
				console.log(error);
			})
		}
	}
</script>

<style lang="scss" scoped>
	ul:last-of-type{
		.item:last-of-type{
			box-shadow: 0 3px 7px 1px #9b9ba9;
		}
	}
	p.noPerson {
		text-align: center;
		color: #000;
		margin-top: 5px;
	}
	.item{
		background-color: #fff;
		.time{
	    font-size: 12px;
	    margin-top: 8px;
		}
		padding: 10px 20px;
		border-bottom: 1px solid #f3f3f4;
		.numbers{
			color: #ccc;
			font-size: 12px;
		}
		i{
			color: #000;
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
</style>