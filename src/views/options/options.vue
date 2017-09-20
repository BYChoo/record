<template>
	<div id="restor">
		<topBar :title="''" :reUrl=" '/' "></topBar>
		<ul>
			<li @click=" showRoster " v-if=" isToday() ">
				<i class="fa fa-book" aria-hidden="true"></i><span class="title">导入名册</span>
			</li>
			<li @click=" changeUrl('/select_restor') " v-if=" isToday() ">
				<i class="fa fa-navicon" aria-hidden="true"></i><span class="title">选择已导入名册</span>
			</li>
			<li @click=" changeUrl(`/select_cls`) ">
				<i class="fa fa-calendar-times-o" aria-hidden="true"></i><span class="title">查看当日考勤</span>
			</li>
		</ul>
		<importRoster :showRoster=" show " @changeShow=" changeShow "></importRoster>
	</div>
</template>

<script>
	import importRoster from 'views/options/childrens/import_roster.vue';
	import topBar from 'components/topBar.vue';
	export default {
		name: 'restor',
		data() {
			return {
				show: false
			}
		},
		methods: {
			showRoster() {
				this.show = true;
			},
			changeShow(flag) {
				this.show = flag;
			},
			changeUrl(url) {
				this.$router.push(url);
			},
			isToday() {
				let today = new Date();
				let str = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
				return this.$store.state.cls.curDate == str; 
			}
		},
		components: {
			topBar,
			importRoster
		},
		created() {
			if(this.$store.state.cls.curDate == '') {
				this.$router.push('/');
				return;
			};
		}
	}
</script>

<style lang="scss" scoped>
	ul{
		box-shadow: 0 0 5px 1px #9b9ba9;
	}
	li {
		color: #000;
    padding: 20px;
    border-bottom: 1px solid #f3f3f4;
    background-color: #fff;
    cursor: pointer;
    i{
    	display: inline-block;
	    width: 50px;
	    height: 50px;
	    background-color: #086ed5;
	    line-height: 50px;
	    text-align: center;
	    border-radius: 50%;
	    color: #fff;
	    font-size: 22px;
    }
	}
	a{
		color: #000;
	}
	.title {
		margin-left: 10px;
		font-weight: bold;
	}
</style>