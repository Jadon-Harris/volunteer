// pages/addActivity/addActivity.js
var addActivityPage = null;
var app = getApp();
import locationService from '../../services/locationService';
import activityStorage from '../../services/activityStorage';
import activityTypeStorage from '../../services/activityTypeStorage';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    date: '请选择活动时间',
    address: '请选择活动地址',
    addressObject: null,
    credit: '请选择活动积分',
    detail: '',
    pickerRange: [],
    managerName: '',
    managerPhone: '',
    recruitPlan: 0,
    typeObjectRange: [],
    typeRange: [],
    type: '请选择活动类型',
    typeid: ''
  },

  inputName: function (event) {
    this.setData({
      name: event.detail.value
    })
  },

  datepicker: function (event) {
    this.setData({
      date: event.detail.value
    })
  },

  selectAddress: function () {
    locationService.chooseLocation(function (res) {
      addActivityPage.setData({
        address: res.name,
        addressObject: res
      })
    })
  },

  typepicker: function (event) {
    this.setData({
      type: addActivityPage.data.typeRange[event.detail.value],
      typeid: addActivityPage.data.typeObjectRange[event.detail.value]._id,
    })
  },

  creditpicker: function (event) {
    this.setData({
      credit: addActivityPage.data.pickerRange[event.detail.value]
    })
  },

  inputManagerName: function (event) {
    this.setData({
      managerName: event.detail.value
    })
  },

  inputManagerPhone: function (event) {
    this.setData({
      managerPhone: event.detail.value
    })
  },

  inputRecruitPlan: function (event) {
    this.setData({
      recruitPlan: event.detail.value
    })
  },

  inputDetail: function (event) {
    this.setData({
      detail: event.detail.value
    })
  },

  addActivity: function () {
    var activity = {
      "name": this.data.name,
      "typeid": this.data.typeid,
      "address": this.data.addressObject,
      "time": new Date(this.data.date),
      "managername": this.data.managerName,
      "managerphone": this.data.managerPhone,
      "detail": this.data.detail,
      "orgainzerid": app.globalData.userInfo._id,
      "state": "招募中",
      "recruitPlan": this.data.recruitPlan,
      "recruited": 0,
      "credit": this.data.credit
    }
    activityStorage.addActivity(activity, function () {
      wx.navigateBack({
        delta: 1,
        success() {
          wx.showToast({
            title: '新建成功',
            icon: 'success',
            duration: 1000,
          });
        }
      })

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    addActivityPage = this;
    this.setData({
      pickerRange: Array(30).toString().split(',').map((item, index) => index + 1)
    })
    activityTypeStorage.getAllActivityTypes(function (res) {
      var types = res.map(e => e.name)
      addActivityPage.setData({
        typeRange: types,
        typeObjectRange: res
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