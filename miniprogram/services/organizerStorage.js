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
  },

  addOrganizer: function (organizer, callback) {
    db.collection("organizer").add({
      data: {
        idtype: organizer.idtype,
        manageremail: organizer.manageremail,
        managerid: organizer.managerid,
        managername: organizer.managername,
        managerphone: organizer.managerphone,
        name: organizer.name,
        password: organizer.password,
        avatarSrc: organizer.avatarSrc
      },
      success: function (res) {
        callback()
      }
    })
  },

  login: function (username, password, callback) {
    db.collection("organizer").where({
      name: username,
      password: password
    }).get({
      success: function (result) {
        callback(result.data)
      }
    })
  }
}

module.exports = organizerStorage;