<template>
  <div class="around_wapper" ref="around_wapper">
    <div>
      <sights :sightdata="farm_data.farm_sights" v-on:mounted="resetscroll"></sights>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import sights from '../../components/sights/sights.vue';

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

   },
   methods: {
     resetscroll() {
       this.$nextTick(()=>{
         this.BS = new BScroll(this.$refs.around_wapper,{
           click:true
         })
       })
     }
   },
   components: {
     sights
   }
 }
</script>

<style lang="less">
.around_wapper{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.around_wapper .sights{
  margin: 0;
}
</style>
