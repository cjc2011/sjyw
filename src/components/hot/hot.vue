<template>
  <div class="hot">
    <h1 class="title">当季热点</h1>
    <div class="hot-content">
      <div class="hot-right">
        <img :src="hotdata[1].s_pic">
      </div>
      <div class="hot-left">
        <div class="hot-left-t"></div>
        <div class="hot-left-b">
          <div class="hot-left-bl"></div>
          <div class="hot-left-br"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export  default {
  //接受父组件穿的参数
    props:{
      hotdata:{
        type:Array
      }
    },
    data(){
      return {
        ar:[1,2,3,5,4]
      }
    },
    created(){
    //生命周期
      console.log(this.hotdata)
    },
    computed:{
      //计算属性
      urlist(){
        /*let imaArr = [];
        for(let i=0;i<this.hotdata.length;i++){
          console.log(i)
        }*/
      }
    },
    methods: {

    }
  }
</script>

<style lang="less">

</style>
