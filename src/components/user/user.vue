<template>
  <div class="userwapper">
    <div class="user_top">

      <blur :blur-amount=0 :url="blurimg">
        <div class="user_content">
          <div class="user_img">
            <img v-if="userlogin" :src="url+userdata.user_face">
            <img v-if="!userlogin" src="http://www.lagou.com/images/myresume/default_headpic.png" @click="gologin" >
          </div>
          <a id="login" v-if="!userlogin" @click="gologin">登录</a>
          <div class="user_name" v-if="userlogin">
            <span class="text">{{userdata.user_nickname}}</span>
            <span class="leav">LV.{{userdata.user_collect}}</span>
          </div>
          <div class="user_account" v-if="userlogin">账号:{{userdata.user_mobile}}</div>
        </div>
      </blur>
    </div>
    <div class="user_money">
      <div class="coupons" style="border-right:1px solid #01bbd4" @click="wallet">
        <span class="coupons_icon icon"></span>
        <span class="text">钱包</span>
      </div>
      <div class="wallet" @click="coupon">
        <span class="wallet_icon icon"></span>
        <span class="text">优惠券</span>
      </div>
    </div>
    <div class="br"></div>
    <div class="list">
      <group>
        <cell title="我的订单" is-link  @click.native="sell">
          <img class="list_icon" slot="icon" src="order.png">
        </cell>
        <cell title="我的收藏" is-link @click.native="coll">
          <img class="list_icon" slot="icon" src="coll.png">
        </cell>
        <cell title="我的团队定制" is-link>
          <img class="list_icon" slot="icon" src="team.png">
        </cell>
      </group>
      <div class="br"></div>
      <group>
        <cell title="我要加盟" is-link @click.native="feedback">
          <img class="list_icon" slot="icon" src="phone.png">
        </cell>
        <cell title="意见反馈" is-link @click.native="opinion">
          <img class="list_icon" slot="icon" src="comment.png">
        </cell>
        <cell title="关于四季游玩" is-link @click.native="about">
          <img class="list_icon" slot="icon" src="leav.png">
        </cell>
      </group>
    </div>
    <a v-if="userlogin"  class="quit" @click="quit">退出登录</a>
    <wallet v-if="walletshow" v-on:back="wallethide"></wallet>
    <coupon v-if="couponshow" v-on:back="couponhide"></coupon>
    <sell v-if="sellshow && userlogin" :id="id" v-on:back="sellhide"></sell>
    <coll v-if="collshow && userlogin" v-on:back="collhide"></coll>
    <feedback v-if="feedbackshow" v-on:back="feedbackhide"></feedback>
    <about v-if="aboutshow" v-on:back="abouthide"></about>
    <opinion v-if="opinionshow" v-on:back="opinionhide"></opinion>
  </div>
</template>

<script type="text/ecmascript-6">
  import Blur from '../../../node_modules/vux/src/components/blur/index.vue';
  import group from '../../../node_modules/vux/src/components/group/index.vue';
  import cell from '../../../node_modules/vux/src/components/cell/index.vue';
  import wallet from './wallet.vue';
  import coupon from './coupon.vue';
  import sell from './sell.vue';
  import coll from './coll.vue';
  import feedback from './feedback.vue';
  import about from './about.vue';
  import opinion from './opinion.vue';
  import {saveUserStatus, getUserStatus, loadFromLocal, getFromLocal} from  '../../commont/js/store';

  export default {
    data() {
      return {
        blurimg: 'http://app.flower-china.cn/dist/img/userbg.jpg',
        url: 'http://www.bjsjyw.cn',
        walletshow:false,
        couponshow:false,
        sellshow:false,
        collshow:false,
        feedbackshow:false,
        aboutshow:false,
        opinionshow:false
      }
    },
    created() {
      this.userlogin = getUserStatus().status;
    },
    methods: {
      gologin() {
        this.$router.push('login')
      },
      quit() {
        saveUserStatus(false,null);
        this.$router.push('home');
      },
      wallet() {
        if(!this.userlogin){
          this.$router.push('login')
        }else{
          this.walletshow = true;
        }
      },
      wallethide() {
        this.walletshow = false;
      },
      coupon(){
        if(!this.userlogin){
          this.$router.push('login')
        }else{
          this.couponshow = true;
        }
      },
      couponhide() {
        this.couponshow = false;
      },
      sell() {
        if(!this.userlogin){
          this.$router.push('login')
        }else{
          this.sellshow = true;
        }
      },
      sellhide(){
        this.sellshow = false;
      },
      coll() {
        if(!this.userlogin){
          this.$router.push('login')
        }else{
          this.collshow = true;
        }
      },
      collhide(){
        this.collshow = false;
      },
      feedback(){
        this.feedbackshow = true;
      },
      feedbackhide(){
        this.feedbackshow = false;
      },
      about(){
        this.aboutshow = true;
      },
      abouthide() {
        this.aboutshow = false;
      },
      opinion(){
        this.opinionshow = true;
      },
      opinionhide(){
        this.opinionshow = false;
      }
    },
    computed: {
      userdata() {
        if(this.userlogin){
          return getFromLocal(getUserStatus().id)
        }
        return false
      },
      id() {
        if(this.userlogin){
          return getUserStatus().id
        }
      }
    },
    components: {
      Blur,
      group,
      cell,
      wallet,
      coupon,
      sell,
      coll,
      feedback,
      about,
      opinion
    }
  }
</script>

<style lang="less">
#login{
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  color: #ffffff;
  padding: 15px;
  z-index: 2;
}
.userwapper{
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
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
      border:2px solid white;
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
      top: 104px;
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
        padding: 0px 8px;
        font-size: 12px;
        line-height: 14px;
        color: #e9bd1d;
        border: 1px solid #e9bd1d;
        border-radius: 7px;
        letter-spacing: 1px;
      }
    }
    .user_account{
      position: absolute;
      top: 128px;
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
  .quit{
    display: block;
    width: 300px;
    height: 40px;
    margin: 10px auto;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    border-radius: 5px;
    color: #fff;
    background: #d80000;
  }
  .list_icon{
    width: 21px;
    height: 21px;
    vertical-align: middle;
    margin-right: 10px;
  }
}

</style>
