<template>
  <div class="home_content" v-if="home_data" ref="home_content">
    <div>
    <swiper auto :list="bannerlist" height="180px" loop></swiper>
    <sort></sort>
    <div class="hotwrapper">
      <hot :hotimg="hotimg"></hot>
    </div>
    <div class="sights-wrapper">
      <sights v-on:singhtinfo="change_sightinfo" :sightdata="sightsdata" ></sights>
    </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import sorts from '../../../src/components/sorts/sorts.vue';
  import swiper from '../../../node_modules/vux/src/components/swiper/swiper.vue';
  import hot from '../../../src/components/hot/hot.vue';
  import sights from '../../../src/components/sights/sights.vue';
  import Bscroll from 'better-scroll';
  const URL = 'http://www.bjsjyw.cn';

export  default {
  props: {
    home_data: {
      type: Object
    }
  },
  data() {
    return {
      bannerlist: [],
      hotimg: [],
      sightsdata: []
    }
  },
  created(){
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
      this.init_scroll();
    },
    change_sightinfo(data){
      this.$emit('change_sightinfo',data);
    },
    init_scroll() {
      this.$nextTick( () => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.home_content,{
            click:true
          })
        }else{
          this.scroll.refresh();
        }
      })
    }
  },
  components: {
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
    overflow: hidden;
  }
</style>
