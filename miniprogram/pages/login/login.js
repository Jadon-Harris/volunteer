// pages/login/login.js
import userStorage from '../../services/userStroage'
import organizerStorage from '../../services/organizerStorage'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isVolunteer: true,
    username: "",
    password: ""
  },

  switchIsVolunteer: function (event) {
    if (this.data.isVolunteer == false) {
      this.setData({
        isVolunteer: event.detail.value
      })
    } else {
      this.setData({
        isVolunteer: true
      })
    }
  },

  switchIsOrganizer: function (event) {
    if (this.data.isVolunteer == true) {
      this.setData({
        isVolunteer: !event.detail.value
      })
    } else {
      this.setData({
        isVolunteer: false
      })
    }
  },

  inputUsername: function (event) {
    this.setData({
      username: event.detail.value
    })
  },

  inputPassword: function (event) {
    this.setData({
      password: event.detail.value
    })
  },

  signUp: function (event) {
    wx.navigateTo({
      url: '../signup/signup?isVolunteer=' + this.data.isVolunteer,
    })
  },

  login: function () {
    if (this.data.isVolunteer == true) {
      userStorage.login(this.data.username, this.data.password, function (res) {
        if (res.length != 0) {
          var userInfo = res[0]
          userInfo['userType'] = 'volunteer'
          app.globalData.userInfo = userInfo
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: '密码错误',
            icon: 'error',
            duration: 1000
          })
        }
      })
    } else {
      organizerStorage.login(this.data.username, this.data.password, function (res) {
        if (res.length != 0) {
          var userInfo = res[0]
          userInfo['userType'] = 'organizer'
          app.globalData.userInfo = userInfo
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: '密码错误',
            icon: 'error',
            duration: 1000
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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