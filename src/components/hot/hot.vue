<template>
  <div class="hot">
    <h1 class="title">当季热点</h1>
    <div class="hot-content" v-if="hotimg[0]">
      <div class="hot-left vux-1px-b">
        <a :href="hotimg[0].n_pic">
            <img :src="url+hotimg[0].s_pic" alt="热门主题">
            <h3 v-if="title" class="name" v-html="title[0]"></h3>
            <p v-if="content" class="desc" v-html="content[0]"></p>
        </a>
      </div>
      <div class="hot-right vux-1px-t" >
        <div class="hot-left-t">
          <a :href="hotimg[1].n_pic">
            <img :src="url+hotimg[1].s_pic" alt="热门主题">
            <h3 v-if="title" class="name" v-html="title[1]"></h3>
            <p v-if="title" class="desc" v-html="content[1]"></p>
          </a>
        </div>
        <div class="hot-left-b">
          <div class="hot-left-bl">
            <a :href="hotimg[2].n_pic">
              <img :src="url+hotimg[2].s_pic" alt="热门主题">
              <h3 v-if="title" class="name" v-html="title[2]"></h3>
              <p v-if="title" class="desc" v-html="content[2]"></p>
            </a>
          </div>
          <div class="hot-left-br">
            <a :href="hotimg[3].n_pic">
              <img :src="url+hotimg[3].s_pic" alt="热门主题">
              <h3 v-if="title" class="name" v-html="title[3]"></h3>
              <p v-if="title" class="desc" v-html="content[3]"></p>
            </a>
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
        title:[],
        content:[],
        url:URL
      }
    },
    created(){
      if(this.hotimg.length && !this.title.length){
        this.init();
      }
    },
    watch:{
      //值计算
      hotimg(){
        this.init();
      }
    },
    methods:{
      //html字符转义
      escape2Html(val){
        let arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        return val.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
      },
      init() {
        this.hotimg.forEach((data)=>{
          this.title.push(this.escape2Html(data.name));
          this.content.push(this.escape2Html(data.iname))
        })
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
    border-right: 1px solid #e6e6e6;
    flex:3.5;
    height:51vw;
    position:relative;
    .name{
      margin-top:15px;
    }
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
    position: relative;
    .hot-left-t{
      position: absolute;
      top:0;
      width:100%;
      height:25.5vw;
      box-sizing: border-box;
      border-bottom: 1px solid #e6e6e6;
      .name{
        margin-top:15px;
      }
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
      width:100%;
      position: absolute;
      bottom:0;
      box-sizing: border-box;
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
        background: #ffffff;
      }
    }
  }
  .name{
    position: relative;
    padding-left: 14px;
    box-sizing: border-box;
    line-height: 24px;
    z-index:2;
    font{
      font-family: 微软雅黑;
      font-size: 14px !important;
    }
  }
  .desc{
    position: relative;
    padding-left: 14px;
    line-height: 14px;
    box-sizing: border-box;
    font-size: 0px;
    z-index:2;
    font{
      font-family: 微软雅黑;
      font-size:12px !important;
    }
  }
}
</style>
