// pages/mine/mine.js
const app = getApp();
var template = require('../../template/tabbar/tabBar.js');

Page({

  /**
   * Page initial data
   */
  data: {
    hasLogin: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

    template.tabbar('tabBar', 2, this) //2表示第3个tabbar
    var that = this;
    // if (app.globalData.userInfo) {
    //   that.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true,
    //     hasLogin: true
    //   })
    // }
    // wx.getStorage({
    //   key: 'openId',
    //   success: function(res) {
    //     that.setData({
    //       userInfo: {
    //         openId: res.data
    //       }
    //     })
    //   },
    // })

    console.log(app.globalData.userInfo)
  },

  clickLogin: function() {
    var that = this;
    // if (app.globalData.userInfo) {
    //   that.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true,
    //     hasLogin: true
    //   })
    // }

    wx.request({
      url: 'http://192.168.10.12:3000/api/auth/signup',
      method: 'POST',
      data: {
        "openId": wx.getStorageSync("openId"),
        "displayName": "a",
        "real_name": "b",
        "pinyin": "xiao",
        "gender": 1,
        "email": "a1@2.b",
        "phone_number": "1888333333",
        "title": "t",
        "created_on": 1
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token"),
      },
      success: function(res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            userInfo: res.data,
            hasLogin: true
          })
        }
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },

  getInfo: function() {
    var that = this;
    wx.navigateTo({
      url: './detail/detail',
    })
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

    //   },
    //   fail: function(res) {
    //     console.log(res);
    //   }
    // })
  },

  getHistory: function() {
    wx.navigateTo({
      url: '../history/history',
    })
    //   wx.request({
    //     url: 'http://192.168.10.12:3000/api/event',
    //     method: 'GET',
    //     data: {

    //     },
    //     header: {
    //       'content-type': 'application/json',
    //       'token': wx.getStorageSync("token")
    //     },
    //     success: function (res) {
    //       console.log(res);
    // wx.navigateTo({
    //   url: '../history/history',
    // })
    //     },
    //     fail: function (res) {
    //       console.log(res);
    //     }
    //   })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})