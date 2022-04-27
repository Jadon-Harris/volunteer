// components/upAndDownIcon/upAndDownIcon.js
import activityStorage from "../../services/activityStorage";
import activityTypeStorage from "../../services/activityTypeStorage";
var activitiesSorter = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    timeUpArrowImageSrc: "../../images/upArrow/upArrow.png",
    timeDownArrowImageSrc: "../../images/downArrow/downArrow.png",
    positionUpArrowImageSrc: "../../images/upArrow/upArrow.png",
    positionDownArrowImageSrc: "../../images/downArrow/downArrow.png",
    timeSortUpOrDown: null,
    positionSortUpOrDown: null,

    show: false,
    animationData: {},
    typeList: [],
    stateList: [],
    currentTypeIndex: 0,
    currentStateIndex: 0
  },

  observers: {
    'timeSortUpOrDown': function (timeSortUpOrDown) {
      if (timeSortUpOrDown == null) {
        this.setData({
          timeUpArrowImageSrc: "../../images/upArrow/upArrow.png",
          timeDownArrowImageSrc: "../../images/downArrow/downArrow.png",
        })
      }
    },
    'positionSortUpOrDown': function (positionSortUpOrDown) {
      if (positionSortUpOrDown == null) {
        this.setData({
          positionUpArrowImageSrc: "../../images/upArrow/upArrow.png",
          positionDownArrowImageSrc: "../../images/downArrow/downArrow.png",
        })
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    timeViewTap: function () {
      if (this.data.timeSortUpOrDown == null || this.data.timeSortUpOrDown == "up") {
        this.setData({
          timeUpArrowImageSrc: "../../images/upArrow/upArrow.png",
          timeDownArrowImageSrc: "../../images/downArrow/downArrow_HL.png",
          timeSortUpOrDown: "down"
        })
      } else {
        this.setData({
          timeUpArrowImageSrc: "../../images/upArrow/upArrow_HL.png",
          timeDownArrowImageSrc: "../../images/downArrow/downArrow.png",
          timeSortUpOrDown: "up"
        })
      }
      this.triggerEvent('timeSortType', {
        value: this.data.timeSortUpOrDown
      })
    },

    positionViewTap: function () {
      if (this.data.positionSortUpOrDown == null || this.data.positionSortUpOrDown == "up") {
        this.setData({
          positionUpArrowImageSrc: "../../images/upArrow/upArrow.png",
          positionDownArrowImageSrc: "../../images/downArrow/downArrow_HL.png",
          positionSortUpOrDown: "down"
        })
      } else {
        this.setData({
          positionUpArrowImageSrc: "../../images/upArrow/upArrow_HL.png",
          positionDownArrowImageSrc: "../../images/downArrow/downArrow.png",
          positionSortUpOrDown: "up"
        })
      }
      this.triggerEvent('positionSortType', {
        value: this.data.positionSortUpOrDown
      })
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

    selectType: function (event) {
      this.setData({
        currentTypeIndex: event.currentTarget.dataset.typeindex
      })
    },

    selectState: function (event) {
      this.setData({
        currentStateIndex: event.currentTarget.dataset.stateindex
      })
    },

    clear: function () {
      this.setData({
        currentTypeIndex: 0,
        currentStateIndex: 0
      })
    },

    filter: function () {
      var condition = {};
      if (this.data.currentTypeIndex != 0) {
        condition["typeid"] = this.data.typeList[this.data.currentTypeIndex]._id
      }
      if(this.data.currentStateIndex!=0){
        condition["state"] = this.data.stateList[this.data.currentStateIndex]
      }
      this.triggerEvent("filter",condition)
      this.hideSelectPage()
    }
  },
  lifetimes: {
    attached: function () {
      activitiesSorter = this;
      activityTypeStorage.getAllActivityTypes(function (res) {
        var res = [{
          name: "全部"
        }, ...res]
        activitiesSorter.setData({
          typeList: res
        });
      });

      activityStorage.getAllActivityStates(function (res) {
        var res = ["全部", ...res]
        activitiesSorter.setData({
          stateList: res
        });
      });
    }
  }
})