import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const calendar      = () => import ('../components/calendar.vue');
const restor        = () => import ('../components/restor.vue');
const import_restor = () => import ('../components/import_roster.vue');
const select_restor = () => import ('../components/select_restor.vue');
const check_work    = () => import ('../components/check_work.vue');
const cls_call      = () => import('../components/cls_call.vue');
const select_cls    = () => import('../components/select_cls.vue');
const register      = () => import('../components/register.vue');
const login         = () => import('../components/login.vue');

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
