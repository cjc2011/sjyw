<template>
  <div class="dsc_wapper" ref="dsc_wapper">
    <ul>
      <li v-for="item in data">
        <img class="dsc_img" v-if="item.img" :src="url+item.img">
        <p class="dsc_txt" v-if="item.text">{{item.text}}</p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  export default {
    props: {
      farm_data: {
        type: Object
      }
    },
    data() {
      return {
        url: 'http://www.bjsjyw.cn'
      }
    },
    created(){
      this.$nextTick(()=>{
        this.scroll = new BScroll(this.$refs.dsc_wapper)
      })
    },
    computed: {
      data() {
        let data_list = [];
        let textLen = this.farm_data.farm.farm_introduction.split('\n').length;
        let imgLen = this.farm_data.farm.farm_album1.length;
        let len = imgLen > textLen ? imgLen : textLen;
        for(let i=0; i<len; i++){
          let obj = {};
          obj.img = this.farm_data.farm.farm_album1[i];
          obj.text = this.farm_data.farm.farm_introduction.split('\n')[i];
          data_list.push(obj);
        }
        return data_list;
      }
    }
  }
</script>

<style lang="less">
  .dsc_wapper{
    position: absolute;
    top:0;
    bottom: 0;
    overflow: hidden;
    .dsc_img{
      display: block;
      height: 200px;
      width: 94%;
      margin: 0px auto;
      border-radius: 6px;
    }
    .dsc_txt{
      width: 94%;
      margin: 10px auto;
      font-size:14px;
      color: #333;
      line-height: 26px;
    }
  }
</style>
