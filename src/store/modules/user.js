import * as types from '../mutations.js';
import { cookieLogin } from 'api/user';

const state = {
  user: {}
};

const mutations = {
  [types.SET_CURUSER](state, user) {
    state.user = user;
  }
};

const actions = {
  SET_USER({ commit, state }, token) {
  	return new Promise((resolve,reject) => {
	    cookieLogin(token)
	      .then(res => {
	        commit(types.SET_CURUSER, res.data[0]);
	        resolve();
	      })
	      .catch(err => {
	        throw new Error(err);
	        reject();
	      })
  	})
  }
};

const getters = {

};


export default {
  state,
  getters,
  actions,
  mutations
}
