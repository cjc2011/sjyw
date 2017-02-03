<template>
  <div class="home">

    <div class="top_wrapper" ref="top" >
      <top v-on:cityshow="showchange" :cityname="cityname"></top>
    </div>
    <div class="home-wrapper" ref="scroll">
        <router-view  :home_data="home_data"></router-view>
    </div>
    <div class="citywarpper" v-show="cityselecshow">
      <selectcity :cityname="cityname" v-on:select="setcity" v-on:hide="showchange"></selectcity>
    </div>
    <div id="m"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import top from '../src/components/top/top.vue';
  import selectcity from '../src/components/selectcity/selectcity.vue';
  import sightinfo from '../src/components/sightinfo/sightinfo.vue'
  import BMap from 'BMap';
  const URL = 'http://www.bjsjyw.cn';

  export default {
    data(){
      return {
        home_data: {},
        cityname: "",
        hotdata: [],
        cityid: [],
        citydata:[],
        cityselecshow:false,
        sightinfo_data: Object,
        lng: null,
        lat: null
      }
    },
    created(){
      let that = this;
      this.$nextTick(()=>{
        //初始化加载一次数据
        /*let ID = this.getCityId(this.cityname);
        this.init(ID);*/
        //实例化地图
        var map = new BMap.Map("m");
        //获取城市名
        var myCity = new BMap.LocalCity();
        myCity.get((result)=>{
          var cityName = result.name;
          this.cityname = cityName;

        });
        //获取经纬度
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            that.lng = r.point.lng;
            that.lat = r.point.lat;

          }
          else {
            alert('failed'+this.getStatus());
          }
        },{enableHighAccuracy: true})
      });

      //获取已有的城市列表
      this.$http.get('/Api/area').then((response)=>{
        let data = response.data.data;
        this.citydata = data.area;

      })
    },
    watch:{
      lat () {
        let ID = this.getCityId(this.cityname);
        this.init(ID);
      },
      cityname() {
        let ID = this.getCityId(this.cityname);
        this.init(ID);
      }
    },
    methods: {
      init(ID) {
        this.$http.get('/Api/index', {
          params: {
            lat: this.lat,
            lng: this.lng,
            province: ID
          }
        }).then((response) => {
          var response = response.body;
          if(response.data.djrd){
            this.hotdata = response.data.djrd;
          }else{
            response.data.djrd = this.hotdata;
          }
          this.home_data = response.data
          //this.init_scroll()
        })
      },
      getCityId(str) {
        let len = this.citydata.length;
        for (let i=0;i<len;i++){
          if(str == this.citydata[i].region_name){
            return this.citydata[i].region_id;
          }
          let citys = this.citydata[i].city;
          for (let j=0;j<citys.length;j++){
            if(citys[j].region_name == str){
              return citys[j].region_id;
            }
          }
        }
      },
      //选择城市页面显示隐藏
      showchange() {
        this.cityselecshow = !this.cityselecshow;
      },
      //选择城市页面触发事件
      setcity(active) {
        this.cityname = active;
      }
    },
    components: {
      "top": top,
      "selectcity": selectcity,
      "sightinfo": sightinfo
    }
  }

</script>

<style lang="less">
  @import '../node_modules/vux/src/styles/reset.less';
  //@import '../node_modules/vux/src/styles/1px.less';
  .home{
    position: absolute;
    top:0;
    bottom: 0;
    width:100%;
  }
  .home-wrapper{
    position: absolute;
    top:0;
    bottom: 0;
    width:100%;
  }
  .hotwrapper{
    margin:12px 0 5px 0;
  }
  .citywarpper{
    position: absolute;
    top:0;
    left:0;
    bottom: 0;
    width:100%;
    background: #fff;
    z-index:20;
  }

</style>
