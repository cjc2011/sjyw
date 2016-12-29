<template>
  <div class="top_wrapper">
    <top></top>
  </div>
  <swiper :show-desc-mask="false" style="margin:0 auto;" height="180px" :list="bannerlist" auto></swiper>
  <sorts></sorts>
  <div class="hotwrapper">
   <hot :hotimg="hotimg"></hot>
  </div>
  <div class="sights-wrapper">
    <sights :sightdata="sightsdata" ></sights>
  </div>
</template>

<script type="text/ecmascript-6">
  import top from '../src/components/top/top.vue';
  import swiper from '../node_modules/vux/src/components/swiper/';
  import sorts from '../src/components/sorts/sorts.vue';
  import hot from '../src/components/hot/hot.vue';
  import sights from '../src/components/sights/sights.vue';

  const URL = 'http://www.bjsjyw.cn';

  export default {
    data(){
      return {
        bannerlist: [],
        hotimg:[],
        sightsdata:[]
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
        console.log(response)
        this.hotimg = response.data.djrd;
        //热门景点
        this.sightsdata = response.data.sights;
        //添加轮播图
        response.data.ads.forEach((img) => {
          let obj = {};
          obj.url = "javascript:;";
          obj.img = URL + img.ads_pic;
          this.bannerlist.push(obj)
        })
        //热门景点

      })
    },
    components: {
      "top": top,
      "swiper": swiper,
      "sorts": sorts,
      "hot":hot,
      "sights":sights
    }
  }

</script>

<style lang="less">
  @import '../node_modules/vux/src/styles/1px.less';
  .hotwrapper{
    margin:12px 0 5px 0;
  }
</style>
