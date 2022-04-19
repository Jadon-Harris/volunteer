wx.cloud.init();
const db = wx.cloud.database()
const command = db.command

var activityStorage = {

  /**
   * 获取所有活动。
   * @param {Function} callback 查询成功的回调函数。
   */
  getAllActivities: function (callback) {
    db.collection("activity").where({}).get({
      success: function (result) {
        callback(result.data)
      }
    });
  },

  /**
   * 根据条件对活动进行模糊搜索。
   * @param {string} searchContent 搜索条件。
   * @param {Function} callback 查询成功的回调函数。
   */
  searchActivities(searchContent, callback) {
    db.collection("activity").where(command.or([{
        name: db.RegExp({
          regexp: '.*' + searchContent,
          options: 'i'
        })
      },
      {
        address: db.RegExp({
          regexp: '.*' + searchContent,
          options: 'i'
        })
      }
    ])).get({
      success: function (result) {
        callback(result.data)
      }
    })
  }
};

module.exports = activityStorage