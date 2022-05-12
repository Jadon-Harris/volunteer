// pages/usersmanage/usersmanage.js
const dataUtil = require('../../utils/dataUtil.js')
const util = require('../../utils/util.js')

Page({
  data: {
    activityList: [],
    copyList: []
  },

  onLoad: function (options) {
    this.getData();
  },

  getData() {
    //查询数据==>根据organizer-id查找activity表
    dataUtil.search('activity', {orgainzerid:'eb85cafe6257d69000ac632a705600c9'}).then(res => {
      let newArray =this.dateToString(res.data);
      this.setData({
        activityList: newArray,
        copyList: JSON.parse(JSON.stringify(newArray))
      })
    });
    // let activityList = [{
    //   id: 1,
    //   name: '探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院探访敬老院',
    //   time: '2022-4-27',
    //   pic: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    //   state: 0
    // }, {
    //   id: 2,
    //   name: '打扫街道',
    //   time: '2022-4-28',
    //   // pic: 'cloud://irving-2gbns2to29b8bc6b.6972-irving-2gbns2to29b8bc6b-1311037830/image/huanghelou.png',
    //   state: 1
    // }, {
    //   id: 3,
    //   name: '打扫学校',
    //   time: '2022-5-28',
    //   pic: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    //   state: 1
    // }, {
    //   id: 4,
    //   name: '送饭',
    //   time: '2022-4-28',
    //   pic: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    //   state: 2
    // }]
    // this.setData({
    //   activityList,
    //   copyList: JSON.parse(JSON.stringify(activityList))
    // })
  },

  //将数组时间戳转为字符串
  dateToString(array){
    for(let i=0;i<array.length;i++){
      array[i]['time'] = util.formatTime(array[i]['time']);
    }
    return array;
  },

  goUsers(e){
    let activityJson = JSON.stringify(e.currentTarget.dataset.activity);
    wx.navigateTo({
      url: '/pages/users/users?activity='+activityJson,
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