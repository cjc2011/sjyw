<template>
  <div class="searchlist_warpper">
    <div class="searchlist_top">
      <span class="searchlist_back" @click="back"></span>
      <h1>景区</h1>
    </div>
    <div class="searchlist_content">
      <div class="screen_warpper">
        <div class="screen">
          <div class="screen-item">
            <span class="screen_text">综合排序</span>
            <span class="icon_dwon"></span>
          </div>
          <div class="screen-item">
            <span class="screen_text">游玩项目</span>
            <span class="icon_dwon"></span>
          </div>
          <div class="screen-item">
            <span class="screen_text">区域</span>
            <span class="icon_dwon"></span>
          </div>
        </div>
        <div class="drop_box">
          <div class="overall_box box" style="display:none;">
            <ul>
              <li>综合排序</li>
              <li>距离排序</li>
              <li>推荐排序</li>
            </ul>
          </div>
          <div class="play_box box">
            <span v-for="(item,index) in playdata">{{item}}</span>
          </div>
          <div class="area_box box">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">


  export default {
    data() {
      return {
        playdata:['用餐','住宿','会务','K歌','骑马','漂流','蹦极','竹筏','登山','野营','采摘','烧烤','骑行','摄影','垂钓','庙宇','道观','游乐场','烤全羊','水上游船','真人CS','麻将','台球','乒乓球','温泉','儿童乐园','动物园','耕种体验','滑雪','攀岩','参观','玻璃栈道','休闲','高尔夫','品茶'],

      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      }
    },
    components: {

    }
  }
</script>

<style lang="less">
  .searchlist_warpper{
    .searchlist_top{
      position: fixed;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid rgba(1, 187, 212, 0.4);
      box-sizing: border-box;
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
          -border-bottom: 1px solid #bbf0f7;
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
                box-shadow: 1px 1px 1px  #ccc;
              }
            }
          }
        }
        .drop_box{
          position: absolute;
          padding: 10px;
          top: 40px;
          width: 100%;
          background: red;
        }
        .play_box{
          font-size: 0;
          span{
            display: inline-block;
            width: 80px;
            font-size: 12px;
          }
        }
      }
    }
  }

</style>
