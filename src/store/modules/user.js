import * as types from '../mutations.js';

const state = {
	user: {}
};

const mutations = {
	[types.SET_CURUSER](state,user) {
		state.user = user;
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