wx.cloud.init();
const db = wx.cloud.database();

var userStorage = {
  adduser: function (user, callback) {
    db.collection("user").add({
      data: {
        birthday: user.birthday,
        credit: 0,
        level: 1,
        email: user.email,
        gender: user.gender,
        idtype: user.idtype,
        password: user.password,
        phone: user.phone,
        realname: user.realname,
        username: user.username,
        avatarSrc: user.avatarSrc
      },
      success: function (res) {
        callback()
      }
    })
  },
  login: function (username, password, callback) {
    db.collection("user").where({
      username: username,
      password: password
    }).get({
      success: function (result) {
        callback(result.data)
      }
    })
  }
}

module.exports = userStorage