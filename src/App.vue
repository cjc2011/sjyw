<template>
  <div class="top_wrapper" >
    <top></top>
  </div>

  <scroller lock-x lockY scrollbar-y use-pulldown :pulldown-config={content:'下拉刷新',downContent:'下拉刷新',upContent:'释放刷新',loadingContent:'加载中'} height="667px" @pulldown:loading="load" v-ref:scroller>
    <div id="box" >
      <swiper :show-desc-mask="false" style="margin:0 auto;" height="180px" :list="bannerlist" auto></swiper>
      <sorts></sorts>
      <div class="hotwrapper">
       <hot :hotimg="hotimg"></hot>
      </div>
      <div class="sights-wrapper">
        <sights :sightdata="sightsdata" ></sights>
      </div>
    </div>
  </scroller>
</template>

<script type="text/ecmascript-6">
  import scroller from '../node_modules/vux/src/components/scroller/index.vue'
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
        this.$nextTick(()=>{
          this.$refs.scroller.reset()
        })
        //热门景点
      })
    },
    methods: {
      reset(){
        console.log(1)
      },
      load(uuid){
        this.$http.get('/Api/sights_show', {
          params: {
            id: 222
          }
        }).then((response)=>{
          this.$broadcast('pulldown:reset',uuid)
        })
      }
    },
    components: {
      "scroller":scroller,
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
