import {
  formatTime,
  formatDate
} from "../../utils/util.js";

const app = getApp();
Page({
  data: {
    collectnum: 0,
    collectlist: [],
    msg: "helloworld",
    userinfo: {},
    isLogin: false
  },

  onLoad() {},

  onShow() {
    this.getLoginUser();
  },

  getLoginUser: function () {
    console.log("从全局变量中获取登录用户");
    const userinfo = app.globalData.userInfo;
    if (userinfo) {
      this.setData({
        userinfo,
        isLogin: true
      });
    }
  },

  //跳转到订单界面
  goOrderList(e){
    let {state} = e.currentTarget.dataset;
    if (isLogin) {
      wx.navigateTo({
        url: `/pages/orderlist/orderlist?state=${state}`,
      })
    } else{
      wx.showToast({
        title: '您还没有登录！',
        icon: 'none',
        mask: true
      })
    }
  },

  //跳转到个人信息界面
  goUserInfo() {
    wx.navigateTo({
      url: '/pages/userinfo/userinfo',
    })
  },

  //跳转到收藏界面
  goCollect() {
    let listjson = JSON.stringify(this.data.collectlist);
    wx.navigateTo({
      url: '/pages/collect/collect?collectlistjson=' + listjson,
    })
  },

  //登录
  login() {
    wx.getUserProfile({
      desc: '必须授权登录才可以使用',

      success: res => {
        let userinfo = res.userInfo;
        //将静态资源中的userInfo赋值
        getApp().globalData.userInfo = userinfo;
        this.setData({
          userinfo,
          isLogin: true
        })
      },
      fail: res => {
        console.log('授权失败', res)
      }
    })
  },

  //退出登录
  logout() {
    //判断对象userinfo是否为空
    if (JSON.stringify(this.data.userinfo) !== '{}') {
      //弹窗提示
      wx.showModal({
        title: '提示',
        content: '您是否要退出？',
        success: (res) => {
          if (res.confirm) {
            //将userinfo对象置空
            this.setData({
              userinfo: {},
              isLogin: false
            });
            //将静态资源中的userInfo置空
            getApp().globalData.userInfo = null;
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    } else {
      wx.showToast({
        title: '您还没有登录！',
        icon: 'none',
        mask: true
      })
    }
  }
})