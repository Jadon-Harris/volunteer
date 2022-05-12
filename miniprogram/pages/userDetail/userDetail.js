const dataUtil = require('../../utils/dataUtil.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateUser: {},
    copyUser: {}, //用于点击取消按钮后恢复原对象
    editButton: "修改",
    readOnly: true,
    genderItems: [{
        value: 'male',
        name: '男'
      },
      {
        value: 'female',
        name: '女'
      }
    ],
    idtypeItems: [{
        value: '身份证',
        name: '身份证'
      },
      {
        value: '学生证',
        name: '学生证'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      user
    } = options;
    let userObj = JSON.parse(user);
    // let userObj = {
    //   "_id": "7dab9bf662722dd3004f81537b90bf0b",
    //   "birthday": new Date("1999-02-08 20:5:30"),
    //   "credit": 0.0,
    //   "gender": "male",
    //   "idtype": "身份证",
    //   "password": "123456",
    //   "phone": "15545671234",
    //   "email": "123456@163.com",
    //   "realname": "德文布克",
    //   "username": "Booker",
    //   "level": "1"
    // }
    this.setData({
      updateUser: userObj,
      copyUser: JSON.parse(JSON.stringify(userObj))
    })
    this.initRadio();
  },

  //根据updateUser给radio中的items赋值
  initRadio() {
    let {
      genderItems,
      idtypeItems,
      updateUser
    } = this.data;
    genderItems.forEach(v => {
      v.checked = false;
      if (v.value === updateUser.gender) {
        v.checked = true;
      }
    })
    idtypeItems.forEach(v => {
      v.checked = false;
      if (v.value === updateUser.idtype) {
        v.checked = true;
      }
    })
    this.setData({
      genderItems,
      idtypeItems
    })
  },

  //根据_id获取数据
  getData() {
    dataUtil.searchById('user', this.data.updateUser._id).then(res => {
      this.setData({
        updateUser: res.data,
        copyUser: JSON.parse(JSON.stringify(res.data))
      })
    })
  },

  //如果取消，恢复数据，修改按钮和只读状态
  handleEditButton() {
    if (!this.data.readOnly) {
      this.setData({
        updateUser: JSON.parse(JSON.stringify(this.data.copyUser))
      })
      //将radio状态修改回去
      this.initRadio();
    }
    this.handleEdit();
  },

  //修改按钮和只读状态
  handleEdit() {
    let readOnly = !this.data.readOnly;
    let editButton = readOnly === true ? "修改" : "取消";
    this.setData({
      readOnly,
      editButton
    });
  },

  //提交按钮
  handleSubmit() {
    console.log(this.data.updateUser);
    dataUtil.update('user', this.data.updateUser._id, this.copyObjExceptId(this.data.updateUser)).then(res => {
      this.handleEdit();
      //将copyUser赋值
      this.setData({
        copyUser: JSON.parse(JSON.stringify(this.data.updateUser))
      })
    }).catch(err => {
      this.handleEditButton();
    })
  },

  //复制对象（除了_id属性），进行提交修改
  copyObjExceptId(obj) {
    let newObj = {};
    for (var key in obj) {
      if (key !== '_id') {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  },

  usernameInput(e) {
    this.setData({
      'updateUser.username': e.detail.value
    });
  },

  realnameInput(e) {
    this.setData({
      'updateUser.realname': e.detail.value
    });
  },

  passwordInput(e) {
    this.setData({
      'updateUser.password': e.detail.value
    });
  },

  emailInput(e) {
    this.setData({
      'updateUser.email': e.detail.value
    });
  },

  radioChange1(e) {
    this.setData({
      'updateUser.gender': e.detail.value
    });
  },

  radioChange2(e) {
    this.setData({
      'updateUser.idtype': e.detail.value
    });
    // const {items} = this.data;
    // for (let i = 0, len = items.length; i < len; ++i) {
    //   items[i].checked = items[i].value === e.detail.value
    // }
    // this.setData({
    //   items
    // })
  },

  phoneInput(e) {
    this.setData({
      'updateUser.phone': e.detail.value
    });
  },

})