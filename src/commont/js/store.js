/**
 * Created by Administrator on 2017/2/17 0017.
 */
//存储用户登录状态
export function saveUserStatus(bool,id) {
  let obj = {};
      obj.status = bool;
      obj.id = id;
  window.localStorage.__user__ =JSON.stringify(obj);
};
//获取用户登录状态
export function getUserStatus() {
  if(window.localStorage.__user__){
    return JSON.parse(window.localStorage.__user__);
  }
  return false;
};

//保存用户信息至本地
export function loadFromLocal(id, key, data) {
  //是否为第一次读取
  let usermsg = window.localStorage.__usermsg__;
  //如果为空 创建一个新对象
  if(!usermsg){
    usermsg = {};
    usermsg[id] = {};
  }else{
    //如果用户存在查看是否为同一个用户  存储多个用户
    usermsg = JSON.parse(usermsg);
    if(!usermsg[id]){
      usermsg[id] = {};
    }
  }
  usermsg[id][key] = data;
  window.localStorage.__usermsg__ = JSON.stringify(usermsg);
};

//获取本地用户信息
/*传入用户id  要获取的key值*/
export function getFromLocal(id) {
  let usermsg = window.localStorage.__usermsg__;
  //如果从未创建过 直接返回false
  if (!usermsg) {
    return false;
  }
  //根据id获取对应的用户本地数据
  usermsg = JSON.parse(usermsg)[id];
  //如果已经不存在或者清除返回false
  if (!usermsg) {
    return false;
  }
  return usermsg.msg;
};
