wx.cloud.init();
const db = wx.cloud.database();

var activityTypeStorage = {
  /**
   * 获取所有活动种类
   * @param {Function} callback 回调函数
   */
  getAllActivityTypes: function (callback) {
    db.collection('activity_type').where({}).get({
      success: function (res) {
        callback(res.data)
      }
    })
  },

  /**
   * 根据_id获取对应的type对象
   * @param {String} _id typeid
   * @param {Function} callback 回调函数
   */
  getActivityTypeById: function (_id, callback) {
    db.collection('activity_type').where({
      _id: _id
    }).limit(1).get({
      success: function (res) {
        callback(res.data)
      }
    })
  }
}

module.exports = activityTypeStorage;