<template>
  <div class="cityselect">
    <div class="page-indexlist">
      <div class="page-indexlist-wrapper">
        <nav class="nav">
          <span class="mintui mintui-back"></span>
          <h1>选择城市</h1>
        </nav>
        <p class="city_title">当前定位</p>
        <div class="active_city">
          {{activeCity}}
          <span>GPS定位</span>
        </div>
        <p class="city_title">热门城市</p>
        <div class="hot_city_warpper">
          <ul class="hot_city_list">
            <li class="hot_city" v-for="city in hotCity">{{city}}</li>
          </ul>
        </div>
        <mt-index-list>
          <mt-index-section v-for="item in alphabet" :index="item.initial">
            <mt-cell v-for="cell in item.cells" :title="cell"></mt-cell>
          </mt-index-section>
        </mt-index-list>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { indexlist  } from '../../../node_modules/mint-ui'
  import {PinYinTranslate} from '../../../src/commont/js/pinyin.js'


  export default {
    data() {
      return {
        alphabet: [],
        activeCity:'北京',
        hotCity:['北京','河北'],
        citylist: []
      };
    },
    created() {
      this.$http.get('/Api/area').then((response)=>{
        let data = JSON.parse(response.body)
        if(data.status === 200){
          data = data.data.area
          data.forEach((item)=>{
            this.citylist.push(item.region_name)
          });
          this.cityindex.forEach((item)=>{
            let cells = this.citylist.filter((initial)=>{
              return PinYinTranslate.start(initial).substring(0,1) === item;
            })
            this.alphabet.push({
              item,
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
    components:{
      indexlist
    }
  };
</script>

<style lang="less">
  @color:#01bbd4;
  .nav{
    height: 40px;
    position: relative;
    border-bottom:1px solid @color;
    span{
      position: absolute;
      top:10px;
      left:10px;
      font-size:20px;
      line-height: 1;
      color: @color;
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
  /*重写组件样式*/
  .mint-header{
    background: #fff !important;
    color: #333 !important;
  }
  .mint-indexsection-index{
    background: rgba(204,241,246,0.4) !important;
    color: @color;
  }
  .mint-cell-text{
    color: #666;
  }
  .mint-cell-wrapper,.mint-cell:last-child{
    background-image: linear-gradient(180deg, #cff2f2, #cff2f2 50%, transparent 50%) !important;
  }
</style>

