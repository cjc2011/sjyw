<template>
  <div class="citywapper">
    <div class="cityselect">
      <div class="page-indexlist">
        <nav class="nav">
          <span class="back" @click="hide"></span>
          <h1>选择城市</h1>
        </nav>
        <div class="page-indexlist-wrapper">
          <p class="city_title">当前定位</p>
          <div class="active_city">
            {{cityname}}
            <span>GPS定位</span>
          </div>
          <p class="city_title">热门城市</p>
          <div class="hot_city_warpper">
            <ul class="hot_city_list">
              <li class="hot_city" v-for="city in hotCity">{{city}}</li>
            </ul>
          </div>
        </div>
        <div class="indexlist" ref="indexlist">
          <ul class="indexlist-content">
            <li  v-for="item in city" class="indexsection">
              <h2 class="indexsection-index">{{item.initial}}</h2>
              <ul class="cityList">
                <li v-for="city in item.cells" @click="select(city)">
                  <div class="item">{{city}}</div>
                </li>
              </ul>
            </li>
          </ul>
          <div class="indexlist-nav">
            <ul>
              <li v-for="(item,index) in city" @click="move(index,item)">{{item.initial}}</li>
            </ul>
          </div>
          <toast v-model="show1" type="text" width="3.5em">{{text}}</toast>
        </div>
        <div id="map" ref="map"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {PinYinTranslate} from '../../../src/commont/js/pinyin.js'
  import Toast from '../../../node_modules/vux/src/components/toast/index.vue'
  import BMap from 'BMap'


  export default {
    props :{
      cityname: {
        type: String
      }
    },
    data() {
      return {
        alphabet: [],
        hotCity:['北京市','河北省'],
        citylist: [],
        city: [],
        show1:false,
        text:'beijing'
      };
    },
    created() {
      this.$http.get('/Api/area').then((response)=>{
        let data = response.body
        if(data.status === 200){
          data = data.data.area
          data.forEach((item)=>{
            this.citylist.push(item.region_name)
          });
          this.cityindex.forEach((initial)=>{
            let cells = this.citylist.filter((item)=>{
              return PinYinTranslate.start(item).substring(0,1) === initial;
            })
            this.city.push({
              initial,
              cells
            })
          })
        }
      })
    },
    computed:{
      cityindex(){
        let indexar = [];
        this.citylist.forEach((item)=>{
          let pinyin = PinYinTranslate.start(item).substring(0,1)
          if(indexar.indexOf(pinyin) != -1){
            return
          }
          indexar.push(pinyin)
        })
        return indexar.sort((a,b)=>{
          return a.charCodeAt()-b.charCodeAt()
        })
      }
    },
    methods: {
      select(cell){
        this.$emit('select',cell)
        this.$router.go(-1)
      },
      move(index,item){
        var heads = this.$refs.indexlist.getElementsByTagName('h2');
        var top = heads[index].offsetTop;
        document.body.scrollTop = top - 40;
        this.text = item.initial
        this.show1 = true;
      },
      hide(){
        this.$router.go(-1)
      }
    },
    components:{
      Toast
    }
  };
</script>

<style lang="less">
  @color:#01bbd4;

  .citywarpper{
    position: absolute;
    top:0;
    left:0;
    bottom: 0;
    width:100%;
    background: #fff;
    z-index:20;
  }
  .page-indexlist{
    padding-top: 40px;
  }
  .nav{
    height: 40px;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    background: #ffffff;
    border-bottom:1px solid @color;
    span{
      position: absolute;
      top:13px;
      left:15px;
      width:13px;
      height:13px;
      font-size:20px;
      line-height: 1;
      color: @color;
      transform: rotate(315deg);
      border:1px solid @color;
      border-right:none;
      border-bottom:none;
    }
    h1{
      font-family: Helvetica Neue,Helvetica,STHeiTi,Arial,sans-serif;
      font-weight:400;
      font-size:16px;
      line-height: 40px;
      text-align: center;
      color: #333;
    }
  }
  .city_title,.hot_city_list{
    padding:0px 10px;
  }
  .city_title{
    margin:10px 0px;
    font-size:14px;
    color: #666;
  }
  .active_city{
    margin:0px 10px;
    text-align: center;
    line-height: 40px;
    font-size:14px;
    border:1px solid @color;
    color: @color;
    -webkit-border-radius:20px;
    -moz-border-radius:20px;
    border-radius:20px;
    span{
      color: #666;
      font-size:12px;
    }
  }
  .hot_city_list{
    font-size:0;
    li{
      display: inline-block;
      padding:0px 20px;
      margin-right:17px;
      margin-bottom:17px;
      line-height: 25px;
      font-size:14px;
      border:1px solid @color;
      -webkit-border-radius:6px;
      -moz-border-radius:6px;
      border-radius:6px;

    }
  }
  /*indexlist*/
  .indexlist{
    width:100%;
    .indexsection-index{
      padding:10px;
      color:#01bbd4;
      background:rgba(204, 241, 246, 0.4);
    }
    .cityList{
      background-image: linear-gradient(180deg, #cff2f2, #cff2f2 50%, transparent 50%);
      background-size: 120% 1px;
      background-repeat: no-repeat;
      background-position: top left;
      background-origin: content-box;
      div{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        font-size: 16px;
        line-height: 1;
        min-height: 48px;
        overflow: hidden;
        padding: 0 10px;
        color: #666666;
        background-image: linear-gradient(180deg, #cff2f2, #cff2f2 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: top left;
        background-origin: content-box;
      }
      li:nth-last-child(0){
        background-origin: border-box;
        background-image: linear-gradient(180deg, #cff2f2, #cff2f2 50%, transparent 50%);
        background-size: 120% 1px;
        background-repeat: no-repeat;
        background-position: top left;
      }
    }
    .indexlist-nav{
      position: fixed;
      top:0;
      right:0;
      bottom: 0;
      text-align: center;
      display: flex;
      align-items: center;
      li{
        padding: 2px 6px;
        font-size: 12px;
      }
    }
  }
</style>

