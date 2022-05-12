let dataObject = {
  dataBase: wx.cloud.database(),
  a:1
}

//查询数据
const search = (table, where) => {
  return new Promise((reslove, reject) => {
    dataObject.dataBase.collection(table).where(where).get()
      .then(res => {
        console.log(`数据库表'${table}'请求成功`, res);
        reslove(res);
      })
      .catch(err => {
        console.error(`数据库表'${table}'请求失败`, err);
        reject(err);
      })
  })
}

//查询单条数据
const searchById = (table, id) => {
  return new Promise((reslove, reject) => {
    dataObject.dataBase.collection(table).doc(id).get()
      .then(res => {
        console.log(`数据库表'${table}'请求成功`, res);
        reslove(res);
      })
      .catch(err => {
        console.error(`数据库表'${table}'请求失败`, err);
        reject(err);
      })
  })
}

//添加数据
const add = (table, addData) => {
  return new Promise((reslove, reject) => {
    dataObject.dataBase.collection(table).add({
        data: addData
      })
      .then(res => {
        console.log(`数据库表'${table}'添加数据成功`, res);
        reslove(res);
      })
      .catch(err => {
        console.error(`数据库表'${table}'添加数据失败`, err);
      })
  })
}

//更新修改数据
const update = (table, id, updateData) => {
  return new Promise((reslove, reject) => {
    dataObject.dataBase.collection(table).doc(id).update({
        data: updateData
      })
      .then(res => {
        console.log(`数据库表'${table}'修改数据成功`, res);
        reslove(res);
      })
      .catch(err => {
        console.error(`数据库表'${table}'修改数据失败`, err);
        reject(err);
      })
  })
}

//删除数据
const remove = (table, id) => {
  return new Promise((reslove, reject) => {
    dataObject.dataBase.collection(table).doc(id).remove()
      .then(res => {
        console.log(`数据库表'${table}'删除数据成功`, res);
        reslove(res);
      })
      .catch(err => {
        console.error(`数据库表'${table}'删除数据失败`, err);
      })
  })
}

module.exports = {
  dataObject,
  search,
  searchById,
  add,
  update,
  remove
}

// wx.cloud.database().collection('goods').get({
//   //查询操作
//   //请求成功
//   success(res) {
//     console.log('请求成功', res);
//   },
//   //请求失败
//   fail(err) {
//     console.log('请求失败', err);
//   }
// })
// //es6的简洁写法
// wx.cloud.database().collection('goods').get()
//   .then(res => {
//     console.log('第二种方法请求成功', res.data);
//     this.setData({
//       list: res.data
//     })
//   })
//   .catch(err => {
//     console.log('第二种方法请求失败', err);
//   })