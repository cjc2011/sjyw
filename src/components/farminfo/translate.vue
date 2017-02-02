<template>
<div class="famr_translate_wapper" style="position:absolute;top:0;bottom:0;width:100%;overflow:hidden;">
  <popup v-model="show1">
    <div class="popup2">
      <group>
      this is the second popup
      </group>
    </div>
  </popup>
  <div class="famr_translate" ref="famr_translate">
    <div class="farm_scroll">
      <div class="farmop" v-if="farm_data.farm">
        <div class="sliderwarpper">
          <div class="swiper-container" ref="swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide"  v-for="swipe in farm_data.farm.farm_pic">
                <img :src="url+swipe">
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <h2 class="farmname" v-if="farm_data.farm">{{ farm_data.farm.farm_name }}</h2>
        <div class="farmMsg" v-if="farm_data.farm">
          <div class="farmMsg_left">
            <div class="farmGrade">
              <span class="text">推荐指数:</span>
              <div class="gradewarpper">
                <rater :value="farm_rank"  disabled  :margin="0" :font-size="14"></rater>
              </div>
            </div>
            <div class="farmDistant">
              <span class="text">当前距离:</span>
              <span class="distant">{{ farm_data.farm.farm_distance}}km</span>
            </div>
            <div class="farmProject">
              <span class="text">游玩项目:</span>
              <span class="project" v-for="item in farm_data.farm.farm_program.split(',')">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="farm_addres">
          <span class="addres_icon"></span>
          <div class="addres_cotent">
            <div class="addres_text">{{farm_data.farm.farm_address}}</div>
            <span class="addres_tel">{{farm_data.farm.farm_tel}}</span>
          </div>
          <span class="addres_details"></span>
        </div>
        <div class="farmdsc" v-if="farm_data.farm">
          <h2 class="dightdsc_title" @click="showpopup">农家乐简介</h2>
          <ul class="dscwapper" @click="dscshow" v-bind:class="{'dscshow':show}">
            <li v-for="dsc in farm_data.farm.farm_intro.split(' ')" class="dscitem">{{dsc}}</li>
          </ul>
        </div>
        <div class="br farmbr"></div>
      </div>
      <div class="farm_package" v-if="farm_data.package && farm_data.package.length">
        <h2 class="title">推荐套餐 ({{farm_data.package.length}})</h2>
        <div class="package_content">
          <ul class="package_list">
            <li class="package_item" v-for="package in farm_data.package">
              <h3 class="package_name">{{package.package_name}}</h3>
              <div class="package_msg">
                <div class="package_msg_left">
                  <div class="package_price">
                    <strong class="now_price">¥{{package.package_tickets_d}}</strong>
                    <del class="old_price">原价{{package.package_tickets_d * 1.5}}</del>
                  </div>
                  <div class="package_info">套餐详情</div>
                </div>
                <div class="package_msg_right">
                  <button>预定</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import '../../commont/js/swiper-3.4.1.min';
import '../../commont/css/swiper-3.4.1.min.css';
import rater from '../../../node_modules/vux/src/components/rater/'
import popup from '../../../node_modules/vux/src/components/popup/index.vue';
import group from '../../../node_modules/vux/src/components/group/index.vue';
import BScroll from 'better-scroll';

 export default {
   props: {
     farm_data: {
       type: Object
     }
   },
   data() {
     return {
       url: 'http://www.bjsjyw.cn/',
       show: false,
       farm_rank:null,
       show1: false
     }
   },
   watch: {
     farm_data() {
       this.farm_rank = Number(this.farm_data.farm.farm_star);
       this.$nextTick(()=>{
         this.init();
       })
     }
   },
   methods: {
     showpopup() {
       this.show1 = true;
     },
     dscshow(){
       this.show = !this.show;
     },
     log(srt) {
       console.log(str)
     },
     init() {
       this.scroll = new BScroll(this.$refs.famr_translate,{
         click:true
       })
       let farmSwiper = new Swiper('.swiper-container',{
         loop: true,
         pagination: '.swiper-pagination',     // 分页器
         paginationType: "fraction",             //分页⑦样式
         paginationFractionRender: function (swiper, currentClassName, totalClassName) {
           return '<span class="swipeicon"></span>   <span class="' + currentClassName + '"></span>/<span class="' + totalClassName + '"></span>';
         }
       })
     }
   },
   components: {
     rater,
     popup,
     group
   }
 }
</script>

<style lang="less">
  //轮播图
  .popup0 {
    padding-bottom:15px;
    height:200px;
  }
  .br{
    height:7px;
    background: rgba(1,187,212,0.4);
  }
  .famr_translate{
    position: relative;
    width:100%;
    height:100%;
    overflow: hidden;
  }
  .farmbr{
    margin: 10px 0 0 0;
    position: relative;
    left: -10px;
    width: 100vw;
  }
  .farmop {
    padding: 8px;
    .swiper-container {
      height: 205px;
      .swiper-slide {
        overflow: hidden;
        border-radius: 4px;
      }
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
      //分页⑦
      .swiper-pagination {
        left: -15px;
        font-size: 10px;
        color: #ffffff;
        text-align: right;
        span{
          font-size: 12px;
        }
        .swipeicon {
          display: inline-block;
          width: 12px;
          height: 11px;
          background: url("swipeicon.png");
          background-size: cover;
          background-repeat: no-repeat;
          vertical-align: baseline;
        }
      }
    }
    .farmname {
      margin: 9px 0;
      font-size: 15px;
      color: #333;
    }
    .farmMsg {
      display: flex;
      flex-flow: row nowrap;
      .farmMsg_left {
        display: flex;
        flex-flow: row wrap;
        font-size: 0;
        span {
          display: inline-block;
          line-height: 20px;
        }
        .text {
          font-size: 12px;
          color: #666666;
          vertical-align: top;
        }
        .farmGrade{
          width: 34vw;
          .gradewarpper {
            display: inline-block;
            line-height: 20px;
          }
        }
        .farmDistant{
          width: 35vw;
          .distant {
            font-size: 12px;
            color: #01bbd4;
          }
        }
        .farmProject{
          width:100%;
          .project {
            font-size: 12px;
            color: #333333;
          }
        }
      }
      .farmMsg_right {
        width: 24vw;
        display: flex;
        align-items: center;
        justify-content: center;
        .tel {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 34px;
          box-sizing: border-box;
          border: 1px solid #01bbd4 ;
          border-radius: 4px;
          span{
            width: 17px;
            height: 19px;
            background: url("tel.png") no-repeat;
            background-size: contain;
          }
        }
      }
    }
    .farmdsc {
      .dightdsc_title {
        margin-bottom: 10px;
        font-size: 14px;
        color: #01bbd4;
      }
      .dscwapper {
        position: relative;
        padding-bottom: 20px;
        max-height: 130px;
        overflow: hidden;
        transition: 0.4s;
        background: #ffffff;
        &:before{
          content: ' ';
          position: absolute;
          width: 100%;
          height: 20px;
          bottom: 0;
          left: 0;
          background: #ffffff;
        }
        &:after{
          content: ' ';
          position: absolute;
          width: 12px;
          height: 12px;
          bottom: 5px;
          left: 50%;
          border:1px solid #666666;
          border-top:none;
          border-right:none;
          transform: rotate(-45deg) translate(-12px,-12px);
        }
        .dscitem {
          line-height: 22px;
          font-size:12px;
          color: #666666;
        }
      }
      .dscshow{
        max-height:1000px;
      }
    }
    .farm_addres{
      display: flex;
      align-items: center;
      position: relative;
      left: -10px;
      width: 100vw;
      height: 44px;
      padding: 0 10px;
      margin:10px 0;
      box-sizing: border-box;
      background: rgba(1,187,212,0.4);
      .addres_icon{
        width: 12px;
        height: 17px;
        margin-right: 12px;
        background: url("farm_adress.png") no-repeat;
        -webkit-background-size:;
        background-size:12px 17px;
      }
      .addres_cotent{
        display: flex;
        flex-flow: column wrap;
        justify-content: flex-start;
        color: #333;
        .addres_text{
          font-size: 11px;
          line-height: 19px;
        }
        .addres_tel{
          font-size: 9px;
          line-height: 19px;
        }
      }
      .addres_details{
        position: absolute;
        top: 15px;
        right: 20px;
        width: 12px;
        height: 12px;
        box-shadow: 1px 1px #ffffff;
        transform: rotate(-45deg);
      }
    }
  }
  .package_content {
    padding: 0 10px;
    .package_name{
      margin-bottom: 10px;
      font-size: 14px;
      color: #01bbd4;
    }
    .package_item{
      padding: 10px 0;
    }
    .package_msg {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0;
      .package_price {
        display: flex;
        align-items: center;
        .now_price {
          color: #cc3300;
          font-size: 16px;
          margin-right: 10px;
        }
        .old_price {
          font-size: 12px;
        }
      }
      .package_info{
        display: inline-block;
        font-size: 10px;
        &:after{
          content: ' ';
          position: relative;
          top: 4px;
          left: 4px;
          display: inline-block;
          line-height: 10;
          border: 5px solid transparent;
          border-top: 5px solid #ffcc00;
        }
      }
      button{
        width: 60px;
        height: 34px;
        font-size: 14px;
        color: #ffffff;
        border:none;
        background: #ffcc00;
        border-radius: 4px;
      }
    }
  }
</style>
