import {
  formatTime,
  formatDate
} from "../../utils/util.js";
import activityStorage from "../../services/activityStorage";

Page({
  data: {
    tabs: [{
      id: 0,
      value: '待启动',
      isActive: true
    }, {
      id: 1,
      value: '招募中',
      isActive: false
    }, {
      id: 2,
      value: '已结束',
      isActive: false
    }, {
      id: 3,
      value: '已结项',
      isActive: false
    }],
    orderList: [],
    showList: [],
    value: ''
  },

  onLoad(options) {
    let {
      state
    } = options;
    this.getData(() => {
      this.changeTitleByIndex(parseInt(state));
    });
  },

  onShow: function (options) {
    // 1 获取当前小程序的页面栈-数组 长度最大是10页面
    let pages = getCurrentPages();
    // 2 数组中索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    const {
      state
    } = currentPage.options;
    // this.getData(() => {
    //   this.changeTitleByIndex(parseInt(state));
    // });
  },

  getData(callback) {
    //调用云函数，获取该用户的活动列表
    activityStorage.getActivityByUserId({
      userid: getApp().globalData.userInfo._id
    }, res => {
      let orderList = res;
      //将时间格式化
      orderList.forEach(v => {
        v.time = formatDate(new Date(v.time))
      })
      this.setData({
        orderList
      })
      //自定义回调函数
      typeof callback == "function" && callback()
    })
  },

  //根据标题索引来激活选中
  changeTitleByIndex(index) {
    let {
      tabs,
      orderList,
      showList
    } = this.data;
    tabs.forEach((v, i) => {
      v.isActive = i === index ? true : false;
    })
    //更新showList进行显示
    showList = orderList.filter(v => v.state === tabs[index].value);
    this.setData({
      tabs,
      showList,
      copyList: JSON.parse(JSON.stringify(showList))
    })
  },

  //标题点击事件，从子组件传递过来
  handleTabsItemChange(e) {
    const {
      index
    } = e.detail;
    this.changeTitleByIndex(index);
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
        showList: this.data.copyList
      });
      return;
    }
    let showList = this.data.copyList.filter(v => v.name.indexOf(this.data.value) >= 0 || v.time.indexOf(this.data.value) >= 0);
    this.setData({
      showList
    });
  }

})