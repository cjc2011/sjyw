<template>
  <div class="sightinfo">
      <div class="header">
        <span class="header_back" @click="back"></span>
        <h1 class="header_title">景点详情</h1>
      </div>
    <div class="br"></div>
    <div class="sightop">
      <div class="sliderwarpper">
        <div class="swiper-container">
          <div class="swiper-wrapper"v-if="sightdata.sights">
            <div class="swiper-slide"  v-for="(swipe,index) in sightdata.sights.sights_pic">
              <img :src="url+swipe" class="previewer-demo-img" @click="showpreviewer(index)">
            </div>
          </div>
          <!-- 分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <h2 class="sightname" v-if="sightdata.sights">
        {{sightdata.sights.sights_name}}
      </h2>
      <div class="sightMsg" v-if="sightdata.sights">
        <div class="sightMsg_left">
          <div class="sightGrade">
            <span class="text">景区等级:</span>
            <div class="gradewarpper">
              <rater :value="sight_rank" star="A" disabled  :margin="-2" :font-size="14"></rater>
            </div>
          </div>
          <div class="sightDistant">
            <span class="text">当前距离:</span>
            <span class="distant">{{juli}}km</span>
          </div>
          <div class="sightProject">
            <span class="text">游玩项目:</span>
            <span class="project">{{sightdata.sights.sights_program}}</span>
          </div>
        </div>
      </div>
      <div class="br sightbr"></div>
      <div class="sightdsc" v-if="sightdata.sights">
        <h2 class="dightdsc_title">【景区简介】</h2>
        <ul class="dscwapper" @click="dscshow" v-bind:class="{'dscshow':show}">
          <li v-for="dsc in sightdsc" class="dscitem">{{dsc}}</li>
        </ul>
      </div>
      <div class="br sightbr"></div>
    </div>
    <div class="farm_list_warpper">
      <farmlist :farmdata="farmdata"></farmlist>
    </div>
    <previewer :list="list" ref="previewer" :options="options"></previewer>
  </div>
</template>

<script type="text/ecmascript-6">
  import '../../commont/js/swiper-3.4.1.min';
  import '../../commont/css/swiper-3.4.1.min.css';
  import rater from '../../../node_modules/vux/src/components/rater/';
  import previewer from '../../../node_modules/vux/src/components/previewer/index.vue';
  import farmlist from '../../components/farmlist/farmlist.vue'

  export  default {
    data(){
      return {
        sightdata: {},
        sightdsc: [],
        url: "http://www.bjsjyw.cn/",
        sight_rank: 0,
        show: false,
        farmdata: [],
        juli: this.$route.query.juli,
        list:[],
        options: {
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }
      }
    },
    created(){
      this.$http.get('/Api/sights_show', {
        params: {
          id: this.$route.query.id
        }
      }).then( (response)=> {
        this.sightdata = response.body.data;
        this.farmdata = this.sightdata.sights_farm;
        this.list = this.sightdata.sights.sights_pic.map((item)=>{
          let obj = {w:600,h:400};
          obj.src = this.url+item;
          return obj
        })
        this.sightdsc = this.sightdata.sights.sights_introduce.split("\n");
        this.sight_rank = Number(this.sightdata.sights.sights_rank);
        this.$nextTick( ()=> {
          var mySwiper = new Swiper('.swiper-container',{
            loop: true,//循环播放
            pagination: '.swiper-pagination',     // 分页器
            paginationType: "fraction",             //分页⑦样式
            paginationFractionRender: function (swiper, currentClassName, totalClassName) {
              return '<span class="swipeicon"></span>   <span class="' + currentClassName + '"></span>/<span class="' + totalClassName + '"></span>';
            }
          })
        })
      })
    },
    methods:{
      showpreviewer (index) {
        this.$refs.previewer.show(index)
      },
      dscshow() {
        this.show = !this.show;
      },
      back() {
        this.$router.go(-1)
      }
    },
    components: {
      "rater": rater,
      "farmlist": farmlist,
      "previewer":previewer
    }
  }
</script>

<style lang="less">
.sightinfo{
  position: absolute;
  top: 40px;
  bottom: 0px;
  width: 100%;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background: #ffffff;
    z-index:20;
    .header_title {
      font-weight: 400;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #333;
    }
    .header_back {
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
  .br{
    height:7px;
    background: rgba(1,187,212,0.4);
  }
  .sightbr{
    margin:10px 0;
    position: relative;
    left: -10px;
    width: 100vw;
  }
  //轮播图
  .sightop {
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
    .sightname {
      margin: 9px 0;
      font-size: 15px;
      color: #333;
    }
    .sightMsg {
      display: flex;
      flex-flow: row nowrap;
      .sightMsg_left {
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
        .sightGrade{
          width: 40vw;
          .gradewarpper {
            display: inline-block;
            line-height: 20px;
          }
        }
        .sightDistant{
          width: 40vw;
          .distant {
            font-size: 12px;
            color: #01bbd4;
          }
        }
        .sightProject{
          width:100%;
          .project {
            font-size: 12px;
            color: #333333;
          }
        }
      }
      .sightMsg_right {
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
    .sightdsc {
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
  }

}
</style>
