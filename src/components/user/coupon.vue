<template>
  <transition name="move">
    <div class="coupon_wapper">
      <div class="coupon_top">
        <span class="coupon_back" @click="back"></span>
        <h1>我的优惠券</h1>
      </div>
      <div class="counpon_content">
        <div class="tab_wapper">
          <tab :line-width=2 active-color='#01bbd4' v-model="index">
            <tab-item  class="vux-center" v-for="(item,index) in tab_list" >{{item}}</tab-item>
          </tab>
        </div>
        <img  class="no_counpon" width="75" height="90" src="no_coupon.jpg">
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Tab from '../../../node_modules/vux/src/components/tab/tab.vue';
  import TabItem from '../../../node_modules/vux/src/components/tab/tab-item.vue';

  export  default {
    data() {
      return {
        tab_list: ['可用','不可用'],
        index: 0
      }
    },
    methods: {
      back() {
        this.$emit('back');
      }
    },
    components: {
      Tab,
      TabItem
    }
  }
</script>

<style lang="less">
.coupon_wapper{
  position:absolute;
  bottom: 0;
  top:0;
  width: 100%;
  height: 100vh;
  background: #ffffff;
  .coupon_top{
    position: fixed;
    width: 100%;
    height: 40px;
    background: #ffffff;
    box-sizing: border-box;
    border-bottom: 1px solid #01bbd4;
    z-index: 10;
    h1{
      font-weight: 400;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #333;
    }
    .coupon_back{
      position: absolute;
      top: 13px;
      left: 15px;
      width: 13px;
      height: 13px;
      font-size: 20px;
      line-height: 1;
      color: #01bbd4;
      -webkit-transform: rotate(315deg);
      transform: rotate(315deg);
      border: 1px solid #01bbd4;
      border-right: none;
      border-bottom: none;
    }
  }
  .counpon_content{
    margin-top:  40px;
    .no_counpon{
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
</style>
