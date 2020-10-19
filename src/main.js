// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 

import utils from './utils'
import http from './utils/http'
import store from './store'

import Toast from '@/utils/toast'
import Groups from '@/components/groups/index'


import filters from './utils/filters'
// 遍历注册全局过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// 主题色
import '../theme/index.css'
// 气泡
import '@/assets/css/toast.css'
// 覆盖样式
import '@/assets/css/reset.css'


Vue.config.productionTip = false

// 引入UI框架
Vue.use(ElementUI)
// 用于改变组件的默认尺寸
// Vue.use(Element, { size: 'small' });

Vue.use(utils)
Vue.use(http)
Vue.use(Toast)
Vue.use(Groups)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
