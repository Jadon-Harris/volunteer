import activityStorage from "../../services/activityStorage";
import activityTypeStorage from "../../services/activityTypeStorage"
var testPage = null;

// pages/testPage/testPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    animationData: {},
    typeList: [],
    stateList: []
  },

  showSelectPage() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    animation.translateX(500).step()
    this.setData({
      animationData: animation.export(),
      show: true
    })
    setTimeout(() => {
      animation.translateX(0).step()
      this.setData({
        animationData: animation.export(),
      })
    }, 50)
  },

  // 隐藏遮罩层
  hideSelectPage() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    animation.translateX(500).step()
    this.setData({
      animationData: animation.export()
    })
    setTimeout(() => {
      animation.translateX(0).step()
      this.setData({
        animationData: animation.export(),
        show: false
      })
    }, 400)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    testPage = this;
    activityTypeStorage.getAllActivityTypes(function (res) {
      testPage.setData({
        typeList: res
      });
    });

    activityStorage.getAllActivityStates(function (res) {
      testPage.setData({
        stateList: res
      });
      console.log(testPage.data.stateList)
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


// Page({
//   a: function (params) {
//     console.log("a is be tapped")
//   },

//   onReady: function () {
//     this.animation = wx.createAnimation()
//   },
//   translate: function () {
//     this.setData({
//       isRuleTrue: true
//     })
//     this.animation.translate(-245, 0).step()
//     this.setData({
//       animation: this.animation.export()
//     })
//   },

//   success: function () {
//     this.setData({
//       isRuleTrue: false
//     })
//     this.animation.translate(0, 0).step()
//     this.setData({
//       animation: this.animation.export()
//     })
//   },
//   tryDriver: function () {
//     this.setData({
//       background: "#89dcf8"
//     })
//   }
// })