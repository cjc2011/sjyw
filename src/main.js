import Vue from '../node_modules/vue/dist/vue';
import VueResource from 'vue-resource';
import VueRouter from "vue-router";
import App from './App.vue';
import sightinfo from '../src/components/sightinfo/sightinfo.vue';
import farminfo from '../src/components/farminfo/farminfo.vue';
import home from '../src/components/home/home.vue';
import selectcity from '../src/components/selectcity/selectcity.vue';
import teamcustom from '../src/components/teamcustom/teamcustom.vue';
import searchlist from '../src/components/searchlist/searchlist.vue';
import user from '../src/components/user/user.vue';
import login from '../src/components/login/login.vue';
import './commont/css/reset.css';
import '../node_modules/vux/src/styles/reset.less'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);

let routes = [
  {path:'/',component: home},
  {path:'/home',component: home},
  {path:'/sightinfo',component: sightinfo},
  {path:'/farminfo',component: farminfo, meta: { requiresAuth: true }},
  {path:'/selectcity',component:selectcity},
  {path:'/teamcustom',component:teamcustom},
  {path:'/searchlist',component: searchlist},
  {path:'/user',component: user},
  {path:'/login',component: login}
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

