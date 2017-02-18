<template>
  <div class="sell_warpper">
    <div class="sell_top">
      <span class="sell_back" @click="back"></span>
      <h1>我的订单</h1>
    </div>
    <div class="sell_content">
      <div class="sell_list" v-if="userdata">
        <div class="sell_item" v-for="item in userdata">
          <div class="sell_item_head">
            <span class="text">我的订单</span>
            <span class="sell_status">已取消</span>
          </div>
          <div class="sell_item_content">
            <h2 class="sell_name">{{item.o_name}}</h2>
            <p class="sell_item_dsc">
              <time>{{item.time}}</time>
              <span class="price">{{item.order_payment}}</span>
            </p>
          </div>
          <div class="sell_item_footer">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export  default {
    props: {
      id : {
        type: String
      }
    },
    data() {
      return {
        userdata:null
      }
    },
    created() {
      this.$http.get('/Api/my_order_list',{
        params: {
          user_id: this.id
        }
      }).then((response)=> {
        if(response.body.status == 200){
          this.userdata=  response.body.data;
          console.log(this.userdata)
        }
      })
    },
    methods: {
      back(){
        this.$emit('back')
      }
    }
  }
</script>

<style lang="less">
.sell_warpper{
  position:fixed;
  top:0;
  bottom:0;
  width: 100%;
  background: #dfffff;
  .sell_top{
    position: fixed;
    width: 100%;
    height: 40px;
    background: #ffffff;
    box-sizing: border-box;
    z-index: 10;
    h1{
      font-weight: 400;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #333;
    }
    .sell_back{
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
  .sell_content{
    position: relative;
    top: 40px;
    .sell_item{
      .sell_item_head{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        font-size: 14px;
        line-height: 30px;
        color: #666;
        background: #efffff;
      }
      .sell_item_content{
        padding: 0 10px;
        font-size: 14px;
        color: #999;
        border-bottom: 1px solid #cccccc;
        background: #ffffff;
        h2{
          line-height:  30px;
        }
        .sell_item_dsc{
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
      }
      .sell_item_footer{
        height: 20px;
        background: #ffffff;
      }
    }
  }
}
</style>
