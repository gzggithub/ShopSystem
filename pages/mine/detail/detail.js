// pages/mine/detail/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: ['男', '女'],
    index: 0,
    userInfo: app.globalData.userInfo,
    hiddenCompanyPut: true,
    hiddenSignPut: true,
    hiddenNickNamePut: true,
    hiddenTelNumPut: true,
    nickName: '小郭',
    date: '2018-09-27',
    telNum: '13221075103',
    company: '快豹',
    remark: '快豹',
  },

  bindViewEvent: function(e) {
    var that = this;
    that.setData({
      index: e.detail.value,
      userInfo: {
        gender: e.detail.value
      }
    })
    console.log(that.userInfo)
  },

  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // if (app.globalData.userInfo) {
    //   that.setData({
    //     userInfo: app.globalData.userInfo,
    //     index: app.globalData.userInfo.gender
    //   })
    // }

    // wx.request({
    //   url: 'http://192.168.10.12:3000/api/users',
    //   method: 'GET',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json',
    //     'token': wx.getStorageSync("token")
    //   },
    //   success: function(res) {
    //     console.log(res);
    //     that.setData({
    //       userInfo: res.data,
    //       index: res.data.gender
    //     })
    //   },
    //   fail: function(res) {
    //     console.log(res);
    //   }
    // })
  },

  changeAvatar: function() {
    var that = this;
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success(res) {
    //     var tempFilePaths = res.tempFilePaths
    //     that.setData({
    //       userInfo: {
    //         avatarUrl: tempFilePaths
    //       }
    //     });
    //   }
    // })
  },

  changeName: function() { 
    var that = this;
    // wx.navigateTo({
    //   url: './modify/modify',
    // })
    that.setData({
      hiddenNickNamePut: !that.data.hiddenNickNamePut
    })
    console.log(1)
  },

  changeTelNum: function() {
    var that = this;
    that.setData({
      hiddenTelNumPut: !that.data.hiddenTelNumPut
    })
  },

  changeCompany: function() {
    this.setData({
      hiddenCompanyPut: !this.data.hiddenCompanyPut
    })
  },

  changeSign: function() {
    this.setData({
      hiddenSignPut: !this.data.hiddenSignPut
    })
  },

  inputNickName: function(e) {
    var that = this;
    that.setData({
      // userInfo: {
        nickName: e.detail.value
      // }
    })
    console.log(that.userInfo)
  },

  inputTelNum: function(e) {
    var that = this;
    that.setData({
      telNum: e.detail.value
    })
  },

  inputCompany: function(e) {
    var that = this;
    that.setData({
      userInfo: {
        company: e.detail.value
      }
    })
    console.log(that.userInfo)
  },

  inputSign: function(e) {
    var that = this;
    that.setData({
      userInfo: {
        remark: e.detail.value
      }
    })
  },

  //取消按钮  
  cancel: function() {
    this.setData({
      hiddenNickNamePut: true,
      hiddenTelNumPut: true,
      hiddenCompanyPut: true,
      hiddenSignPut: true,
    });
  },
  //确认  
  confirm: function(e) {
    var that = this;
    that.setData({
      hiddenNickNamePut: true,
      hiddenTelNumPut: true,
      hiddenCompanyPut: true,
      hiddenSignPut: true,
    })
    // var data = that.userInfo.nickName;
    // console.log(data)

    // wx.request({
    //   url: 'http://192.168.10.12:3000/api/users',
    //   method: 'GET',
    //   data: {
        // name: that.name,
        // gender: that.index,
        // phone_number: that.phone_number,
        // company: that.company,
        // remark: that.remark
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function(res) {
    //     console.log(res);
    //   },
    //   fail: function(res) {
    //     console.log(res);
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})