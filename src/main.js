import Vue from '../node_modules/vue/dist/vue';
import App from './App.vue';
import Mint from 'mint-ui';
import VueResource from 'vue-resource';
import reset from './commont/css/reset.css';

Vue.use(Mint);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#root',
  components: {
    "app": App
  }
}).$mount(App)
