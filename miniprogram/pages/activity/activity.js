// pages/activity/activity.js
import activityTypeStorage from '../../services/activityTypeStorage'
var activityPage = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: {
      "address": {
        address: "辽宁省沈阳市浑南区智慧四街",
        errMsg: "chooseLocation:ok",
        latitude: 41.67718,
        longitude: 123.4631,
        name: "浑南区沈阳市政府(智慧四街东)"
      },
      "credit": 10,
      "detail": "拿球说话",
      "distance": 0,
      "managername": "朱欧文",
      "managerphone": "13322472185",
      "name": "未成年心理辅导",
      "orgainzerid": "eb85cafe6257d69000ac632a705600c9",
      "recruitPlan": 12,
      "recruited": 10,
      "state": "招募待启动",
      "time": "2022-04-01T08:04:21.000Z",
      "typeid": "fe4f571c6257d50e004d21a315f0cb8b",
      "_id": "0067b443625ad55d00e182b060b76ce8"
    },
    activityType: "",
    year: "",
    month: "",
    day: ""
  },

  showAddress: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    activityPage = this;

    // var activity = JSON.parse(options.activityJson)

    // this.setData({
    //   activity: JSON.parse(options.activityJson)
    // })

    var date = new Date(this.data.activity.time)
    this.setData({
      year: date.getFullYear(),
      month: date.getMonth()+1,
      day: date.getDay()
    })

    activityTypeStorage.getActivityTypeById(activityPage.data.activity.typeid, function (res) {
      activityPage.setData({
        activityType: res[0].name
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})