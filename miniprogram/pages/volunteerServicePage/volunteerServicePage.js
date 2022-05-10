// pages/volunteerServicePage/volunteerServicePage.js
import activityStorage from "../../services/activityStorage";
import locationService from "../../services/locationService"
var volunteerServicePage = null;
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiper中图片的路径
    swiperImages: [
      "../../images/swiper/swiperImage1.jpg",
      "../../images/swiper/swiperImage2.jpg"
    ],
    // 从数据库中查询出的数据
    activities: [],
    // 用户输入的搜索条件
    searchContent: "",
    position: null,
  },

  timeViewTap: function (event) {
    const activitiesSorter = this.selectComponent(".activitiesSorter");
    if (activitiesSorter.data.positionSortUpOrDown != null) {
      activitiesSorter.setData({
        positionSortUpOrDown: null
      })
    }

    var temp = this.data.activities;
    if (event.detail.value == "down") {
      temp.sort(function (a, b) {
        return b.time <= a.time ? 1 : -1
      })
    } else if (event.detail.value == "up") {
      temp.sort(function (a, b) {
        return b.time < a.time ? -1 : 1
      })
    }
    this.setData({
      activities: temp
    })
  },

  positionViewTap: function (event) {
    const activitiesSorter = this.selectComponent(".activitiesSorter");
    if (activitiesSorter.data.timeSortUpOrDown != null) {
      activitiesSorter.setData({
        timeSortUpOrDown: null
      })
    }

    var temp = this.data.activities;

    if (event.detail.value == "down") {
      temp.sort(function (a, b) {
        return b.distance <= a.distance ? 1 : -1
      })
    } else if (event.detail.value == "up") {
      temp.sort(function (a, b) {
        return b.distance < a.distance ? -1 : 1
      })
    }
    this.setData({
      activities: temp
    })
  },

  inputConfirm: function () {
    activityStorage.searchActivities(this.data.searchContent, function (data) {
      data.map(activity => {
        activity["distance"] = locationService.getDistance(volunteerServicePage.data.position, activity.address);
      })
      var res = JSON.parse(JSON.stringify(data))
      volunteerServicePage.setData({
        activities: res,
      });
      const activitiesSorter = volunteerServicePage.selectComponent(".activitiesSorter");
      activitiesSorter.setData({
        timeSortUpOrDown: null,
        positionSortUpOrDown: null
      })
    })
  },

  input: function (event) {
    this.setData({
      searchContent: event.detail.value
    })
  },

  blur: function () {
    if (this.data.searchContent == '') {
      activityStorage.getAllActivities(function (data) {
        data.map(activity => {
          activity["distance"] = locationService.getDistance(volunteerServicePage.data.position, activity.address);
        })
        var res = JSON.parse(JSON.stringify(data));
        volunteerServicePage.setData({
          activities: res,
        });
      });
      const activitiesSorter = this.selectComponent(".activitiesSorter");
      activitiesSorter.setData({
        timeSortUpOrDown: null,
        positionSortUpOrDown: null
      })
    }
  },

  filter: function (event) {
    var where = JSON.stringify(event.detail)
    activityStorage.getActivitiesByContidion(where, function (data) {
      if (data.length == 0) {
        wx.showToast({
          title: '无相关结果',
          icon: 'error',
          duration: 2000
        })
      } else {
        data.forEach(activity => {
          activity["distance"] = locationService.getDistance(volunteerServicePage.data.position, activity.address);
        })
        var res = JSON.parse(JSON.stringify(data));
        volunteerServicePage.setData({
          activities: res,
        });

      }
    })
    const activitiesSorter = this.selectComponent(".activitiesSorter");
    activitiesSorter.setData({
      timeSortUpOrDown: null,
      positionSortUpOrDown: null
    })
  },

  add: function () {
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '未登录',
        icon: 'error',
        duration: 1000
      })
    } else if (app.globalData.userInfo.userType != 'organizer') {
      wx.showToast({
        title: '账号权限不足',
        icon: 'error',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '../addActivity/addActivity',
      })
    }
  },
  itemTap: function (event) {
    var activity = event.detail.activity;
    var activityJson = JSON.stringify(activity)
    wx.navigateTo({
      url: '../activity/activity?activityJson=' + activityJson,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    volunteerServicePage = this;
    locationService.getUserLocation(function (res) {
      volunteerServicePage.setData({
        position: res
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
    activityStorage.getAllActivities(function (data) {
      data.map(activity => {
        activity["distance"] = locationService.getDistance(activity.address, volunteerServicePage.data.position);
      })

      var res = JSON.parse(JSON.stringify(data));
      volunteerServicePage.setData({
        activities: res,
      });
    });
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