import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//引入axios
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000"
Vue.prototype.axios = axios

//引入mintui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


//引入moment
import moment from 'moment'
Vue.prototype.moment = moment



//引入清除query地址栏参数的工具
import merge from 'webpack-merge';
Vue.prototype.merge = merge


//引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
