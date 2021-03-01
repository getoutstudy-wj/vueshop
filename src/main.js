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



/*
git操作；
先检查状态 git status
合并修改 git add .
再检查状态 git status
提交状态 git commit -m "提交附代文本信息"
检查提交分支 git branch
将分支代码合并到主分支 : 切换到主分支 git checkout master
检查 git branch
合并 git merge login
将master主分支远程推送到码云中 git push
提交login子分支 切换:git checkout login  检查： git branch 
第一次推送子分支  git push -u orgin login
今后写的源代码，测试没问题，合并主分支，主分支和子分支一并推送云端仓库中
*/
