const userStorage = require('../../services/userStorage.js');
const dataUtil = require('../../utils/dataUtil.js')

Page({
  data: {
    list: [],
    copyList: [],
    value: '',
    level: NaN
  },

  onLoad(options) {
    let activityObj = JSON.parse(options.activity);
    wx.setNavigationBarTitle({
      title: activityObj.name,
    })
    this.getData(activityObj._id);
    // let {list} = this.data
    // list[0]= getApp().globalData.userInfo
    // this.setData({
    //   list
    // })
  },

  getData(id) {
    //调用云函数，获取参加该活动的人员列表
    userStorage.getUserByActivityId({
      activityid: id
    }, res => {
      this.setData({
        list: res,
        copyList: JSON.parse(JSON.stringify(res))
      })
    })
  },

  goUserDetail(e) {
    let userJson = JSON.stringify(e.currentTarget.dataset.user);
    wx.navigateTo({
      url: '../userDetail/userDetail?user=' + userJson,
    })
  },

  handleDelete(e) {
    let id = e.currentTarget.dataset.id;
    console.log(this)
    wx.showModal({
      title: '提示',
      content: '是否删除该条数据',
      success: (res) => {
        if (res.confirm) {
          dataUtil.remove('goods', id).then(res => {
            this.search();
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //接收子组件传值
  handleInputChange(e) {
    let value = e.detail;
    this.setData({
      level: parseInt(value),
      value
    })
  },

  handleClickButton() {
    // if (isNaN(this.data.price)) { //显示数组的全部
    if (this.data.value === '') {
      this.setData({
        list: this.data.copyList
      });
      return;
    }
    let list = this.data.copyList.filter(v => v.username.toLowerCase().indexOf(this.data.value.toLowerCase()) >= 0 || v.level == this.data.value);
    // let list = this.data.copyList.filter(v => v.price === this.data.price);
    this.setData({
      list
    });
  }

})

/* 
  search(id) {
    //查询数据
    // dataUtil.search('goods', {}).then(res => {
    //   this.setData({
    //     list: res.data,
    //     copyList: JSON.parse(JSON.stringify(res.data))
    //   })
    // });
    let {
      list
    } = this.data;
    dataUtil.search('order', {
      activityid: id
    }).then(res => {
      let userIdList = res.data;
      userIdList.forEach(e => {
        dataUtil.searchById('user', e.userid).then(res => {
          list.push(res.data);
        })
      });
    });
  },
*/