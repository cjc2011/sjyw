<template>
  <div class="home_content" v-if="home_data" ref="home_content">
    <div class="top_wrapper" ref="top" >
      <top v-on:cityshow="showchange" :cityname="cityname"></top>
    </div>
    <swiper auto :list="bannerlist" height="180px" loop></swiper>
    <sort></sort>
    <div class="hotwrapper">
      <hot :hotimg="hotimg"></hot>
    </div>
    <div class="sights-wrapper">
      <h1 class="title">当前城市热点景区</h1>
      <sights  :sightdata="sightsdata" ></sights>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import sorts from '../../../src/components/sorts/sorts.vue';
  import swiper from '../../../node_modules/vux/src/components/swiper/swiper.vue';
  import hot from '../../../src/components/hot/hot.vue';
  import sights from '../../../src/components/sights/sights.vue';
  import top from '../top/top.vue';

  const URL = 'http://www.bjsjyw.cn';

export  default {
  props: {
    home_data: {
      type: Object
    },
    cityname: {
      type: String
    }
  },
  data() {
    return {
      bannerlist: [],
      hotimg: [],
      sightsdata: []
    }
  },
  mounted(){
    if(this.home_data.ads){
      this.main();
    }
  },
  watch: {
    home_data() {
      this.main();
    }
  },
  methods: {
    showchange() {
      this.$emit("showchange")
    },
    main() {
      //添加轮播图
      if(!this.bannerlist.length){
        this.home_data.ads.forEach((img) => {
          let obj = {};
          obj.url = "javascript:;";
          obj.img = URL + img.ads_pic;
          this.bannerlist.push(obj)
        })
      };
      //热门景点 农家乐hot
      if (this.home_data.djrd) {
        this.hotimg = this.home_data.djrd;
      };
      //热门景点
      this.sightsdata = this.home_data.sights;
      //this.init_scroll();
    }
  },
  components: {
    "top": top,
    "swiper": swiper,
    "sort": sorts,
    "hot": hot,
    "sights": sights,
  }
}
</script>

<style lang="less">
  .home_content{
    position: absolute;
    top:0;
    bottom: 0;
    width:100%;
    z-index:9;

  }
</style>
