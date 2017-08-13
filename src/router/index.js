import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const calendar = resolve => require(['components/calendar.vue'], resolve);
const restor = resolve => require(['components/restor.vue'], resolve);
const import_restor = resolve => require(['components/import_roster.vue'], resolve);
const select_restor = resolve => require(['components/select_restor.vue'], resolve);
const check_work = resolve => require(['components/check_work.vue'], resolve);
const cls_call = resolve => require(['components/cls_call.vue'], resolve);
const select_cls = resolve => require(['components/select_cls.vue'], resolve);
const register = resolve => require(['components/register.vue'], resolve);
const login = resolve => require(['components/login.vue'], resolve);

export default new Router({
  mode: 'history',
  scrollBehavior: () => {
    y: 0
  },
  routes: [{
    path: '/',
    name: 'calendar',
    component: calendar
  }, {
    path: '/restor',
    name: 'restor',
    component: restor
  }, {
    path: '/import_roster',
    name: 'import_roster',
    component: import_restor
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
})
