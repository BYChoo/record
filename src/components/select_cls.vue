<template>
  <div id="select_cls">
    <topBar :title=" '请选择查看的班级' " :reUrl=" reUrl "></topBar>
    <ul v-if=" ALLCLS.length ">
      <li v-for=" item in ALLCLS " class="clearfix item" @click=" changeUrl(item.cls_name) ">
        <span>{{ item.cls_name }}</span>
        <span class="numbers pull-right" v-if=" item.cls_numbers ">班级总人数{{ item.cls_numbers }}</span>
      </li>
    </ul>
    <p class="tip" v-else>这天没人缺勤</p>
  </div>
</template>
<script>
import topBar from './common/topBar.vue';
import { getAllRestor, getNoTodayAbsent } from 'api/selectCls';
export default {
  name: 'select_cls',
  data() {
    return {
      reUrl: ''
    }
  },
  computed: {
    ALLCLS() { // 所有已经载入名册的班级
      return this.$store.state.cls.allCls
    }
  },
  components: {
    topBar
  },
  methods: {
    changeUrl(cls_name) {
      this.$router.push({
        name: 'check_work',
        query: {
          cls_name
        }
      })
    }
  },
  created() {
    if (this.$store.state.cls.curDate == '') {
      this.$router.push('/');
      return;
    };

    let _self = this;
    let date = this.$store.state.cls.curDate;
    let email = this.$store.state.user.user.user_email;
    let dataDate = new Date(date);
    let today = new Date();
    let todaytTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // today
    if (dataDate.getTime() === todaytTime.getTime()) {
      this.reUrl = 'restor';
      getAllRestor({
          user_email: this.$store.state.user.user.user_email
        })
        .then((respone) => {
          this.$store.commit('SET_ALLCLS', respone.data);
        })
        .catch((error) => {
          throw new Error(error);
        })
    } else {
      // noToday
      this.reUrl = '/';
      getNoTodayAbsent({
          date,
          email
        })
        .then((respone) => {
          console.log(respone);
          /**
           * 这里后续还要优化,这样写性能消耗比较大
           * 优化方案:数据库结构优化
           */
          let clsArr = [];
          respone.data.forEach((item, index) => {
            if (clsArr.length == 0) {
              clsArr.push(item);
              return;
            }
            let flag = clsArr.every((b_item) => {
              return b_item.cls_name != item.cls_name
            });
            if (flag) {
              clsArr.push(item);
            };
          });
          this.$store.commit('SET_ALLCLS', clsArr);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
}

</script>
<style lang="scss" scoped>
ul {
  box-shadow: 0 0 5px 1px #9b9ba9;
}

.tip {
  text-align: center;
  margin-top: 5px;
  color: #000;
}

.item {
  cursor: pointer;
  padding: 20px;
  border-bottom: 1px solid #f3f3f4;
  color: #000;
  background-color: #fff;
  .numbers {
    color: #ccc;
  }
  @media screen and (min-width: 768px) {
    &:hover {
      background-color: #f3f3f4;
    }
  }
}

</style>
