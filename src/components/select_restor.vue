<template>
	<div id="select_restor">
		<topBar :title=" '请选择已导入名册' " :reUrl=" `restor` "></topBar>
		<ul id="demo">
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
				objDate: '',
				page: 1,
				canLoading: true
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
			},
			
			/**
			 * 判断是否滚动到底部公式： scrollTop(滚动条卷去的高度) + offsetHeight(元素高度) >= 
			 * scrollHeight(滚动条整体高度)
			 */
			
			// 获取滚动条卷去的高度
			getScrollTop(el) {
				return document.body.scrollTop || document.documentElement.scrollTop;
			},
			// 获取可视区域高度
			getClientHeight(el) {
				return document.documentElement.clientHeight || document.body.clientHeight;
			},
			// 获取元素滚动条整体高度
			getScrollHeight(el) {
				return document.body.scrollHeight || document.documentElement.scrollHeight;
			},
			// 计算公式,判断是否到达底部
			getClsData(el) {
				this.page++;
				if(this.canLoading) {
					this.canLoading = false;
					this.$http.get('/api/get_allRestor',{
						params: {
							user_email: this.$store.state.user.user.user_email,
							page: this.page
						}
					})
						.then((respone) => {
							this.$store.commit('SET_ALLCLS',respone.data);
							this.canLoading = true;
						})
						.catch((error) => {
							console.log(error);
						})
				}
			},
			// 函数节流
			throotle(fn,delay,atleast) {
				var _self = this;
				var timer = null;
				var prevTime = null;

				return function() { 
					var flag = Math.floor(_self.getScrollTop()) + _self.getClientHeight() >= _self.getScrollHeight() || Math.ceil(_self.getScrollTop()) + _self.getClientHeight() >= _self.getScrollHeight();

					if(!flag) return;

					var now = new Date();

					if(!prevTime) { // 第一次执行
						fn();
						prevTime = now;
						return;
					}

					if(now - prevTime > atleast) {
						window.clearTimeout(timer);
						timer = window.setTimeout(fn,delay);
						prevTime = now;
					}	else {
						console.log('在延迟范围内,不作任何执行');
					}
				}
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
		mounted() {
			let _self = this;
			window.addEventListener('scroll',_self.throotle(_self.getClsData,500,2500), true);
		},
		created() {
			if(this.$store.state.cls.curDate == '') {
				this.$router.push('/');
				return;
			};
			this.$http.get('/api/get_allRestor',{
				params: {
					user_email: this.$store.state.user.user.user_email,
					page: this.page
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