<template>
  <div class="login_warpper" v-if="loginshow">
    <div class="login_top">
      <span class="login_back" @click="back"></span>
      <h1>登录</h1>
    </div>
    <div class="login_content">
      <tab :line-width=2 active-color='#01bbd4' v-model="index">
        <tab-item  class="vux-center" v-for="(item,index) in tab_list" >{{item}}</tab-item>
      </tab>
      <swiper v-model="index" :show-dots="false" animate:false>
        <swiper-item  ref="swiper1">
          <div class="tab-swiper vux-center">
            <group>
              <cell class="paswapper">
                <img slot="icon" width="15" height="20" style="display:block;margin-right:5px;" src="login_phone.png">
                <x-input
                  v-model="account"
                  class="password"
                  type="number"
                  slot="after-title"
                  placeholder="请输入帐号"
                  :show-clear="false">
                </x-input>
              </cell>
              <cell class="paswapper">
                <img
                  slot="icon"
                  width="15"
                  height="20"
                  style="display:block;margin-right:5px;"
                  src="password.png">
                <input
                  ref="pasw"
                  v-model="password"
                  class="weui_input password"
                  type="password"
                  slot="after-title"
                  placeholder="请输入密码">
                <span slot="value" class="eye" :class="{'eyeshow':eyeshow}" @click="pashow">&nbsp</span>
              </cell>
              <x-button class="login" type="primary" @click.native="accountlogin">登录</x-button>
            </group>
          </div>
        </swiper-item>
        <swiper-item  ref="swiper2">
          <div class="tab-swiper vux-center">
            <group>
              <cell class="paswapper">
                <img slot="icon" width="15" height="20" style="display:block;margin-right:5px;" src="login_phone.png">
                <x-input
                  v-model="phone"
                  class="password"
                  type="number"
                  slot="after-title"
                  placeholder="请输入帐号"
                  :show-clear="false">
                </x-input>
              </cell>
              <cell class="paswapper">
                <img
                  slot="icon"
                  width="17"
                  height="15"
                  style="display:block;margin-right:5px;position:relative;left:-1px;"
                  src="msg.png">
                <input
                  v-model="yzm"
                  class="weui_input password"
                  type="password"
                  slot="after-title"
                  placeholder="请输入验证码">
                <span slot="value" class="yzm">
                  <i class="yzm_btn">获取验证码</i>
                </span>
              </cell>
              <x-button class="login" type="primary" @click.native="phonelogin">登录</x-button>
            </group>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import group from '../../../node_modules/vux/src/components/group/index.vue';
  import cell from '../../../node_modules/vux/src/components/cell/index.vue';
  import XInput from '../../../node_modules/vux/src/components/x-input/index.vue';
  import Tab from '../../../node_modules/vux/src/components/tab/tab.vue';
  import TabItem from '../../../node_modules/vux/src/components/tab/tab-item.vue';
  import Swiper from '../../../node_modules/vux/src/components/swiper/swiper.vue';
  import SwiperItem from '../../../node_modules/vux/src/components/swiper/swiper-item.vue';
  import XButton  from '../../../node_modules/vux/src/components/x-button/index.vue';

  export  default {
    data() {
      return {
        loginshow:true,
        tab_list: ['帐号登录','手机验证码登录'],
        index: 0,
        pass_type:'password',
        eyeshow:true,
        password:'',                //密码
        account:'',                 //帐号
        phone:'',                   //手机号
        yzm: ''                     //验证码
      }
    },
    methods: {
      back(){

      },
      pashow(){
        this.eyeshow = !this.eyeshow;
        if(this.eyeshow){
          this.$refs.pasw.type = "number";
        }else{
          this.$refs.pasw.type = "password";
        }

      },
      //手机验证码登录
      phonelogin() {

      },
      //帐号登录
      accountlogin() {
        if(!this.account){
          alert('请输入帐号')
          return
        }
        if(!this.password){
          alert('请输入密码')
          return
        }
        this.$http.get('/Api/login', {
          params: {
            tel: this.account,
            pwd: this.password,
          }
        }).then((response)=>{
          var data = response.body;
        })
      }
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      group,
      cell,
      XInput,
      XButton
    }
  }
</script>

<style lang="less">
.login_warpper{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: url("bg.jpg") no-repeat ;
  background-size:100% 100%;
  .login_top{
    position: fixed;
    width: 100%;
    height: 40px;
    background: #efffff;
    box-sizing: border-box;
    z-index: 10;
    h1{
      font-weight: 400;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #333;
    }
    .login_back{
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
  .login_content{
    position: relative;
    top: 40px;
    .vux-tab{
      margin: 0 0;
      background: inherit;
    }
    .vux-swiper{
      height: calc(~"100vh - 88px") !important;
    }
    .paswapper{
      padding: 10px 30px;
      &>.weui_cell_hd{
        margin-right: 10px;
      }
      .password{
        border-radius: 0;
        padding: 5px 0;
        border-bottom: 1px solid #ececec;
      }
    }
    .weui_cells{
      background: inherit;
      .weui_cell_bd > p{
        position: relative;
      }
      .eye,.yzm{
        display: inline-block;
        width: 30px;
        height: 27px;
        font-size: 14px;
        background:url("eyeclose.png") no-repeat center;
        background-size: 20px 10px;
        z-index: 10;
        border-bottom: 1px solid #ececec;
      }
      .yzm{

        width: 100px;
        .yzm_btn{
          font-style: normal;
          color: #ffffff;
          text-align: center;
          padding: 5px 10px;
          background: #01bbd4;
          border-radius: 5px;
        }
      }
      .eyeshow{
        background:url("eyeshow.png") no-repeat center;
        background-size: 20px 10px;
      }
    }
    .login{
      width: 90%;
      background-color:#01bbd4;
    }
    .weui_cells::after,.weui_cells::before,.paswapper::before{
      height: 0;
      border: none;
    }
    .weui_input{
      font-size: 14px;
      color: #333;
    }
    .weui_input::-webkit-input-placeholder{
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
