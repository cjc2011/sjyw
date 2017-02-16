<template>
  <div class="userwapper">
    <div class="user_top">
      <blur :blur-amount=20 :url="url">
        <div class="user_content">
          <div class="user_img">
            <img src="user.jpg">
          </div>
          <div class="user_name">
            <span class="text">陈嘉诚</span>
            <span class="leav">LV.1</span>
          </div>
          <div class="user_account">账号:17701088188</div>
        </div>
      </blur>
    </div>
    <div class="user_money">
      <div class="coupons" style="border-right:1px solid #01bbd4">
        <span class="coupons_icon icon"></span>
        <span class="text">钱包</span>
      </div>
      <div class="wallet">
        <span class="wallet_icon icon"></span>
        <span class="text">优惠券</span>
      </div>
    </div>
    <div class="br"></div>
    <div class="list">
      <group>
        <cell title="我的订单" is-link>
          <img class="list_icon" slot="icon" src="order.png">
        </cell>
        <cell title="我的评价" is-link>
          <img class="list_icon" slot="icon" src="eval.png">
        </cell>
        <cell title="我的收藏" is-link>
          <img class="list_icon" slot="icon" src="coll.png">
        </cell>
        <cell title="我的团队定制" is-link>
          <img class="list_icon" slot="icon" src="team.png">
        </cell>
      </group>
      <div class="br"></div>
      <group>
        <cell title="我要加盟" is-link>
          <img class="list_icon" slot="icon" src="phone.png">
        </cell>
        <cell title="意见反馈" is-link>
          <img class="list_icon" slot="icon" src="comment.png">
        </cell>
        <cell title="关于四季游玩" is-link>
          <img class="list_icon" slot="icon" src="leav.png">
        </cell>
      </group>
    </div>
    <login></login>
  </div>
</template>

<script type="text/ecmascript-6">
  import Blur from '../../../node_modules/vux/src/components/blur/index.vue';
  import group from '../../../node_modules/vux/src/components/group/index.vue';
  import cell from '../../../node_modules/vux/src/components/cell/index.vue';
  import login from './login.vue';
  export default {
    data() {
      return {
        url:'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
      }
    },
    components: {
      Blur,
      group,
      cell,
      login
    }
  }
</script>

<style lang="less">
.userwapper{
  .user_content{
    position: relative;
    top: 30px;
    .user_img{
      position: absolute;
      top: 0;
      left: calc(~"50% - 50px");
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      text-align: center;
      img{
        display: inline-block;
        height: 100%;
      }
    }
    .user_name{
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 100px;
      width: 100%;
      line-height: 24px;
      text-align: center;
      .text{
        margin-right: 10px;
        display: inline-block;
        font-size: 15px;
        color: #ffffff;
      }
      .leav{
        display: inline-block;
        padding: 0px 10px;
        font-size: 8px;
        line-height: 15px;
        color: #e9bd1d;
        border: 1px solid #e9bd1d;
        border-radius: 7px;
        letter-spacing: 1px;
      }
    }
    .user_account{
      position: absolute;
      top: 124px;
      width: 100%;
      font-size: 14px;
      text-align: center;
      color: #fff;
    }
  }
  .user_money{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    &>div{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    .icon{
      display: inline-block;
      width: 32px;
      height: 20px;
    }
    .coupons_icon{
      background: url("wallet.png") no-repeat;
      background-size:contain;
    }
    .wallet_icon{
      background: url("coupons.png") no-repeat;
      background-size:contain;
    }
    .text{
      font-size: 14px;
      color: #999;
      margin-left: 5px;
    }
  }
  .br{
    height: 10px;
    background: rgba(204,241,246,0.4);
  }
  .list{
    p{
      font-size: 14px;
      color: #999;
    }
    .weui_cells:before,.weui_cells:after{
      border-top: none;
      border-bottom:none;
    }
    .weui_cells{
      margin-top:0;
    }
    .weui_cell:before{
      border-top:1px solid #ccf1f6;
    }
  }
  .list_icon{
    width: 21px;
    height: 21px;
    vertical-align: middle;
    margin-right: 10px;
  }
}

</style>
