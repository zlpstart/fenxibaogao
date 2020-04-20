// 引入vue模块
import Vue from 'vue'
// 引入根组件
import App from './App.vue'
// 引入路由
import router from './router'
// 引入vuex
import store from './store'
// 引入elementui
import ElementUI from 'element-ui';
// 引入elementui样式
import 'element-ui/lib/theme-chalk/index.css';
// // 引入nprogress
// import NProgress from 'nprogress'
// // 这个引入nprogress样式必须引入
// import 'nprogress/nprogress.css' 
// 重置样式
import '@/styles/reset.css'
// 引入根样式
import '@/styles/index.css'
// 引入bootstrap
// import 'bootstrap'
// 也可以在这里引入 bootstrap.css ;
import "bootstrap/dist/css/bootstrap.css"
//

// 简单配置
// NProgress.inc(0.2)
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// Vue.use(NProgress)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
