// pages/history/history.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    items: [],
    itemss: [],
    itemsss: [],
    startX: 0, //开始坐标
    startY: 0
    // isTouchMove: false
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  /** 
   * 点击tab切换 
   */
  switchNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  applay: function() {
    // wx.switchTab({
    //   url: '../apply/newApply/newApply',
    // });
    wx.navigateTo({
      url: '../apply/newApply/newApply',
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    // wx.request({
    //   url: 'http://192.168.10.12:3000/api/event',
    //   method: 'GET',
    //   data: {

    //   },
    //   header: {
    //     'content-type': 'application/json',
    //     'token': wx.getStorageSync("token")
    //   },
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   }
    // })

    for (var i = 0; i < 4; i++) {
      that.data.items.push({
        content: " 访问浙江中烟工业有限责任公司",
        date: " 5月23日 上午9:10",
        isTouchMove: false //默认全隐藏删除
      })
    }
    for (var i = 0; i < 3; i++) {
      that.data.itemss.push({
        content: " 访问浙江中烟工业有限责任公司",
        date: " 5月23日 上午9:10",
        isTouchMove: false //默认全隐藏删除
      })
    }
    for (var i = 0; i < 2; i++) {
      that.data.itemsss.push({
        content: " 访问浙江中烟工业有限责任公司",
        date: " 5月23日 上午9:10",
        isTouchMove: false //默认全隐藏删除
      })
    }
    that.setData({
      items: that.data.items,
      itemss: that.data.itemss,
      itemsss: that.data.itemsss
    });

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },

  deleteRecord: function (e) {
    var that = this;
    // var images = that.data.images;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此吗？',
      success: function (res) {
        if (res.confirm) {
          // images.splice(index, 1);
        } else if (res.cancel) {

          return false;
        }
        that.setData({
          images
        });
      }
    })
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.items.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function(e) {
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
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