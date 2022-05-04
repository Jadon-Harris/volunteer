// components/activityItem/activityItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activity: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    name: "",
    state: "",
    address: "",
    recruitPlan: "",
    recruited: "",
    year: 0,
    month: 0,
    day: 0,
    distance: 0,
    credit: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached: function () {
      var activity = this.properties.activity;
      var date = new Date(activity.time);
      this.setData({
        name: activity.name,
        state: activity.state,
        address: activity.address,
        recruitPlan: activity.recruitPlan,
        recruited: activity.recruited,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        // 确定距离
        distance: activity.distance,
        credit:activity.credit
      });
    }
  }
})