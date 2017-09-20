/**
 * 此文件是为了各个有使用到弹出框的组件而使用的混合
 */
import msgBox from 'components/msgBox.vue';
export default {
  data() {
    return {
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
    changeCfg(text, title) {
      this.config.showBox = true;
      this.config.showMask = true;
      this.config.text = text;
      this.config.title = title;
    }
  }
}
