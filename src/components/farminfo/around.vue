<template>
  <div>around</div>
</template>

<script type="text/ecmascript-6">
 export default {
   farm_data: {
     type: Object
   },
   updated() {
     console.log(this.farm_data)
     console.log('updata')
   },
   activeted() {
     console.log(this.farm_data)
     console.log('activeted')
   },
   mounted() {
     console.log(this.farm_data);
     console.log('mounted')
   },
   created() {
     alert(1)
   }
 }
</script>

<style lang="less">

</style>
