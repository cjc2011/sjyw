<template>
  <div class="feedback_warpper">
    <div class="feedback_top">
      <span class="feedback_back" @click="back"></span>
      <h1>我要加盟</h1>
    </div>
    <div class="feedback_content">
      <h1 class="head_title">我要加盟:</h1>
      <ul class="input_list">
        <li>
          <label for="name">农家乐名称:</label>
          <input type="text" id="name">
        </li>
        <li>
          <label for="city">所在城市:</label>
          <input type="text" id="city">
        </li>
        <li>
          <label for="address">商家地址:</label>
          <input type="text" id="address">
        </li>
        <li>
          <label for="mobile">联系电话:</label>
          <input type="tel" id="mobile">
        </li>
        <li class="last">
          <label for="name">负责人:</label>
          <input type="text" id="name">
        </li>
      </ul>
      <a class="feedback_btn">提交</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods:{
      back(){
        this.$emit('back')
      }
    }

  }
</script>

<style lang="less">
  .feedback_warpper{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #ffffff;
    .feedback_top{
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
      .feedback_back{
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
    .feedback_content{
      margin-top: 40px;
      .head_title{
        margin: 10px 0;
        padding-left: 15px;
        padding-top: 10px;
        font-size: 14px;
        color: #9ae4ef;
      }
      .input_list{
        margin:5px 10px;
        padding:0 10px;
        background: #9ae4ef;
        border-radius: 10px;
        li{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height:50px;
          border-bottom: 1px solid #ffffff;
          label{
            margin-right: 5px;
            font-size: 14px;
            color: #fff;
          }
          input{
            font-size: 14px;
            outline: none;
            background: rgba(255,255,255,0);
          }
        }
        .last{
          border: none;
        }
      }
      .feedback_btn{
        display: block;
        width: 50%;
        margin: 30px auto;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        color: #fff;
        background: #01bbd4;
        border-radius: 10px;
      }
    }
  }
</style>
