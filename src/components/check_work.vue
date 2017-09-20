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
    <button id="export-btn" v-if=" students.length > 0 " @click.stop=" export_file ">导出名单</button>
    <p v-else class="noPerson">无人旷课</p>
  </div>
</template>
<script>
import topBar from 'components/topBar.vue';
import { getDayAbsent, exportExcal } from 'api/checkWork';
import fileSaver from 'file-saver';
export default {
  name: 'check_work',
  data() {
    return {
      students: {}
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
  methods: {
    format(value) {
      return value.replace(/-/g, ":");
    },
    export_file() {
      let result = '';
      this.students[0].students.forEach((item, index) => {
        result += `\n${item.student_name},${item.student_id},${this.format(this.students[0].absend_time)}`;
      });
      const exportContent = "\uFEFF";
      const str = `姓名,学号,迟到时间${result}`;
      const blob = new Blob([exportContent + str], { type: "text/plain;charset=utf-8" });
      fileSaver.saveAs(blob, `${this.students[0].cls_name}-${this.students[0].absend_date}.csv`);
    }
  },
  created() {
    if (this.$store.state.cls.curDate == '') {
      this.$router.push('/');
      return;
    };

    getDayAbsent({
        objDate: this.$store.state.cls.curDate,
        cls_name: this.$route.query.cls_name,
        email: this.$store.state.user.user.user_email
      })
      .then((respone) => {
        this.students = respone.data;
      }).catch((error) => {
        throw error;
      })
  }
}

</script>
<style lang="scss" scoped>
ul:last-of-type {
  .item:last-of-type {
    box-shadow: 0 3px 7px 1px #9b9ba9;
  }
}

p.noPerson {
  text-align: center;
  color: #000;
  margin-top: 5px;
}

.item {
  background-color: #fff;
  .time {
    font-size: 12px;
    margin-top: 8px;
  }
  padding: 10px 20px;
  border-bottom: 1px solid #f3f3f4;
  .numbers {
    color: #ccc;
    font-size: 12px;
  }
  i {
    color: #000;
  }
  .name {
    color: #000;
  }
  @media screen and (min-width: 768px) {
    &:hover {
      background-color: #f3f3f4;
    }
  }
}

#export-btn {
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
