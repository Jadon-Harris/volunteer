// pages/ex_history/ex_history.js
import SignInServices from "./../../services/SignInServices";
import timeServices from "./../../services/timeServices"
var exhis=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
       a:1,
       order:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    exhis=this;
    SignInServices.getOrderById("1",function (data) {
      
      var all=data;
      for (var i = 0; i < all.length; i++) {
        var rdate=data[i].date.toISOString()
        all[i].date=rdate
      }
      exhis.setData({
        order:all,
        a:2
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})