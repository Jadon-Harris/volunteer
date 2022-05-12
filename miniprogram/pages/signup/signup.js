// pages/signup/signup.js
import userStorage from '../../services/userStroage'
import organizerStorage from '../../services/organizerStorage'
var signupPage = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    volunteer: {},
    organizer: {},
    isVolunteer: 'false',
    avatarSrc: null,
    idTypeArray: ['身份证', '护照'],
    idType: '请选择证件类型',
    genderArray: ['男', '女'],
    gender: '请选择性别',
    birth: 'xxxx-xx-xx'
  },

  selectAvatar: function () {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        signupPage.setData({
          avatarSrc: res.tempFiles[0].tempFilePath
        })
      }
    })
  },

  inputName: function (event) {
    if (this.data.isVolunteer) {
      this.data.volunteer['username'] = event.detail.value
    } else {
      this.data.organizer['name'] = event.detail.value
    }
  },

  inputPassword: function (event) {
    if (this.data.isVolunteer) {
      this.data.volunteer['password'] = event.detail.value
    } else {
      this.data.organizer['password'] = event.detail.value
    }
  },

  inputRealName: function (event) {
    if (this.data.isVolunteer) {
      this.data.volunteer['realname'] = event.detail.value
    } else {
      this.data.organizer['managername'] = event.detail.value
    }
  },

  genderPicker: function (event) {
    this.setData({
      gender: this.data.genderArray[event.detail.value],
    })
    this.data.volunteer['gender'] = this.data.gender
  },

  idTypePicker: function (event) {
    this.setData({
      idType: this.data.idTypeArray[event.detail.value]
    })
    if (this.data.isVolunteer) {
      this.data.volunteer['idtype'] = this.data.idType
    } else {
      this.data.organizer['idtype'] = this.data.idType
    }
  },

  inputId: function (event) {
    if (this.data.isVolunteer) {
      this.data.volunteer['id'] = event.detail.value
    } else {
      this.data.organizer['managerid'] = event.detail.value
    }
  },

  idConfirm: function (event) {
    var id = event.detail.value
    if (id.length != 18) {
      wx.showToast({
        title: '格式错误',
        icon: 'error',
        duration: 1000
      })
    } else {
      var year = id.substring(6, 10)
      var month = id.substring(10, 12)
      var day = id.substring(12, 14)
      var dateString = year + '-' + month + '-' + day
      this.setData({
        birth: dateString
      })
      var date = new Date(dateString)
      this.data.volunteer['birthday'] = date
    }
  },

  inputPhone: function (event) {
    if (this.data.isVolunteer) {
      this.data.volunteer['phone'] = event.detail.value
    } else {
      this.data.organizer['managerphone'] = event.detail.value
    }
  },

  inputEmail: function (event) {
    if (this.data.isVolunteer) {
      this.data.volunteer['email'] = event.detail.value
    } else {
      this.data.organizer['manageremail'] = event.detail.value
    }
  },

  signUp: function (event) {
    console.log(this.data.volunteer)
    if (this.data.isVolunteer) {
      let cloudPath = "userAvatar/" + this.data.volunteer.id + Date.now() + ".jpg";
      wx.cloud.uploadFile({
        cloudPath,
        filePath: this.data.avatarSrc
      }).then(res => {
        this.data.volunteer['avatarSrc'] = res.fileID
        userStorage.adduser(this.data.volunteer, function () {
          wx.navigateBack({
            delta: 1,
            success() {
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 1000
              })
            }
          })
        })
      })
    } else {
      let cloudPath = "organizerAvatar/" + this.data.organizer.managerid + Date.now() + ".jpg";
      wx.cloud.uploadFile({
        cloudPath,
        filePath: this.data.avatarSrc
      }).then(res => {
        this.data.organizer['avatarSrc'] = res.fileID
        organizerStorage.addOrganizer(this.data.organizer, function () {
          wx.navigateBack({
            delta: 1,
            success() {
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 1000
              })
            }
          })
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    signupPage = this;
    console.log(options)
    this.setData({
      isVolunteer:options.isVolunteer
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})