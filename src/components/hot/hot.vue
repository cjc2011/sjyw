<template>
  <div class="hot">
    <h1 class="title">当季热点</h1>
    <div class="hot-content">
      <div class="hot-left vux-1px-b">
        <img :src="img[0]" alt="热门主题">
        <h3 class="name">{{{title[0]}}}</h3>
        <p class="desc">{{{content[0]}}}</p>
      </div>
      <div class="hot-right vux-1px-t">
        <div class="hot-left-t">
          <img :src="img[1]" alt="热门主题">
          <h3 class="name">{{{title[1]}}}</h3>
          <p class="desc">{{{content[1]}}}</p>
        </div>
        <div class="hot-left-b">
          <div class="hot-left-bl">
            <img :src="img[2]" alt="热门主题">
            <h3 class="name">{{{title[2]}}}</h3>
            <p class="desc">{{{content[2]}}}</p>
          </div>
          <div class="hot-left-br">
            <img :src="img[3]" alt="热门主题">
            <h3 class="name">{{{title[3]}}}</h3>
            <p class="desc">{{{content[3]}}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  const URL = 'http://www.bjsjyw.cn';
  export  default {
  //接受父组件穿的参数
    props:{
      hotimg:{
        type:Array
      }
    },
    data(){
      return {
        img:[],
        title:[],
        content:[]
      }
    },
    watch:{
      //值计算
      hotimg(){
        this.hotimg.forEach((data)=>{
          this.img.push(URL+data.s_pic);
          this.title.push(this.escape2Html(data.name));
          this.content.push(this.escape2Html(data.iname))
        })
      }
    },
    methods:{
      //html字符转义
      escape2Html(val){
        let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        return val.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
      }
    }
  }
</script>

<style lang="less">
  @import '../../../node_modules/vux/src/styles/1px.less';
.title{
  height:20px;
  padding-left:7px;
  margin-bottom: 5px;
  font-size:14px;
  line-height: 20px;
  border-left: 8px solid #ffcc00;

}
.hot-content{
  display: flex;
  padding:4px 0;
  background: #f7f6f6;
  position:relative;
  .hot-left{
    border-top: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    flex:3.5;
    height:51vw;
    position:relative;
    img{
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
  }
  .hot-right{
    flex:4;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    .hot-left-t{
      height:25.5vw;
      position: relative;
      border-bottom: 1px solid #e6e6e6;
      img{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
      }
    }
    .hot-left-b{
      display: flex;
      height:25.5vw;
      .hot-left-bl,.hot-left-br{
        flex:1;
        position: relative;
      }
      .hot-left-bl{
        border-right: 1px solid #e6e6e6;
      }
      img{
        position: absolute;
        height:100%;
        width: 100%;
      }
    }
  }
  .name{
    position: relative;
    padding-left: 14px;
    z-index:2;
    box-sizing: border-box;
    font{
      font-family: 微软雅黑;
      font-size: 15px !important;
    }
  }
  .desc{
    position: relative;
    z-index:2;
    padding-left: 14px;
    box-sizing: border-box;
    font-size: 0px;
    font{
      font-family: 微软雅黑;
      font-size:13px !important;
    }
  }
}
</style>
