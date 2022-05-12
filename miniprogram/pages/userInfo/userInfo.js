const util = require('../../utils/util.js')
import userStorage from "../../services/userStorage"

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
  onLoad: function () {
    this.getData(res=>{
      let userObj = getApp().globalData.userInfo;
      //将时间Date转化为字符串
      userObj.birthday = util.formatDate(new Date(userObj.birthday));
      this.setData({
        updateUser: userObj,
        copyUser: JSON.parse(JSON.stringify(userObj))
      })
      this.initRadio();
    })
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
  getData(cb) {
    userStorage.getUserById(getApp().globalData.userInfo._id).then(res => {
      getApp().globalData.userInfo=res
      this.setData({
        updateUser: res,
        copyUser: JSON.parse(JSON.stringify(res))
      })
      cb()
    })
    // dataUtil.searchById('user', this.data.updateUser._id).then(res => {
    //   this.setData({
    //     updateUser: res.data,
    //     copyUser: JSON.parse(JSON.stringify(res.data))
    //   })
    // })
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
    console.log(this.copyObjExceptId(this.data.updateUser));
    userStorage.updateUser(this.data.updateUser._id, this.copyObjExceptId(this.data.updateUser)).then(res => {
      this.handleEdit();
      //将copyUser赋值
      this.setData({
        copyUser: JSON.parse(JSON.stringify(this.data.updateUser))
      })
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        mask: true,
      });
    }).catch(err => {
      this.handleEditButton();
      wx.showToast({
        title: '修改失败',
        icon: 'error',
        mask: true,
      });
    })
  },

  //复制对象（除了_id属性），进行提交修改
  copyObjExceptId(obj) {
    let newObj = {};
    for (var key in obj) {
      if (key !== '_id') {
        if (key === 'birthday') {
          //将字符串转化为Date
          newObj[key] = new Date(obj[key]);
        } else {
          newObj[key] = obj[key];
        }
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

  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'updateUser.birthday': e.detail.value
    })
    // console.log(util.formatTime(e.detail.value))
  },

})