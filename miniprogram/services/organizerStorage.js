wx.cloud.init();
const db = wx.cloud.database();

var organizerStorage = {
  /**
   * 根据_id获取对应的type对象
   * @param {String} _id typeid
   * @param {Function} callback 回调函数
   */
  getOrganizerById: function (_id, callback) {
    db.collection('organizer').where({
      _id: _id
    }).limit(1).get({
      success: function (res) {
        callback(res.data)
      }
    })
  }
}

module.exports = organizerStorage;