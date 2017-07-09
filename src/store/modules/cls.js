import * as types from '../mutations.js';

const state = {
	allCls: [], // 所有班级
	curDate: ''
};

const mutations = {
	[types.SET_ALLCLS] (state, cls) {
		state.allCls = cls;
	},
	[types.SET_CURDATE] (state, date) {
		state.curDate = date;
	},
	[types.CONCAT_ALLCLS] (state, cls) {
		state.allCls = state.allCls.concat(cls);
	}
};

const getters = {

};

const actions = {

};

export default {
	state,
  getters,
  actions,
  mutations
}