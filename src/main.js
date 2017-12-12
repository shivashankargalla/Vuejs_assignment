// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import store from './vuex/store';
import router from './router';
import App from './App';

window.$ = window.jQuery = require('jquery');  // eslint-disable-line
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');

const vueMoment = require('vue-moment');

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(vueMoment);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
