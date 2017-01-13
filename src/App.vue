<template>
  <div class="home">
    <div class="top_wrapper" >
      <top></top>
    </div>
    <div class="home-content" ref="scroll">
      <div>
        <swiper auto :list="bannerlist" height="180px" loop></swiper>
        <sort></sort>
        <div class="hotwrapper">
          <hot :hotimg="hotimg"></hot>
        </div>
        <div class="sights-wrapper">
          <sights :sightdata="sightsdata" ></sights>
        </div>
      </div>
    </div>
    <div class="citywarpper">
      <selectcity></selectcity>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import top from '../src/components/top/top.vue';
  import hot from '../src/components/hot/hot.vue';
  import selectcity from '../src/components/selectcity/selectcity.vue';
  import sorts from '../src/components/sorts/sorts.vue';
  import swiper from '../node_modules/vux/src/components/swiper/swiper.vue';
  import sights from '../src/components/sights/sights.vue';

  const URL = 'http://www.bjsjyw.cn';

  export default {
    data(){
      return {
        bannerlist: [],
        hotimg:[],
        sightsdata:[],
        height:"180"
      }
    },
    created(){
      let that = this;
      this.$http.get('/Api/index', {
        params: {
          lat: 116.404,
          lng: 39.915,
          province: 2
        }
      }).then((response) => {
        var response = JSON.parse(response.body);
        //热门景点 农家乐hot
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
        this.$nextTick(() => {
          if(!this.sroll){
            this.scroll = new BScroll(this.$refs.scroll,{
            })
          }else{
            this.scroll.refresh();
          }
        })
      })
    },
    methods: {

    },
    components: {
      "top": top,
      "swiper": swiper,
      "sort":sorts,
      "hot":hot,
      "sights":sights,
      "selectcity":selectcity
    }
  }

</script>

<style lang="less">
  //@import '../node_modules/vux/src/styles/1px.less';
  .home{
    position: absolute;
    top:0;
    bottom: 0;
    width:100%;
  }
  .home-content{
    position: absolute;
    top:0;
    bottom: 0;
    width:100%;
    overflow: hidden;
  }
  .hotwrapper{
    margin:12px 0 5px 0;
  }
  .citywarpper{
    position: absolute;
    top:0;
    left:0;
    bottom: 0;
    width:100%;
    background: #fff;
    z-index:20;
  }
</style>
