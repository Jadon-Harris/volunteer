// pages/usersmanage/usersmanage.js
import activityStorage from "../../services/activityStorage";
const util = require('../../utils/util.js')
const app = getApp();

Page({
  data: {
    activityList: [],
    copyList: []
  },

  onLoad: function (options) {
    this.getData();
  },

  onShow: function (options) {
    this.getData()
  },

  getData() {
    //查询数据==>根据organizer-id查找activity表
    if (app.globalData.userInfo != null) {
      console.log(app.globalData.userInfo._id)
      activityStorage.getActivitiesByContidion({
        orgainzerid: app.globalData.userInfo._id
      }, res => {
        let newArray = this.dateToString(res);
        this.setData({
          activityList: newArray,
          copyList: JSON.parse(JSON.stringify(newArray))
        })
      })
    } else {
      wx.showToast({
        title: '未登录',
        icon: 'error',
        duration: 1000
      })
    }
  },

  //将数组时间戳转为字符串
  dateToString(array) {
    for (let i = 0; i < array.length; i++) {
      array[i]['time'] = util.formatTime(array[i]['time']);
    }
    return array;
  },

  goUsers(e) {
    let activityJson = JSON.stringify(e.currentTarget.dataset.activity);
    wx.navigateTo({
      url: '/pages/userList/userList?activity=' + activityJson,
    })
  },

  //接收子组件传值
  handleInputChange(e) {
    let value = e.detail;
    this.setData({
      value
    })
  },

  handleClickButton() {
    if (this.data.value === '') {
      this.setData({
        activityList: this.data.copyList
      });
      return;
    }
    let activityList = this.data.copyList.filter(v => v.name.indexOf(this.data.value) >= 0);
    this.setData({
      activityList
    });
  }

})