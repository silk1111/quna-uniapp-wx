import '@vue/composition-api'
import App from './App'
import store from './store/index.js'
import Vue from "vue";
import VueLazyLoad from "vue-lazyload";
import '@/assets/styles/iconfont/iconfont.css'
import '@/assets/styles/reset.css';
// #ifndef VUE3
Vue.config.productionTip = false
	
Vue.use(VueLazyLoad,{
	error: require('./assets/lazy-load-img/error.png'),
	loading: require('./assets/lazy-load-img/loading.gif')
})

App.mpType = 'app'
const app = new Vue({
    store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif