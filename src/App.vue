<template>
  <div class="top_wrapper">
    <top></top>
  </div>
  <swiper :show-desc-mask="false" style="margin:0 auto;" height="180px" :list="bannerlist" auto></swiper>
  <sorts></sorts>
  <hot :hotdata="hotdata"></hot>
</template>

<script type="text/ecmascript-6">
  import top from '../src/components/top/top.vue';
  import swiper from '../node_modules/vux/src/components/swiper/';
  import sorts from '../src/components/sorts/sorts.vue';
  import hot from '../src/components/hot/hot.vue';
  const URL = 'http://www.bjsjyw.cn/';


  export default {
    data(){
      return {
        bannerlist: [],
        hotdata: ['old']
      }
    },
    created(){
      this.$http.get('/Api/index', {
        params: {
          lat: 116.404,
          lng: 39.915,
          province: 2
        }
      }).then((response) => {
        var response = JSON.parse(response.body);
        //热门景点 农家乐hot
        this.hotdata = response.data.djrd;
        //添加轮播图
        response.data.ads.forEach((img) => {
          let obj = {};
          obj.url = "javascript:;";
          obj.img = URL + img.ads_pic;
          this.bannerlist.push(obj)
        })
      })
    },
    components: {
      "top": top,
      "swiper": swiper,
      "sorts": sorts,
      "hot":hot
    }
  }

</script>

<style lang="less">
  @import '../node_modules/vux/src/styles/1px.less';
</style>
