<template>
  <div class="about_warpper">
    <div class="about_top">
      <span class="about_back" @click="back"></span>
      <h1>关于四季游玩</h1>
    </div>
    <div class="about_content">
      <img class="sjyw_img" width=145  height=64 src="sjyw.jpg">
      <p>
        四季游玩app由北京四季游玩网络科技有限公司开发并运营，专注于城市周边游！在风起云涌的在线旅游市场，专注于乡村旅游市场，颠覆景区住宿，撬动农村闲置资源，并尝试建立行业标准，规范行业管理。除了对接农家乐和游客的需求，它在新农村建设、农村留守人员就业及带动当地经济发展等方面，发挥了自己的作用，产生良好的社会效应。
      </p>
      <p>
        四季游玩， 以乡村旅游为切入点，基于O2O模式，在线上和线下为商家与游客建立交易服务渠道，让游客更精准地找到适季的景区和优质的农家乐。四季游玩的使命是帮助全中国200万家农家乐致富，让超过3000万的从业者受益，让超过1亿游客能够体验近郊旅游、乡村旅游带给他们的乐趣。
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.$emit('back')
      }
    }
  }
</script>

<style lang="less">
  .about_warpper{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    .about_top{
      position: fixed;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #01bbd4;
      background: #ffffff;
      box-sizing: border-box;
      z-index: 10;
      h1{
        font-weight: 400;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        color: #333;
      }
      .about_back{
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
    .about_content{
      margin-top: 40px;
      text-align: center;
      .sjyw_img{
        margin:40px auto 20px;
      }
      p{
        margin:10px 15px;
        font-size: 14px;
        font-family: 黑体;
        text-indent: 2em;
        line-height: 24px;
        color: #333;
        text-align: left;
      }
    }
  }

</style>
