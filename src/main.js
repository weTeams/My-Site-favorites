// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'   // 1、在这里引入axios
import VueResource from 'vue-resource'
import echarts from 'echarts'
import store from './vuex/store.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
    // use
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'


import instance_ from './api/index';

Vue.prototype.instance = instance_  //axios实例
Vue.prototype.$axios = axios;   // 2、全局注册，使用方法为:this.$axios

Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
Vue.use(VueResource)
Vue.use(mavonEditor)
Vue.use(VueHighlightJS)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,// 在vue实例全局引入store对象
  components: { App },
  template: '<App/>',

})
//在main.js定义自定义指令
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
