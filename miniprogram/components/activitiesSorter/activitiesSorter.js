// components/upAndDownIcon/upAndDownIcon.js
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
  }
})