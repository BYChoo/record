<template>
	<div id="select_restor">
		<topBar :title=" '请选择已导入名册' " :reUrl=" `restor` "></topBar>
		<ul>
			<li v-for=" item in ALLCLS " class="clearfix item" @click=" changeUrl(item.cls_name) ">
				<span>{{ item.cls_name }}</span>
				<span class="numbers pull-right">班级总人数{{ item.cls_numbers }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import topBar from './common/topBar.vue';
	export default {
		name: 'select_restor',
		data() {
			return {
				objDate: ''
			}
		},
		methods: {
			changeUrl(cls_name) {
				this.$router.push({
					name: 'cls',
					query: {
						cls_name
					}
				})
			}
		},
		computed:{
			ALLCLS() { // 所有已经载入名册的班级
				return this.$store.state.cls.allCls
			}
		},
		components: {
			topBar
		},	
		created() {
			if(this.$store.state.cls.curDate == '') {
				this.$router.push('/');
				return;
			};
			let _self = this;
			this.$http.get('/api/get_allRestor',{
				params: {
					user_email: this.$store.state.user.user.user_email
				}
			})
				.then((respone) => {
					this.$store.commit('SET_ALLCLS',respone.data);
				})
				.catch((error) => {
					console.log(error);
				})
		}
	}
</script>

<style lang="scss" scoped>
	ul{
		box-shadow: 0 0 5px 1px #9b9ba9;
	}
	.item{
		padding: 20px;
		color: #000;
		border-bottom: 1px solid #f3f3f4;
		cursor: pointer;
		background-color: #fff;
		.numbers{
			color: #ccc;
		}
		@media screen and (min-width: 768px) {
			&:hover{
				background-color: #f3f3f4;
			}
		}
	}
</style>