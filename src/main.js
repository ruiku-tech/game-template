// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'

import '@/assets/style/reset.css'
import 'vant/lib/index.css'

import {
  Popup,Toast,Notify,Field,Loading,Swipe, SwipeItem,Calendar,Icon
} from 'vant';

Vue.use(Popup);
Vue.use(Toast);
Vue.use(Notify);
Vue.use(Field);
Vue.use(Loading);
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Calendar)
Vue.use(Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

document.addEventListener("DOMContentLoaded",function(){
  FastClick.attach(document.body);
},false);