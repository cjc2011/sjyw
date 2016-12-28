<template>
  <div class="top_wrapper">
    <top></top>
  </div>

  <swiper :show-desc-mask="false" style="margin:0 auto;" height="180px" :list="bannerlist" auto></swiper>

</template>

<script type="text/ecmascript-6">
import top from '../src/components/top/top.vue';
import swiper from '../node_modules/vux/src/components/swiper/'
const URL = 'http://www.bjsjyw.cn/';
export default {
  data(){
    return {
      bannerlist:[]
    }
  },
  created(){
    this.$http.get('/Api/index').then((response)=>{
      var response =JSON.parse(response.body);
      response.data.ads.forEach((img) => {
        let obj = {};
        obj.url = "javascript:;";
        obj.img = URL+img.ads_pic;
        this.bannerlist.push(obj)
      })
    })
  },
  components:{
    "top":top,
    "swiper":swiper
  }
}

</script>

<style lang="less">

</style>
