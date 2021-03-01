import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'   //全部导入
Vue.use(ElementUI)
Vue.prototype.$message = Message

import axios from 'axios'
//确定接口
axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'
Vue.prototype.$http = axios

import "./assets/css/global.css"  //导入全局样式表


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
