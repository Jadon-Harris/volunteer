wx.cloud.init();
const db = wx.cloud.database()

var orderStroage = {
  /**
   * 报名活动
   * @param {String} activityId 活动id
   * @param {String} userId 用户id
   * @param {Function} callback 回调函数
   */
  addOrder: function (activityId, userId, callback) {
    db.collection('order').add({
      data: {
        activityid: activityId,
        userid: userId
      },
      success: function (res) {
        callback()
      }
    })
  }
}

module.exports = orderStroage