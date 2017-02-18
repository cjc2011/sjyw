<template>
  <div class="coll_warpper">
    <div class="coll_top">
      <span class="coll_back" @click="back"></span>
      <h1>我的收藏</h1>
    </div>
    <div class="coll_content">
      <tab :line-width=2 active-color='#01bbd4' v-model="index">
        <tab-item  class="vux-center" v-for="(item,index) in tab_list" >{{item}}</tab-item>
      </tab>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from '../../../node_modules/vux/src/components/tab/tab.vue';
  import TabItem from '../../../node_modules/vux/src/components/tab/tab-item.vue';
  export  default {
    data() {
      return {
        index:0,
        tab_list:['农家乐','景区']
      }
    },
    methods: {
      back() {
        this.$emit('back')
      }
    },
    components: {
      Tab,
      TabItem
    }
  }
</script>

<style lang="less">
.coll_warpper{
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  .coll_top{
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
    .coll_back{
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
  .coll_content{
    margin-top: 40px;
  }
}

</style>
