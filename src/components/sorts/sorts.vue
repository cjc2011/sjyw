<template>
  <div class="sorts vux-1px-b">
    <div class="sorts-item">
      <img width="56" height="46" src="sorts_img1.png">
      <p class="name">景区</p>
    </div>
    <div class="sorts-item">
      <img width="56" height="46" src="sorts_img2.png">
      <p class="name">农家乐</p>
    </div>
    <div class="sorts-item">
      <img width="56" height="46" src="sorts_img3.png">
      <p class="name">团队定制</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export  default {

  }
</script>

<style lang="less">
  @import '../../../node_modules/vux/src/styles/1px.less';
  .sorts{
    display: flex;
    padding:12px 0;
    font-size:0px;
    border-bottom: 1px solid #cccccc;
    .sorts-item{
      flex:1;
      text-align: center;
      .name{
        font-size: 11px;
        font-family: 微软雅黑;
      }
    }
  }


</style>
