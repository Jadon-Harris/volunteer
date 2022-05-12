wx.cloud.init();
const db = wx.cloud.database()
const command = db.command

var userStorage = {

  /**
   * 根据_id获取user
   * @param {String} id 
   */
  getUserById(id) {
    return new Promise((reslove, reject) => {
      db.collection('user').doc(id).get()
        .then(res => {
          reslove(res.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  /**
   * 修改user信息
   * @param {String} id 
   * @param {Object} updateData 
   */
  updateUser(id, updateData) {
    return new Promise((reslove, reject) => {
      db.collection('user').doc(id).update({
          data: updateData
        })
        .then(res => {
          reslove(res);
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  /**
   * 根据志愿活动id获取人员列表
   * @param {Object} where 
   * @param {Function} callback 
   */
  getUserByActivityId(where,callback){
    wx.cloud.callFunction({
      name: 'getUserByActivityId',
      data: {
        condition: where,
      }
    }).then(res => {
      callback(res.result.list)
    })
  }

};

module.exports = userStorage