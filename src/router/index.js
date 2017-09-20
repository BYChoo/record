import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const index = resolve => require(['views/index/index.vue'], resolve);
const options = resolve => require(['views/options/options.vue'], resolve);
const select_restor = resolve => require(['views/options/childrens/select_restor.vue'], resolve);
const check_work = resolve => require(['components/check_work.vue'], resolve);
const cls_call = resolve => require(['components/cls_call.vue'], resolve);
const select_cls = resolve => require(['views/options/childrens/select_cls.vue'], resolve);
const register = resolve => require(['views/register/register.vue'], resolve);
const login = resolve => require(['views/login/login.vue'], resolve);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => {
    y: 0
  },
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/options',
    name: 'options',
    component: options
  }, {
    path: '/select_restor',
    name: 'select_restor',
    component: select_restor
  }, {
    path: '/check_work',
    name: 'check_work',
    component: check_work
  }, {
    path: '/cls',
    name: 'cls',
    component: cls_call
  }, {
    path: '/select_cls',
    name: 'select_cls',
    component: select_cls
  }, {
    path: '/register',
    name: 'register',
    component: register
  }, {
    path: '/login',
    name: 'login',
    component: login
  }]
});

export default router;
