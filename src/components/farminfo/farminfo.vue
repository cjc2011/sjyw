<template>
  <div class="farminfo">
    <div class="tab_wapper">
      <tab :line-width=2 active-color='#01bbd4' v-model="index">
        <tab-item  class="vux-center" v-for="(item,index) in tab_list" @on-item-click="show(item,index)">{{item}}</tab-item>
      </tab>
    </div>
    <swiper v-model="index" height="100%" :show-dots="false" animate:false>
        <swiper-item  ref="swiper" :is=currentView :farm_data="farm_data"></swiper-item>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from '../../../node_modules/vux/src/components/tab/tab.vue';
  import TabItem from '../../../node_modules/vux/src/components/tab/tab-item.vue';
  import Swiper from '../../../node_modules/vux/src/components/swiper/swiper.vue';
  import SwiperItem from '../../../node_modules/vux/src/components/swiper/swiper-item.vue';
  import translate from './translate.vue';
  import dsc from './dsc.vue';
  import around  from './around.vue';



  export default {
    data() {
      return {
        tab_list: ['介绍', '详情', '周边'],
        tab_content: [translate, dsc, around],
        index: 0,
        tab_title: '介绍',
        currentView: translate,
        farm_data: {}
      }
    },
    created() {
      let that = this;
      this.$http.get('/Api/farm_show', {
        params: {
          "id": this.$route.query.id
        }
      }).then((response) => {
        let data = response.body.data;
        console.log(data)
        that.farm_data = data;
        console.log(that.farm_data)
      })
    },
    methods: {
      show(item, index) {
        this.title = item;
        this.currentView = this.tab_content[index];
      }
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      translate,
      dsc,
      around
    }
  }
</script>

<style lang="less">
@import '../../../node_modules/vux/src/styles/reset.less';
.farminfo{
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  width: 100%;
  .tab_wapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 20;
    background: #ffffff;
    .vux-tab{
      width: calc(~"100% - 120px");
      margin:0 60px;
    }
    .vux-tab .vux-tab-item{
      background: none;
    }
  }
  .vux-slider{
    position: absolute;
    top: 46px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }

}

</style>
