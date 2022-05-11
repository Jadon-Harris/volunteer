// pages/activity/activity.js
import activityTypeStorage from '../../services/activityTypeStorage'
import organizerStorage from '../../services/organizerStorage'
import orderStorage from '../../services/orderStorage'
var app = getApp();
var activityPage = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: null,
    activityType: "",
    year: "",
    month: "",
    day: "",
    organizer: "",
    isVolunteer: false
  },

  showAddress: function () {
    const latitude = this.data.activity.address.latitude
    const longitude = this.data.activity.address.longitude
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
  },

  getManagerPhone: function () {
    var phone = this.data.activity.managerphone
    wx.showModal({
      title: '联系人电话',
      content: phone,
      confirmText: '复制',
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: activityPage.data.activity.managerphone,
            success(res) {
              wx.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 1000
              })
            }
          })
        }
      }
    })
  },

  join: function () {
    orderStorage.addOrder(this.data.activity._id, app.globalData.userInfo._id, function () {
      wx.navigateBack({
        delta: 1,
        success() {
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 1000
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    activityPage = this;
    var isVolunteer = (app.globalData.userInfo.userType == 'volunteer')
    this.setData({
      isVolunteer: isVolunteer
    })

    var activity = JSON.parse(options.activityJson)

    this.setData({
      activity: activity
    })

    var date = new Date(this.data.activity.time)
    this.setData({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDay()
    })

    activityTypeStorage.getActivityTypeById(activityPage.data.activity.typeid, function (res) {
      activityPage.setData({
        activityType: res[0].name
      })
    });

    organizerStorage.getOrganizerById(activityPage.data.activity.orgainzerid, function (res) {
      activityPage.setData({
        organizer: res[0].name
      })
    })
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