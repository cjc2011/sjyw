<template>
    <div class="wallet_wapper">
      <div class="wallet_top">
        <span class="wallet_back" @click="back"></span>
        <h1>我的钱包</h1>
      </div>
      <p>此功能暂未开放:)</p>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back(){
        this.$emit('back')
      }
    }
  }
</script>

<style lang="less">
.wallet_wapper{
  position:absolute;
  bottom: 0;
  top:0;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  background: #ffffff;
  .wallet_top{
    position: fixed;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    z-index: 10;
    h1{
      font-weight: 400;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #333;
    }
    .wallet_back{
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
  p{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    color: #666;
  }
}
</style>
