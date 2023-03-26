// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import router from './router'

import VueRouter from 'vue-router'

//使用图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.gif'
Vue.use(VueLazyload, {
loading
})

//全局导入使用
// //导入MintUi
// import MintUi from 'mint-ui'
// //使用mintui
// Vue.use(MintUi)
// //导入mintui全局css样式
// import 'mint-ui/lib/style.css'

//按需导入使用
import {Button} from 'mint-ui'  //导入组件
Vue.component(Button.name,Button) //注册组件
 
// 导入store对象
import store from './store'

const originalRepalce = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location) {
    return originalRepalce.call(this, location).catch(err => err)
}

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,  //挂载store
  components: { App },
  template: '<App/>'
})
