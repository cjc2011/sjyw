<template>
    <div class="searchlist_warpper">
      <div class="searchlist_top">
        <span class="searchlist_back" @click="back"></span>
        <h1 v-if="type === 'farm'">农家乐</h1>
        <h1 v-if="type === 'sight'">景区</h1>
      </div>
      <Toast v-model="toaskshow" :time=1000 type="warn">此地区暂无数据</Toast>
      <div class="searchlist_content">
        <div class="screen_warpper">
          <div class="screen">
            <div class="screen-item" @click="tabshow(1)">
              <span class="screen_text">综合排序</span>
              <span class="icon_dwon"></span>
            </div>
            <div class="screen-item" @click="tabshow(2)">
              <span class="screen_text">游玩项目</span>
              <span class="icon_dwon"></span>
            </div>
            <div class="screen-item" @click="tabshow(3)">
              <span class="screen_text">区域</span>
              <span class="icon_dwon"></span>
            </div>
          </div>
          <div class="drop_box">
            <div class="overall_box box" :class="{'active':active===1}">
              <ul>
                <li v-for="(item,index) in type==='farm'? farmsort : sightsort " :class="{'vux-1px-b border':index < 2,'active':overall == index}"  @click="overallshow(index)">
                  <span>{{item.text}}</span>
                  <icon type="success_no_circle"></icon>
                </li>
              </ul>
            </div>
            <div class="play_box box" :class="{'active':active===2}">
              <scroller lock-x height="180px" ref="scroller" >
                <div class="scrollwapper">
                  <ul>
                    <li class="play_box_item" v-for="(item,index) in playdata" :class="{'active':playactive === index}" @click="playitem(index)">
                      <span class="play_box_text">{{item}}</span>
                    </li>
                  </ul>
                </div>
              </scroller>
            </div>
            <div class="area_box box" :class="{'active':active===3}" v-if="index_city">
              <h2 class="index_city">{{cityname}}</h2>
              <ul>
                <li class="area_item"  v-for="item in index_city.city" :class="{'active':indexcity == item.region_id}"  @click="cityactive(item.region_id)">
                  <span class="area_item_text">{{item.region_name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="showlist"  v-if="type === 'sight'">
          <sights :sightdata="sightdata"></sights>
        </div>
        <div class="famrlist_show" v-if="type === 'farm'">
          <farmlist :farmdata="farmdata"></farmlist>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import scroller from '../../../node_modules/vux/src/components/scroller/index.vue';
  import sights from '../../components/sights/sights.vue';
  import farmlist from '../../components/farmlist/farmlist.vue'
  import icon from '../../../node_modules/vux/src/components/icon/index.vue';
  import Toast from '../../../node_modules/vux/src/components/toast/index.vue';


  export default {
    props:{
      cityname:{
        type: String
      },
      citydata:{
        type: Array
      }
    },
    data() {
      return {
        toaskshow:false,
        type:this.$route.query.type,
        playdata:['用餐','住宿','会务','K歌','骑马','漂流','蹦极','竹筏','登山','野营','采摘','烧烤','骑行','摄影','垂钓','庙宇','道观','游乐场','烤全羊','水上游船','真人CS','麻将','台球','乒乓球','温泉','儿童乐园','动物园','耕种体验','滑雪','攀岩','参观','玻璃栈道','休闲','高尔夫','品茶'],
        active: 0,               //选项卡参数
        overall: 0,             //综合排序 active参数
        playactive: null,        //游玩项目选中active 参数
        indexcity: null,         //选中城市 active
        sightdata: null,          //景区数据       //综合排序传0   距离排序1   推荐排序传2
        farmdata:null,            //农家乐数据     //综合排序传0   距离排序1
        sightsort:[
          {
            text:'综合排序',
            num:0
          },
          {
            text:'距离排序',
            num:1
          },
          {
            text:'推荐排序',
            num:2
          }
        ],
        farmsort: [
          {
            text:'距离排序',
            num:0
          },
          {
            text:'销量排序',
            num:1
          },
          {
            text:'价格排序',
            num:2
          }
        ],
        opation: {
          page: 0,
          province: null,
          city: null,
          lat: null,
          lng: null,
          program: null,
          sort: 0
        }
      }
    },
    created() {
      let that = this;
      window.addEventListener('scroll',function(){
        if(that.active != 0){
          that.active = 0;
        }
      })
    },
    computed: {
      index_city(){
        let data = this.citydata.filter((item)=>{
          return (item.region_name === this.cityname);
        })
        if(!data.length){
          return
        }
        this.opation.province = data[0].region_id;
        this.opation.lat = data[0].lat;
        this.opation.lng = data[0].lng;
        this.getdata();
        return data[0]
      }
    },
    methods: {
      //排序方式
      overallshow(index) {
        this.active = 0;
        this.overall = index;
        this.opation.sort = index;
        this.getdata();
      },
      //选择游玩项目
      playitem(index){
        this.active = 0;
        this.playactive = index;
        this.opation.program = index;
        this.getdata();
      },
      //选择城市
      cityactive(cityid) {
        this.active = 0;
        this.indexcity = cityid;
        this.opation.city = cityid;
        this.getdata();
      },
      getdata(){
        let search = this.type === 'farm' ? 'Api/farm_list' : 'Api/sights_list';
        this.$http.get(search,{
          params: {
            page:this.opation.page,
            province:this.opation.province,
            city:this.opation.city,
            lat:this.opation.lat,
            lng:this.opation.lng,
            program:this.opation.program,
            sort:this.opation.sort
          }
        }).then((response)=>{
          if(response.body.status === 200){
            if(this.type === 'farm'){
              this.farmdata = response.body.data.list;
            }else{
              this.sightdata=response.body.data.list;
            }
          }else{
            if(this.type === 'farm'){
              this.farmdata = null;
              this.toaskshow = true;
            }else{
              this.sightdata = null;
              this.toaskshow = true;
            }
          }
        })
      },
      back() {
        this.$router.go(-1);
      },
      tabshow(index) {
        if(this.active === index){
          this.active = 0;
          return;
        }
        this.active = index;
        if(index === 2){
          this.$nextTick(() => {
            this.$refs.scroller.reset()
          })
        }
      }
    },
    components: {
      scroller,
      sights,
      farmlist,
      icon,
      Toast
    }
  }
</script>

<style lang="less">
  @import '../../../node_modules/vux/src/styles/1px.less';
  .searchlist_warpper{
   /* background: #ffffff;
    transform:translate3D(0px,0,0);
    transition: all 0.1s linear;*/
    &.move-enter-active{
      //定义元素显示的动画enter-active
      /*transform: translate3D(100%,0,0);*/
    }
    &.move-leave-active {
      //定义元素隐藏时的动画 leave-active
    }
    &.move-enter,&.move-leave-active {
      //定义元素开始进入动画和隐藏后的状态样式
      /*transform:translate3D(100%,0,0);*/
    }

    .searchlist_top{
      position: fixed;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      background: #ffffff;
      z-index:10;
      h1{
        font-weight: 400;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        color: #333;
      }
      .searchlist_back{
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
    .searchlist_content{
      position: absolute;
      top: 40px;
      bottom: 0;
      width: 100%;
      .screen_warpper{
        position: relative;
        height: 40px;
        .screen{
          display: flex;
          flex-flow: row nowrap;
          .screen-item{
            flex: 1;
            text-align: center;
            font-size: 0;
            span{
              display: inline-block;
            }
            .screen_text {
              font-size: 14px;
              line-height: 40px;
              color: #333;
            }
            .icon_dwon{
              position: relative;
              width: 20px;
              height: 20px;
              vertical-align: middle;
              &:after{
                content: '';
                position: absolute;
                left: 5px;
                top: -2px;
                width: 8px;
                height: 8px;
                transform: rotate(45deg);
                box-shadow: 1px 1px 1px  #333;
              }
            }
          }
        }
        .drop_box{
          position: absolute;
          top: 40px;
          width: 100%;
          box-sizing: border-box;
          box-shadow: 0 -1px 1px #cccccc;
          background: #ffffff;
          z-index:10;
          .box{
            display: none;
            background: #ffffff;
            margin: 10px;
          }
          .overall_box{
            font-size:0;
            li{
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              line-height: 40px;
              i{
                display: none;
                font-size: 8px;
              }
              &.active i{
                display: block;
              }
              &.active span{
                color: #01bbd4;
              }
            }
            .border{
              background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, rgb(233, 252, 255)));
            }
          }
          .play_box{
            font-size: 0;
            .play_box_item{
              display: inline-block;
              width: 25%;
              margin-bottom: 6px;
              text-align: center;
              &.active .play_box_text{
                border:1px solid #01bbd4;
                color: #01bbd4;
              }
              .play_box_text{
                display: inline-block;
                width: 90%;
                font-size: 14px;
                line-height: 24px;
                color: #333;
                border:1px solid #333 ;
                border-radius: 2px;
              }
            }
          }
          .area_box{
            font-size:0;
            .index_city{
              padding-bottom: 10px;
              padding-left: 4px;
              font-size: 14px;
              line-height: 24px;
              color: #333;
            }
            ul{
              display: flex;
              flex-flow: row wrap;
              justify-content: space-between;
              .area_item{
                width: 25%;
                text-align: center;
                margin-bottom: 6px;
                &.active span{
                  border: 1px solid #01bbd4;
                  color: #01bbd4;
                }
                .area_item_text{
                  display: inline-block;
                  width: 90%;
                  font-size: 14px;
                  line-height: 24px;
                  color: #333;
                  border: 1px solid #333;
                  border-radius: 2px;
                }
              }
            }
          }
          .active{
            display: block;
          }
        }

      }
      .showlist{
        .sights{
          margin-top: 0;
        }
      }
    }
  }

</style>
