<template>
  <div class="teamcustom_wapper">
    <div class="teamcustom_top">
      <span class="teamcustom_back" @click="back"></span>
      <h1>团队定制</h1>
    </div>
    <div class="teamcustom_content">
      <group >
        <x-number :title="title" :mode="num" :min="0" :max=100 width="30px"></x-number>
        <datetime
          title="起始日期"
          :start-date="starDay"
          :min-year="2017"
          v-model="starDay"
          @on-change="change"
          confirm-text="确认"
          cancel-text="取消"
          year-row="{value}年"
          month-row="{value}月"
          day-row="{value}日">
        </datetime>
        <datetime
          title="结束日期"
          :start-date="starDay"
          :min-year="2017"
          v-model="endDay"
          @on-change="change"
          confirm-text="确认"
          cancel-text="取消"
          year-row="{value}年"
          month-row="{value}月"
          day-row="{value}日">
        </datetime>
        <x-input title="出发地点" placeholder="请详细填写您的出发地址" v-model="star_address"></x-input>
        <x-input title="目的地址" placeholder="请详细填写您的目的地址" v-model="end_address"></x-input>
        <x-input class="yusuan"  title="预算 ¥" placeholder="0" v-model="yusuan"></x-input>
      </group>
      <group >
        <x-input title="联系人 " placeholder="必填" v-model="user"></x-input>
        <x-input title="联系电话" placeholder="必填" v-model="user_phone"></x-input>
        <div class="weui_cell">
          <div class="weui_cell_hd">
            <label class="weui_label" style="width: 5em;">备注</label>
          </div>
        </div>
        <x-textarea  class="texarea" :max="200" :height="100" placeholder="请填写详细信息"></x-textarea>
      </group>
      <div class="post" >
        <x-button type="primary" :mini="true" style="margin:10px auto;width:100px;height:40px;">提交</x-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import group from '../../../node_modules/vux/src/components/group/index.vue';
  import XNumber  from '../../../node_modules/vux/src/components/x-number/index.vue';
  import datetime from '../../../node_modules/vux/src/components/datetime/index.vue';
  import cell from '../../../node_modules/vux/src/components/cell/index.vue';
  import XInput from '../../../node_modules/vux/src/components/x-input/index.vue';
  import XTextarea from '../../../node_modules/vux/src/components/x-textarea/index.vue';
  import XButton from '../../../node_modules/vux/src/components/x-button/index.vue';
  let d = new Date();
  let nowday = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
  let nextday = d.getFullYear()+"-"+(d.getMonth()+2)+"-"+d.getDate();
  export default {
    name:"team",
    data() {
      return {
        title: "预定人数",
        num: 0,
        starDay:nowday,
        endDay:nextday,
        star_address:'',
        end_address: '',
        yusuan:'',
        user:'',
        user_phone:''
      }
    },
    methods: {
      change() {

      },
      back(){
        this.$router.go(-1)
      }
    },
    components: {
      group,
      XNumber,
      datetime,
      XInput,
      XTextarea,
      cell,
      XButton
    }
  }
</script>

<style lang="less">
.teamcustom_wapper{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #ffffff;
  .teamcustom_top{
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
    .teamcustom_back{
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
  .teamcustom_content{
    position: absolute;
    top: 40px;
    bottom: 0px;
    width: 100%;
    .yusuan{
      background: #ffcc33;
    }
    .post{
      text-align: center;
    }
  }


  //修改框架UI样式
  .vux-number-selector{
    color: #01bbd4;
  }
  .weui_cells{
    margin-top: 0;
  }
  .weui_cells:before,.weui_cells:after{
    height: 0;
    border: none;
  }
  .weui_cell_bd > p, .weui_label,.vux-datetime-value,.vux-number-input,.weui_input,.weui_textarea{
    font-size: 14px;
    font-weight: 400;
    color: #333;
  }
  .weui_input::-webkit-input-placeholder,.weui_textarea_counter{
    font-size: 13px;
  }
  .texarea{
    padding: 0;
    margin: 5px 10px;
    border: 1px solid #01bbd4;
  }
}
</style>
