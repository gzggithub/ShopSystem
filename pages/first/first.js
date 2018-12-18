// pages/first/first.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  onLoad: function () {
    var that = this;
    
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    console.log(wx.getStorageSync("openId"))
    if (wx.getStorageSync("openId")) {
      console.log(wx.getStorageSync("openId"))
      return;
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxe9d1cc01d41c9952&secret=18924cd8fe16b659cf75084d1b9b2c36&js_code=' + res.code + '&grant_type=authorization_code',
              data: {},
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                // console.log(that.globalData.userInfo)
                // that.globalData.userInfo = {
                //   openId: res.data.openid
                // }
                // console.log(that.globalData.userInfo)
                // console.log(that.globalData.userInfo.openId)
                wx.setStorageSync('openId', res.data.openid);
                console.log(res.data.openid)
                wx.request({
                  url: 'http://192.168.10.12:3000/api/auth/signup',
                  method: 'POST',
                  data: {
                    "openId": res.data.openid,
                    "displayName": app.globalData.userInfo.nickName,
                    "real_name": "b",
                    "pinyin": "xiao",
                    "gender": app.globalData.userInfo.gender,
                    "phone_number": "1888333333",
                    "title": "t",
                  },
                  header: {
                    'content-type': 'application/json',
                    'token': wx.getStorageSync("token"),
                  },
                  success: function (res) {
                    console.log(res);
                    if (res.statusCode == 200) {
                      that.setData({
                        userInfo: res.data,
                        hasLogin: true
                      })
                    }
                  },
                  fail: function (res) {
                    console.log(res);
                    // wx.showToast({
                    //   title: res.errMsg
                    // })
                  }
                });
              },
              fail: function (res) {
                console.log(res);
              }
            })
          }
        }
      })

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("on Ready -- start");
    var that = this;

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
