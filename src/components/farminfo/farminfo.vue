<template>
  <div class="farminfo">
    <tab :line-width=2 active-color='#01bbd4' v-model="index">
      <tab-item class="vux-center" v-for="(item,index) in tab_list" @on-item-click="show(item,index)">{{item}}</tab-item>
    </tab>
    <swiper v-model="index" height="100vh" :show-dots="false" animate:false>
      <keep-alive>
        <swiper-item  ref="swiper" :is=currentView :farm_data="farm_data"></swiper-item>
      </keep-alive>
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
      this.$http.get('/Api/farm_show', {
        params: {
          "id": this.$route.query.id
        }
      }).then((response) => {
        let data = JSON.parse(response.body).data;
        this.farm_data = data;
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
  .vux-tab{
    position: fixed;
    top: 0;
    left: 0;
    width: calc(~"100% - 120px");
    margin:0 60px;
    z-index: 20;
  }
  .vux-tab .vux-tab-item{
    background: none;
  }
  .vux-slider{
    top: 46px;
    .vux-swiper{
      height:calc(~"100vh - 46px") !important;
    }
  }

}

</style>
