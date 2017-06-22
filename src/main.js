import Vue from 'vue';
import App from './App';
import router from './router';
import vueResource from 'vue-resource';
import store from './store';

Vue.use(vueResource);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
