<template>
  <header class="top" :class="{ top_shadow: green}" ref="top">
    <div class="addrees" :class="{ green: green}" @click="cityshow">
      <span class="text">{{cityname}}</span>
      <span class="icon iconfont icon-down icon-down " :class="{ green: green}" ></span>
    </div>
    <div class="search-warpper" :class="{shadow:green}">
      <i class="icon weui_icon_search"></i>
      <input type="search" placeholder="假期去哪玩" @focus="fn">
    </div>
    <span  class="icon iconfont icon-wo" :class="{ green: green}" @click="showuser"></span>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    props :{
      cityname: {
        type: String
      }
    },
    data() {
      return {
        green: false
      }
    },
    //组件创建时 监听scroll事件 运动top组件的透明度
    mounted() {
      window.addEventListener('scroll',this.handleScroll)
    },
    //组件创建时 监听scroll事件 运动top组件的透明度
    beforeDestroy() {
      window.removeEventListener('scroll',this.handleScroll)
    },
    methods:{
      fn(){
        this.$router.push('search')
      },
      cityshow(){
        this.$router.push('/selectcity')
      },
      showuser(){
        this.$router.push('user')
      },
      handleScroll() {
        let opacity = (100 - document.body.scrollTop) /100 > 0 ? (100 - document.body.scrollTop) /100: 0 ;
        opacity = (1-opacity).toFixed(2);
        if(opacity > 0.2){
          this.green = true;

        }else{
          this.green = false;
        }
        this.$refs.top.style.background = "rgba(255,255,255,"+opacity+")";
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import "../../commont/css/iconfont.css";
  @top_color:#85e1e1;

  .green{
    color: #85e1e1 !important;
  }

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
    &.top_shadow{
      box-shadow: 0 0 4px #999999;
    }
    .addrees {
      font-size: 0;
      color: #ffffff;
      max-width: 70px;
      @media only screen and (max-width: 320px){
        max-width: 60px;
      }
      .text {
        display: inline-block;
        max-width:50px;
        font-size: 14px;
        text-overflow:ellipsis;
        white-space: nowrap;
        overflow: hidden;
        vertical-align:bottom;
        @media only screen and (max-width: 320px){
          max-width: 40px;
          font-size: 12px;
        }
      }
      .icon {
        margin-left: 2px;
        display: inline-block;
        font-size: 8px;
        line-height: 20px;
        @media only screen and (max-width: 320px){
          margin-left: 2px;
        }
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
      @media only screen and (max-width: 320px){
        width: 200px;
      }
      .icon {
        position: absolute;
        top: 6px;
        left: 12px;
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
        @media only screen and (max-width: 320px){
          font-size: 11px;
        }
      }
      input::-webkit-input-placeholder {
        color: @top_color;
      }
    }
    .shadow{
      box-shadow: 0px 0px 2px #e8e3e3;
    }
    .icon-wo {
      line-height: 1;
      font-size: 20px;
      color: #ffffff;

    }
  }

</style>
