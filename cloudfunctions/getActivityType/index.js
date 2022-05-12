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
  return db.collection("activity_type").aggregate() //选择order表
    .match(condition)
    .lookup({
      from: "activity", //把activity表关联上
      localField: '_id', //activity_type表的关联字段
      foreignField: 'typeid', //activity表的关联字段
      as: 'list' //匹配的结果作为list
    })
    // .replaceRoot({
    //   newRoot: $.mergeObjects([$.arrayElemAt(['$activityinfo', 0]), '$$ROOT'])
    // })
    // .project({
    //   activityinfo: 0
    // })
    .end()
    .then(res => {
      return res
    }).catch(err => {
      return err
    })
}