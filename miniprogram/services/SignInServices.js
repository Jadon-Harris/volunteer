import timeServices from "../services/timeServices";
wx.cloud.init();
const db = wx.cloud.database();
var SignInServices = {
  /**
   * 根据月份和年获取本月签到
   * @param {Function} callback 回调函数
   */
  getAllRiByYM: function (userid,year,month,callback) {
    var date1= new Date(Date.parse(timeServices.getStartDayByYM(year,month).replace(/-/g,  "/")));
    var date2= new Date(Date.parse(timeServices.getStartDayByYM(year,month+1).replace(/-/g,  "/"))); 
    console.log(date1);
    console.log(date2);
    const _ = db.command
    db.collection('signin').where({
      userid:userid,
      signInDate: _.gt(date1).and(_.lt(date2))
    }).get({
      success: function(res) {
        
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        callback(res.data)
      }
    })
    
  },
  /**
   * 根据id获取个人今天是否签到
   * @param {Function} callback 回调函数
   */
  addTodayByID: function (lianxu,userid,callback) {
    db.collection('signin').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        userid:userid,
        signInDate: new Date(),
        lianXu:lianxu+1
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        callback(res.data)
      }
    })
    
  },
  /**
   * 根据id获取个人订单
   * @param {Function} callback 回调函数
   */
  getOrderById: function (userid,callback) {
    db.collection('exchangeOrder').where({
      userId:userid
    }).get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        callback(res.data)
      }
    })
    
  },
  /**
   * 根据id获取个人本月所有签到日期
   * @param {Function} callback 回调函数
   */
  getAllRiByID: function (userid,callback) {
    var date1= new Date(Date.parse(timeServices.getStartDayOfMonth().replace(/-/g,  "/")));
    var date2= new Date(Date.parse(timeServices.getEndDayOfMonth().replace(/-/g,  "/"))); 
    const _ = db.command
    db.collection('signin').where({
      userid:userid,
      signInDate: _.gt(date1).and(_.lt(date2))
    }).get({
      success: function(res) {
        
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        callback(res.data)
      }
    })
    
  },
  /**
   * 
   * 获取所有活动种类
   * @param {Function} callback 回调函数
   */
  getAllActivityTypes: function (callback) {
    db.collection('activity_type').where({}).get({
      success: function (res) {
        callback(res.data)
      }
    })
  }
}

module.exports = SignInServices;