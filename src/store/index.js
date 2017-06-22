import Vue from 'vue';
import Vuex from 'vuex';
import cls from './modules/cls.js';
import user from './modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cls,user
  },
})