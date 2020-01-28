// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'   // 1、在这里引入axios
import VueResource from 'vue-resource'

import instance_ from './api/index';

Vue.prototype.instance = instance_  //axios实例
Vue.prototype.$axios = axios;   // 2、全局注册，使用方法为:this.$axios

Vue.use(ElementUI);
Vue.use(VueResource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
