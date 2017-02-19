<template>
  <div id="search_warpper">
    <div class="search_top">
      <div class="search">
        <i class="icon weui_icon_search"></i>
        <form action="" onsubmit="return false">
          <input type="search" placeholder="假期去哪玩" v-model.trim="searchtext" @keyup.enter="search">
        </form>
      </div>
      <span class="search_close" @click="back">取消</span>
    </div>
    <div class="hot_search">
      <h2 class="search_title">热门搜索</h2>
      <div class="hot_search_item">
        <span v-for="item in hotdata" @click="fn(item)">{{item}}</span>
      </div>
    </div>
    <Toast v-model="toaskshow" :time=1000 type="text">暂无数据</Toast>
    <div id="search_list" v-if="search_listshow">
      <div class="search_top">
        <span class="search_back" @click="searchListHide"></span>
        <h1>搜索结果</h1>
      </div>
      <h2 class="search_title">共找到了{{len}}处相关的景点和农家乐</h2>
      <div class="search_content" ref="search_content">
        <ul class="content" v-if="searchdata && searchdata.length">
          <li class="search_item" v-for="item in searchdata" @click="goinfo(item)">
            <img :src="url + item.pic">
            <div class="item_content">
              <h1 class="search_item_name">{{item.name}}</h1>
              <p class="search_item_text">{{item.intro}}</p>
              <div class="start">
                <span>推荐指数:</span><rater :value="Number(item.star)" disabled  :margin="1" :font-size="12"></rater>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import rater from '../../../node_modules/vux/src/components/rater/';
  import Toast from '../../../node_modules/vux/src/components/toast/index.vue';
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        hotdata:['四季客栈','香山','青龙峡','龙庆峡','十三陵'],
        searchtext:'',
        search_listshow:false,
        toaskshow:false,
        searchLen:0,
        searchdata:{},
        url:'http://www.bjsjyw.cn',
        len:0
      }
    },
    methods: {
      search(){
        if(!this.searchtext.length > 0){
          return;
        }
        this.$http.get('/Api/search',{
          params: {
            lat: 39.913169,
            lng: 116.464047,
            key:this.searchtext,
            sort:0
          }
        }).then((respons)=>{
          if(respons.body.status == 200){
            this.searchdata = respons.body.data;
            this.len = this.searchdata.length;
            if(!this.len > 0){
              return;
            }
            this.search_listshow = true;
            this.$nextTick(()=>{
              this.bscroll = new BScroll(this.$refs.search_content,{
                click:true
              })
            })
          }else if(respons.body.status == 400){
            this.toaskshow = true;
            this.searchtext = '';
          }
        })
      },
      searchListHide() {
        this.search_listshow = false;
        this.searchdata = {};
      },
      back() {
        this.$router.go(-1)
      },
      fn(item){
        this.searchtext = item;
        this.search();
      },
      goinfo(item){
        //转跳到景区页面
        if(item.type == 'sights'){
          let id = item.id;
          let juli = item.juli/1000;
          this.$router.push({ path: 'sightinfo', query: { id: id,juli: juli }});
        }
        if(item.type == 'farm'){
          let id = item.id;
          let juli = item.juli;
          this.$router.push({ path: 'farminfo', query: { id: id,juli: juli }});
        }
      }
    },
    computed: {
      farmdata() {
        let farmarr = [];
        if(!this.searchdata || !this.searchdata.length) {
          return false
        }
        this.searchdata.forEach((item)=>{
            if(item.type == 'farm'){
              farmarr.push(item)
            }
        })
        return farmarr;
      },
      sightsdata() {
        let sightsarr = [];
        if(!this.searchdata || !this.searchdata.length) {
          return false
        }
        this.searchdata.forEach((item)=>{
          if(item.type == 'sights'){
            sightsarr.push(item)
          }
        })
        return sightsarr;
      }
    },
    components: {
      rater,
      Toast
    }
  }
</script>

<style lang="less">
  #search_warpper{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: white;
    z-index: 20;
    .search_top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 0 10px;
      .search{
        flex: 1;
        position: relative;
        .icon{
          position: absolute;
          top: 1px;
          left: 6px;
          color: #01bbd4;
        }
        .weui_icon_search:before{
          color: #01bbd4;
        }
        input{
          padding-left: 30px;
          padding-right: 10px;
          width: 100%;
          outline: none;
          font-size: 14px;
          line-height: 30px;
          border-radius: 15px;
          background: #6bd4e2;
          box-sizing: border-box;
          -webkit-appearance:none;
        }
        input::-webkit-input-placeholder {
                font-size: 14px;
                color: #ffffff;
              }
      }
      .search_close{
        padding: 0px 10px;
        color: #01bbd4;
      }
    }
    .search_title{
      margin: 10px 0;
      padding: 0 10px;
      font-size: 15px;
      color: #333;
    }
    .hot_search_item{
      padding: 0 10px;
      span{
        display: inline-block;
        margin: 0 10px 10px 0px;
        padding: 0 10px;
        font-size: 14px;
        line-height: 24px;
        color: #333;
        border-radius: 12px;
        border: 1px solid #01bbd4;
      }
    }
    #search_list{
      position: absolute;
      top:0;
      bottom: 0;
      width: 100%;
      background: #ffffff;
      .search_top{
        position: fixed;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #01bbd4;
        background: #ffffff;
        box-sizing: border-box;
        z-index: 10;
        h1{
          width: 100%;
          font-weight: 400;
          font-size: 16px;
          line-height: 40px;
          text-align: center;
          color: #333;
        }
        .search_back{
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
      .search_title{
        font-size: 13px;
        margin-top: 40px;
        line-height: 30px;
        background: #0fd6f1;
      }
      .search_content{
        position: absolute;
        top: 70px;
        bottom: 0;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        .search_item{
          margin-bottom: 15px;
          height: 110px;
          display: flex;
          border-bottom: 1px solid #0fd6f1;
          img{
            width: 95px;
            height: 95px;
            border-radius: 5px;
            margin-right: 10px;
          }
          .item_content{
            display: flex;
            height: 100px;
            flex-flow: column nowrap;
            justify-content: space-between;
            font-size: 0;
            flex: 1;
            .search_item_name{
              font-size: 15px;
              line-height: 15px;
            }
            .search_item_text{
              font-size: 13px;
              line-height: 18px;
              color: #666;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
            .start{
              font-size: 13px;
              color: #666;
            }
          }
        }
      }
    }
  }
</style>
