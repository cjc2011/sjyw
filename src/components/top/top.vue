<template>
  <header class="top">
    <div class="addrees" @click="cityshow">
      <span class="text">{{cityname}}</span>
      <span class="icon iconfont icon-down icon-down"></span>
    </div>
    <div class="search-warpper">
      <i class="icon weui_icon_search"></i>
      <input type="search" placeholder="假期去哪玩">
    </div>
    <span class="icon iconfont icon-wo"></span>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    props :{
      cityname: {
        type: String
      }
    },
    methods:{
      cityshow(){
        this.cityselecshow = !this.cityselecshow;
        this.$emit('cityshow')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "../../commont/css/iconfont.css";
  @top_color:#85e1e1;

  .top {
    position: fixed;
    left: 0px;
    width: 100%;
    display: flex;
    height: 40px;
    background: rgba(255, 255, 255, 0);
    align-items: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 15px;
    justify-content: space-between;
    z-index:10;
    .addrees {
      font-size: 0;
      color: #ffffff;
      max-width: 70px;
      .text {
        display: inline-block;
        max-width:50px;
        font-size: 15px;
        text-overflow:ellipsis;
        white-space: nowrap;
        overflow: hidden;
        vertical-align:bottom;
      }
      .icon {
        display: inline-block;
        font-size: 8px;
      }

    }
    .search-warpper {
      height: 30px;
      width: 250px;
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.3);
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      border-radius: 15px;
      padding: 0 30px;
      .icon {
        position: absolute;
        top: 6px;
        left: 15px;
        line-height: 1;
      }
      .weui_icon_search:before {
        color: @top_color;
      }

      input {
        width: 100%;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        font-size: 13px;
        line-height: 1;
        color: #000000;
        outline: none;
        background: transparent;
        border: none;
      }
      input::-webkit-input-placeholder {
        color: @top_color;
      }
    }
    .icon-wo {
      line-height: 1;
      font-size: 20px;
      color: #ffffff;

    }
  }

</style>
