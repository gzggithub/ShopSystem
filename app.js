//app.js
App({

  globalData: {
    hasLogin: false,
    userInfo: null,
    token: '',
    windowWeight: '',
    windowHeight: '',
    face_token_1: '',
    temp: '',
    host1: 'http://192.168.10.12:3000',
    host: 'https://qpass.ghent.com.cn'
  },
  onLaunch: function() {
    var that = this;
    // 展示本地存储能力
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.screenWidth)
        console.log(res.screenHeight)
        console.log(res.statusBarHeight)
        that.globalData.windowWeight = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
      }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})