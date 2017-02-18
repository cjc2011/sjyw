<template>
  <div class="opinion_warpper">
    <div class="opinion_top">
      <span class="opinion_back" @click="back"></span>
      <h1>意见反馈</h1>
    </div>
    <div class="opinion_content">
      <h1 class="opinion_title">写下您宝贵的意见吧！</h1>
      <textarea resize="none"></textarea>
      <a class="opinion_btn">提交</a>
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
.opinion_warpper{
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  .opinion_top{
    position: fixed;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #01bbd4;
    background: #ffffff;
    z-index: 10;
    h1{
      font-weight: 400;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #333;
    }
    .opinion_back{
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
  .opinion_content{
    margin-top: 40px;
    padding: 10px 15px;
    .opinion_title{
      font-size: 14px;
      line-height: 24px;
      color: #01bbd4;
    }
    textarea{
      margin-top: 10px;
      padding: 5px;
      height: 200px;
      width: 100%;
      font-size: 14px;
      line-height: 24px;
      border-radius: 10px;
      box-sizing: border-box;
      border: 1px solid #01bbd4;
      outline: none;
      resize: none;
    }
    .opinion_btn {
      display: block;
      width: 200px;
      height: 40px;
      margin: 10px auto;
      line-height: 40px;
      text-align: center;
      background: #01bbd4;
      color: #ffffff;
      border-radius: 6px;
    }
  }
}
</style>
