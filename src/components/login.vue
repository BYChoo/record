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
import mixin_msgBox from '../mixin/msgBox.js';
import { sendLogin } from 'api/login';
import { setCookie } from 'api/user';
export default {
  name: 'login',
  mixins: [mixin_msgBox],
  data() {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    send_login() {
      sendLogin(this.user)
        .then((respone) => {
          if (respone.data == 'fail') {
            this.changeCfg('请检查用户邮箱或密码是否正确', '登录失败');
          } else {
            setCookie({ name: 'token', val: respone.data[0].user_email });
            this.$store.commit('SET_CURUSER', respone.data[0]);
            this.$router.push('/');
          }
        })
        .catch((error) => {
          throw new Error(error);
        })
    }
  }
}

</script>
<style lang="scss" scoped>
#form {
  padding-bottom: 20px;
  .title {
    font-size: 22px;
    color: #fff;
    padding: 20px;
    background-color: #086ed5;
    a {
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
    input {
      -webkit-box-shadow: 0 0 0px 1000px white inset;
      outline: none;
      width: 100%;
      height: 30px;
      border: none;
      border-bottom: 1px solid #ccc;
    }
    select {
      width: 100%;
      height: 30px;
      border: none;
      border-bottom: 1px solid #ccc;
      appearance: none;
    }
  }
  button {
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
