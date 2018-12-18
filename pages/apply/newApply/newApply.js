// pages/apply/newApply/newApply.js
const app = getApp();
var template = require('../../../template/tabbar/tabBar.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageInfo: '33',
    face_image: '',
    apply_start: true,
    apply_next: false
  },
  clickstart: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          face_image: tempFilePaths,
          apply_start: false,
          apply_next: true
        });
        // wx.request({
        //   url: 'http://192.168.10.12:3000/api/addFace',
        //   method: 'POST',
        //   data: {

        //   },
        //   header: {
        //     'content-type': 'application/json',
        //     'token': wx.getStorageSync("token")
        //   },
        //   success: function (res) {
        //     console.log(res)
        //   },
        //   fail: function (res) {
        //     console.log(res);
        //   }
        // })
        
        // wx.request({
        //   url: 'http://192.168.10.12:3000/api/detectFace',
        //   method: 'POST',
        //   data: {
        //     image:'',
        //     image_type: 'BASE64',
        //     face_type: '',
        //     max_face_num: '',
        //     face_field: '',
        //     group_id_list: 'TEST_1',
        //   },
        //   header: {
        //     'content-type': 'application/json',
        //     'token': wx.getStorageSync("token")
        //   },
        //   success: function (res) {
        //     console.log(res)
        //   },
        //   fail: function (res) {
        //     console.log(res);
        //   }
        // })
        
      }
    });
  },

  clickNext: function() {
    var that = this;
    wx.navigateTo({
      url: '../identityInformation/identityInformation',
    });
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
    // wx.showLoading({
    //   title: '加载中',
    // });
    that.setData({
      face_image: '',
      apply_start: true,
      apply_next: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar('tabBar', 1, this)//1表示第2个tabbar
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