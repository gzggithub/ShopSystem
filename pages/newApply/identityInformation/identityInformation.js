// pages/apply/identityInformation/identityInformation.js
const app = getApp();
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageInfo: '80',
    gender: ['', '男', '女'],
    date: util.formatDate(Date.now()),
    index: 1,
    realName: '',
    winHeight: '',
    finish_suc: true
  },

  userNameInput: function(e) {
    var that = this;
    that.setData({
      realName: e.detail.value,
      finish_suc: false
    })
    console.log(that.data.realName)
  },

  bindViewEvent: function(e) {
    var that = this;
    that.setData({
      index: e.detail.value,
      finish_suc: false
    })
    console.log(that.data.index)
  },

  bindDateChange: function(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value);
    that.setData({
      date: e.detail.value,
      finish_suc: false
    })
    console.log("date -- " + that.data.date);
    var birthday = Date.now(that.data.date); // 暂时这样 有问题
    console.log("birthday -- " + birthday);
    console.log(+new Date())//转为数字 毫秒
    var date = new Date(that.data.date);
    // 有三种方式获取
    var time1 = date.getTime();
    var time2 = date.valueOf();
    var time3 = Date.parse(date);
    console.log("time1 " + time1);
    console.log("time1 " + time2);
    console.log("time1 " + time3);
  },

  mobileInput: function(e) {
    var that = this;
    that.setData({
      phone_number: e.detail.value,
      finish_suc: false
    })

    console.log(that.data.phone_number)
  },

  formSubmit: function() {
    var that = this;
    var userName = that.data.displayName;
    var mobile = that.data.phone_number;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var name = /^[u4E00-u9FA5]+$/;
    if (userName === '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return false
    } else if (mobile === '' || mobile === undefined) {
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        duration: 1500
      })

      return false
    } else if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    // var birthday = Date.now(that.data.date);// 暂时这样 有问题
    // console.log("birthday --" + birthday);
    // var birthday = new Date(that.data.date);
    // // 有三种方式获取
    // var time1 = birthday.getTime();
    // var time2 = birthday.valueOf();
    // var time3 = Date.parse(birthday);
    // console.log("time1 " + time1);
    // console.log("time1 " + time2);
    // console.log("time1 " + time3);
    console.log(that.data.realName);
    console.log(that.data.index);
    console.log(that.data.phone_number);

    console.log(app.globalData.face_token_1);

    var temp = app.globalData.temp;
    // var ctx = wx.createCanvasContext('myFirstCanvas');
    // ctx.clearRect(0, 0, 100, 100);
    // ctx.draw();

    var host = app.globalData.host;
    console.log("host--" + host);

    console.log("temp2 --" + temp);
    wx.request({
      url: host + '/api/addFace',
      method: 'POST',
      data: {
        "image": temp,
        "image_type": "BASE64",
        "user_info": that.data.realName
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function (response) {
        // console.log(response);
        // console.log(temp);
        if (response.data.result == null) {
          wx.showModal({
            title: '提示',
            content: response.data.error_msg,
          })
          // that.setData({
          //   recognition_suc: true,
          //   restart_recognition_suc_one: true,
          //   restart_recognition_suc_two: false,
          //   apply_restart: false,
          //   apply_restart_suc: false,
          //   apply_show: true
          // })
          // } else if (resData.statusCode === 222210) {
          //   console.log("detect -- suc -- 3")
          //   wx.showModal({
          //     title: '错误提示',
          //     content: resData.data.message + '请重拍！',
          //   })
          //   that.setData({ //超出范围
          //     recognition_suc: true,
          //     restart_recognition_suc_one: true,
          //     apply_restart: false,
          //     apply_restart_suc: false,
          //     apply_show: true
          //   })
        } else {
          wx.request({
            url: host + '/api/uploadFace',
            method: 'POST',
            data: {
              "image": temp,
              "face_token": response.data.result.face_token,
            },
            header: {
              'content-type': 'application/json',
              'token': wx.getStorageSync('token')
            },
            success: function (resp) {
              console.log("resp --")
              console.log(resp);
              if (resp.data.error_code == 0) {
                wx.showToast({
                  title: '人脸保存成功！',
                  icon: 'success',
                  duration: 2000,
                });
                app.globalData.face_token_1 = response.data.result.face_token;

                wx.request({
                  url: host + '/api/users',
                  method: 'PUT',
                  data: {
                    'real_name': that.data.realName,
                    'gender': that.data.index,
                    'phone_number': that.data.phone_number,
                    'created_on': Date.now(),
                    'face_token_1': app.globalData.face_token_1
                  },
                  header: {
                    'content-type': 'application/json',
                    'token': wx.getStorageSync('token')
                  },
                  success: function (respon) {
                    console.log(respon);
                    if (respon.data.error_code == 0) {
                      wx.navigateTo({
                        url: '../applySuccess/applySuccess',
                      })
                      // wx.showToast({
                      //   title: '成功！',
                      //   success: function() {
                      //     wx.navigateTo({
                      //       url: '../applySuccess/applySuccess',
                      //     })
                      //   }
                      // })
                    }

                    if (respon.data.error_code == 1) {
                      wx.showToast({
                        title: respon.data.error_msg,
                      })
                    }

                  },
                  fail: function (res) {
                    console.log(res);
                  }
                })


              }
            },
            fail: function (resp) {
              console.log(resp);
            }
          })
        }

      },
      fail: function (response) {
        console.log(response);
      }
    })

    

    return true;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      winHeight: app.globalData.windowHeight
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