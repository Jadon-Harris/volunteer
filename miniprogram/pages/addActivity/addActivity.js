// pages/addActivity/addActivity.js
var addActivityPage = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    date: '请选择活动时间',
    address: '请选择活动地址',
    credit: '请选择活动积分',
    detail: '',
    pickerRange: [],
    managerName: '',
    managerPhone: ''
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

  creditpicker: function (event) {
    this.setData({
      credit: addActivityPage.data.pickerRange[event.detail.value]
    })
  },

  inputManagerName: function (event) {
    this.setData({
      managerName:event.detail.value
    })
  },

  inputManagerPhone: function (event) {
    this.setData({
      managerPhone:event.detail.value
    })
  },

  inputDetail:function (event) {
    this.setData({
      detail:event.detail.value
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