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
  }
}

module.exports = activityTypeStorage;