// components/activitiesFilter/activitiesFilter.js
import activityStorage from "../../services/activityStorage";
import activityTypeStorage from "../../services/activityTypeStorage";
var activitiesFilter = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    animationData: {},
    typeList: [],
    stateList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  },

  lifetimes: {
    attached: function () {
      activitiesFilter = this;
      activityTypeStorage.getAllActivityTypes(function (res) {
        activitiesFilter.setData({
          typeList: res
        });
      });

      activityStorage.getAllActivityStates(function (res) {
        activitiesFilter.setData({
          stateList: res
        });
      });
    }
  }
})