// miniprogram/pages/homepage/homepage.js


const app = getApp()

Page({
  data: {
    jifen:50,
    swiperImgNo: 1,
    imgSwiperUrl: '',
    fruitInfo: [],
    typeCat: [
      { id: 0, name: "热菜" },
      { id: 1, name: "凉菜" },
      { id: 2, name: "新鲜上架" },
      { id: 3, name: "店主推荐" },
    ],
    activeTypeId: 0,
    isShow:true, 
    openid: '',   
    offLine:null  //是否维护
  },

  // 获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'add',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
    })
  },

  // ------------加入购物车------------
  history:function(e){
    wx.navigateTo({
      url: '../ex_history/ex_history',
      success: function(res){},
      fail: function() {},
      complete: function() {}
    })
  },
  addCartByHome: function(e) {
    let value= e.currentTarget.dataset.value
    console.log(value.price)
    wx.showModal({
      title: '确定兑换该商品吗',
      content: '一经兑换无法退换',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
          console.log(res);
          if (res.confirm) {
              if(10>value.price){
                wx.navigateTo({
                  url: '../ex_sucess/ex_sucess',
                  success: function(res){},
                  fail: function() {},
                  complete: function() {}
                })
              }else{
                wx.navigateTo({
                  url: '../ex_fail/ex_fail',
                  success: function(res){},
                  fail: function() {},
                  complete: function() {}
                })
              }
          }else{
              console.log('用户点击辅助操作')
          }
      }
  });
  },


  // ------------分类展示切换---------
  typeSwitch: function(e) {
     console.log(e.currentTarget.id)
    getCurrentPages()["0"].setData({
      activeTypeId: parseInt(e.currentTarget.id)
    })
    switch (e.currentTarget.id) {
      // 全部展示
      case '0':
        app.getInfoByOrder('fruit-board', 'time', 'desc',
          e => {
            console.log(e.data)
            getCurrentPages()["0"].setData({
              fruitInfo: e.data
            })
          }
        )
        break;
      // 今日特惠
      case '1':
        app.getInfoWhere('fruit-board', {myClass:'1'},
          e => {
            getCurrentPages()["0"].setData({
              fruitInfo: e.data
            })
          }
        )
        break;
      // 销量排行
      case '2':
        app.getInfoByOrder('fruit-board','time','desc',
          e => {
            getCurrentPages()["0"].setData({
              fruitInfo: e.data
            })
          }
        )
        break;
      // 店主推荐
      case '3':
        app.getInfoWhere('fruit-board', { recommend: '1' },
          e => {
            getCurrentPages()["0"].setData({
              fruitInfo: e.data
            })
          }
        )
        break;
    }
  },


  // ---------点击跳转至详情页面-------------
  tapToDetail: function(e) {
    wx.navigateTo({
      url: '../detail/detail?_id=' + e.currentTarget.dataset.fid,
    })
  },


  // ------------生命周期函数------------
  onLoad: function (options) {
    var that = this
    
const db = wx.cloud.database()
  db.collection('exchangeOb').get({
  success: function(res) {
    // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    console.log(res.data)
    getCurrentPages()["0"].setData({
      fruitInfo: res.data
    })
    
  }
})
    
  },

  onReady: function () {
    // console.log(getCurrentPages()["0"].data)
  },

  onShow: function () {
    var that = this
    // 水果信息
    // app.getInfoFromSet('fruit-board', {},
    //   e => {
    //     // console.log(e.data)
    //     getCurrentPages()["0"].setData({
    //       fruitInfo: e.data,
    //       isShow: true
    //     })
    //     wx.hideLoading()
    //   }
    // )
    
    
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {
    return {
      title: '水果园byVoyz',
      imageUrl: '../../images/icon/fruit.jpg',
      path: '/pages/homepage/homepage'
    }
  }

})