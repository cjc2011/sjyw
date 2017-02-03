import Vue from '../node_modules/vue/dist/vue';
import VueResource from 'vue-resource';
import VueRouter from "vue-router";
import App from './App.vue';
import sightinfo from '../src/components/sightinfo/sightinfo.vue';
import farminfo from '../src/components/farminfo/farminfo.vue';
import home from '../src/components/home/home.vue';
import './commont/css/reset.css';
import '../node_modules/vux/src/styles/reset.less'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);

let routes = [
  {path:'/',component: home},
  {path:'/sightinfo',component: sightinfo},
  {path:'/home',component: home},
  {path:'/farminfo',component: farminfo, meta: { requiresAuth: true }}
];
const router = new VueRouter({
  routes
});
/* eslint-disable no-new */
new Vue({
  el: '#root',
  components: {
    "app": App
  },
  router: router
}).$mount(App);

