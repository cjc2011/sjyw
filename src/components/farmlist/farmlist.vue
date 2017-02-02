<template>
  <div class="farm_content">
    <h1 class="farm_title">附近农家乐</h1>
    <div class="farm_warpper" v-if="farmdata.length">
      <ul class="farm_list">
        <li v-for="item in farmdata" class="farm_item" @click="farminfo(item)">
          <!--<router-link to="/farminfo">-->
            <div class="farm_top">
              <img class="farm_img" :src="url+item.farm_pic" >
              <span class="farm_coll"></span>
              <div class="farm_sell">
                <span class="now_price">¥{{item.farm_tickets || 0}}</span>
                <del class="old_price">原{{item.farm_tickets * 1.5}}</del>
              </div>
              <div class="farm_name">{{item.farm_name}}</div>
            </div>
            <div class="farm_main">
              <div class="farm_rank">
                <span class="farm_text">推荐指数:</span>
                <rater :value="4" disabled  :margin="0" :font-size="12"></rater>
              </div>
              <div class="farm_porject">
                <span class="porject" v-for="item in item.farm_program.split(',')">
                  {{item}}
                </span>
              </div>
              <div class="sell">
                <span class="farm_text">已售:{{item.sales || 0}}</span>
              </div>
            </div>
            <div class="farm_dsc">
              <p>{{item.farm_intro}}</p>
            </div>
          <!--</router-link>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const  URL = "http://www.bjsjyw.cn";
  import rater from '../../../node_modules/vux/src/components/rater/'
  export default {
    props: {
      farmdata: {
        type: Array
      }
    },
    data() {
      return {
        url: 'http://www.bjsjyw.cn'
      }
    },
    created() {

    },
    watch: {

    },
    methods: {
      farminfo(item) {
        this.$router.push({ path: 'farminfo', query: { id: item.id }});
      }
    },
    components: {
      "rater": rater
    }
  }
</script>

<style lang="less">
  .farm_title{
    padding: 0 10px 0px 35px;
    line-height:24px;
    font-size:14px;
    color: #333333;
    background: url("farm_icon.png") no-repeat 10px 0px;
    background-size: 17px;
  }
  .farm_list{
    font-size: 14px;
    .farm_item{
      position: relative;
      padding: 5px 10px 0px 10px;
      .farm_top{
        position: relative;
        height: 140px;
        .farm_img{
          display: block;
          width:100%;
          height:100%;
        }
        .farm_name{
          position: absolute;
          left:0;
          bottom: 10px;
          width: 135px;
          height: 30px;
          overflow: hidden;
          line-height: 30px;
          font-size: 14px;
          font-family: 黑体;
          text-align: center;
          color: #ffffff;
          text-shadow: black 2px -2px 1px;
          background: rgba(0, 0, 0, 0.5);
        }
        .farm_sell{
          display: flex;
          justify-content: space-between;
          position: absolute;
          right:0;
          bottom: 10px;
          width: 120px;
          height: 30px;
          padding: 0px 5px;
          line-height: 30px;
          box-sizing: border-box;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.5);
          .old_price{
            flex: 1;
            font-size:12px;
            text-align: center;
            color: #000;
          }
          .now_price{
            flex: 1;
            font-size:13px;
            text-align: center;
            color: #cc3300;
          }
        }
      }
      .farm_main{
        margin-top: 5px;
        color: #333;
        .farm_text{
          font-size: 10px;
          line-height: 14px;
        }
        .farm_rank{
          display: inline-block;
          font-size: 0;
        }
        .farm_porject{
          display: inline-block;
          margin-left: 5px;
          span{
            display: inline-block;
            padding: 0px 4px;
            margin-right: 4px;
            font-size: 9px;
            line-height: 14px;
            border-radius: 6px;
            color: #ffffff;
          }
          :nth-child(1){
            background: #ba68c8;
          }
          :nth-child(2){
            background: #ff5555;
          }
          :nth-child(3){
            background: #01bbd4;
          }
        }
        .sell{
          display: inline-block;
          float: right;
          width:50px;
        }
      }
      .farm_dsc{
        padding: 5px 0;
        p{
          font-size:12px;
          line-height: 16px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        /*display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;*/

      }
    }
  }
</style>
