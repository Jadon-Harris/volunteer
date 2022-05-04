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
  },

  /**
   * 获取所有活动状态。
   * @param {Function} callback 回调函数
   */
  getAllActivityStates: function (callback) {
    wx.cloud.callFunction({
      name: "getAllActivityStates"
    }).then(res => {
      callback(res.result.list[0].states)
    })
  },

  /**
   * 根据筛选中的条件进行查询。
   * @param {String} where 查询条件。
   * @param {Function} callback 回调函数。
   */
  getActivitiesByContidion: function (where, callback) {
    db.collection("activity").where(where).get({
      success: function (result) {
        callback(result.data)
      }
    })
  },

  addActivity: function (activity, callback) {
    db.collection("activity").add({
      data: {
        address: activity.address,
        credit: activity.credit,
        detail: activity.detail,
        managername: activity.managername,
        managerphone: activity.managerphone,
        name: activity.name,
        orgainzerid: activity.orgainzerid,
        recruitPlan: activity.recruitPlan,
        recruited: activity.recruited,
        state: activity.state,
        time: new Date(activity.date),
        typeid: activity.typeid
      },
      success: function (res) {
        callback()
      }
    })
  }
};

module.exports = activityStorage