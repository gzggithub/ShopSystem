// pages/home/home.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    winHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      winHeight: app.globalData.windowHeight
    })

    console.log(app.globalData.userInfo)

    console.log(wx.getStorageSync("openId"))
    if (wx.getStorageSync("openId")) {
      console.log(wx.getStorageSync("openId"))
      console.log("openID -- 1")
      return;
    } else {
      console.log("openID -- 2")
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx5dd469c7c6d51aa6&secret=f5da142b301c9a03854b5688bc93e526&js_code=' + res.code + '&grant_type=authorization_code',
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
                console.log("singup -- 1")
                
              },
              fail: function (res) {
                console.log(res);
                console.log("openId -- fail")
              }
            })
          }
        }
      })

    }

  },

  getUserInfo: function(e) {
    var that = this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    wx.login({
      success: function(res) {
        console.log("1111111111111111111");
        if (res.code) {
          //发起网络请求
          console.log("sign in --");
          var host = app.globalData.host;
          console.log(host);
          wx.request({
            url: host + '/api/auth/signin',
            method: 'POST',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              console.log(res);
              if (res.data.error_code === 0) {
                wx.setStorageSync('token', res.data.token);
                console.log("token --");
                console.log(wx.getStorageSync('token'));
                console.log("token -- 1");
                console.log("sing in -- suc");
              }
              if (res.data.error_code === -1) {
                console.log(res.data.error_msg)
                console.log("-1 -- singup -- userInfo")
                console.log(app.globalData.userInfo);
                console.log("-1 -- singup -- that -- data-- userInfo")
                console.log(that.data.userInfo);

                console.log("-1 -- singup --")
                wx.setStorageSync('token', res.data.token);
                console.log(res.data.token)

                wx.request({
                  url: host + '/api/auth/signup',
                  method: 'POST',
                  data: {
                    "openId": wx.getStorageSync('openId'),
                    "displayName": app.globalData.userInfo.nickName,
                    "real_name": "b",
                    "pinyin": "xiao",
                    "gender": app.globalData.userInfo.gender,
                    "phone_number": "1888333333",
                    "title": "t",
                  },
                  header: {
                    'content-type': 'application/json',
                    'token': wx.getStorageSync('token'),
                  },
                  success: function(res) {
                    console.log(res);
                    console.log("-1 -- singup -- suc");
                    if (res.statusCode == 200) {
                      console.log("-1 -- singup -- suc -- 200");
                      that.setData({
                        userInfo: res.data,
                        hasLogin: true
                      })
                    }
                  },
                  fail: function(res) {
                    console.log(res);
                    console.log("singup -- fail")
                    // wx.showToast({
                    //   title: res.errMsg
                    // })
                  },
                  complete: function(res) {
                    console.log("singup -- complete")
                  }
                });

              }

            },
            fail: function(res) {
              console.log(res);
              console.log("singin -- fail")
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    wx.navigateTo({
      url: '../newApply/newApply',
    })
   
  },

  clickLogin: function() {
    var that = this;
    // console.log(app.globalData.userInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("on Ready -- start");
    var that = this;

    if (app.globalData.userInfo) {
      console.log("user Info -- call back func 1");
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })


    } else if (that.data.canIUse) {
      console.log("user Info -- call back func 2");
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(app.globalData.userInfo)
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log("user Info -- call back func 3");
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(app.globalData.userInfo)
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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