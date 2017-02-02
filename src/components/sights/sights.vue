<template>
  <div class="sights">
    <h1 class="title">当前城市热点景区</h1>
    <ul class="sights-list">
      <li class="sights-item" v-for="sight in sightdata" @click="singhtinfo($event,sight)" >
        <div class="sight-warpper">
          <div class="sight-top">
            <img class="sight-pic" width="100%" :src="url + sight.sights_pic" alt="sight.sights_name" title="sight.sights_name">
            <h1 class="name">{{sight.sights_name}}</h1>
            <span class="icon iconfont icon-xin"></span>
          </div>
          <div class="sight-content" >
            <div class="leav">
              <span class="text">景区等级:</span>
              <rater :value=3 star="A" disabled  :margin="-2" :font-size="12"></rater>

            </div>
            <ul class="project">
              <li class="project-item" v-for="pro in split(sight.sights_program)">
                {{pro}}
              </li>
            </ul>
            <div class="sell">
              距离:<span>{{sight.juli/1000}}km</span>
            </div>
          </div>
          <div class="text">{{sight.sights_intro}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import rater from '../../../node_modules/vux/src/components/rater/'

  export  default {
    props:{
      sightdata:{
        type:Array
      }
    },
    data(){
      return {
        url:'http://www.bjsjyw.cn/'
      }
    },
    methods: {
      split(str){
        let arr = str.split(',').slice(0,2);
        return arr
      },
      //首页点击景点列表 改变父组件的props参数
      singhtinfo(event,data){
        this.$emit('singhtinfo',data);
        this.$router.push('sightinfo');
      }
    },
    components: {
      "rater": rater
    }
  }
</script>

<style lang="less">
  @import '../../../node_modules/vux/src/styles/1px.less';
  .sights{
    margin-top:15px;
  }
  .sights-item{
    display: block;
    margin-bottom:20px;
    .sight-top{
      position: relative;
      height:140px;
      .sight-pic{
        position: absolute;
        top:0;
        left:0;
        height:140px;
      }
      .name{
        position: absolute;
        top:104px;
        left:0;
        width:135px;
        height:30px;
        line-height:30px;
        font-size:14px;
        font-family: 黑体;
        text-align: center;
        text-shadow: black 2px -2px 1px ;
        color: #ffffff;
        background: rgba(0,0,0,0.5);
        overflow: hidden;
      }
      .icon{
        position: absolute;
        right: 25px;
        top:0px;
        width:30px;
        height:44px;
        line-height: 44px;
        text-align: center;
        font-size:20px;
        color: #ffffff;
        background: #01bbd4;
      }
    }
    .sight-content{
      padding: 5px 6px;
      font-size: 0;
      .leav{
        display: inline-block;
        font-size:0px;
        .text{
          display: inline-block;
          padding: 0;
          font-size: 10px;
          line-height: 12px;
          color: #666666;
        }
      }
      .project{
        display: inline-block;
        font-size: 0;
        margin-left: 5px;
        .project-item{
          display: inline-block;
          padding: 0px 6px;
          margin-right: 8px;
          font-size: 10px;
          line-height: 12px;
          text-align: center;
          color: #ffffff;
          border-radius:4px;
        }
        .project-item:nth-child(1){
          background: #ba6ac6;
         }
        .project-item:nth-child(2){
          background: #ff6666;
        }
        .project-item:nth-child(3){
           background: #01bbd4;
         }
      }
      .sell{
        float:right;
        margin-top: 1px;
        font-size: 10px;
        line-height: 14px;
        color: #666666;
        text-align: right;
      }
    }
    .text{
      padding:0px 6px;
      font-size:12px;
      line-height: 16px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

</style>
