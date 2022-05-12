// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var db = cloud.database()
var $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  let {
    condition
  } = event;
  return db.collection("order").aggregate() //选择order表
    .match(condition)
    .lookup({
      from: "user", //把user表关联上
      localField: 'userid', //order表的关联字段
      foreignField: '_id', //user表的关联字段
      as: 'userinfo' //匹配的结果作为userinfo
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$userinfo', 0]), '$$ROOT'])
    })
    .project({
      userinfo: 0
    })
    .end()
    .then(res => {
      return res
    }).catch(err => {
      return err
    })
}