// pages/apply/newApply/newApply.js
const app = getApp();
const upng = require('../../utils/UPNG.js');
var template = require('../../template/tabbar/tabBar.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageInfo: '50',
    face_image: '../../image/shibie-icon.png',
    imageTempPath: '',
    apply_start: true,
    apply_next: false,
    apply_show: false,
    apply_restart: false,
    apply_restart_suc: false,
    recognition_suc: false,
    recognition_suc_next: false,
    no_recognition_suc: false,
    no_net_recognition_suc: false,
    restart_recognition_suc: false,
    restart_recognition_suc_one: false,
    restart_recognition_suc_two: false,
    apply_clear_restart: false,
    image_size: false,
    image_size_canvas: false,
    image_size_canvas_one: false,
    canvas_hidden: false,
    hiddenmodalput: true,
    canvasWidth: 0,
    canvasHeight: 0,
    canvasOneWidth: 0,
    canvasOneHeight: 0,
    imgHeight: 0,
    token: ''
  },

  cancelM: function(e) {
    this.setData({
      hiddenmodalput: true,
    })
  },

  confirmM: function(e) {
    // console.log("姓名：" + this.data.name + "  电话：" + this.data.phoneNum);
    var that = this;
    that.setData({
      hiddenmodalput: true,
    })
    that.imageDeal();
  },

  clickstart: function() {
    var that = this;
    that.setData({
      hiddenmodalput: false,
    })

  },

  clickrestart: function() {
    var that = this;

    var ctx = wx.createCanvasContext('myFirstCanvas');
    ctx.clearRect(0, 0, 100, 100);
    ctx.draw();

    that.setData({
      recognition_suc: false,
      no_net_recognition_suc: false,
      no_recognition_suc: false,
      // recognition_suc_next: false,
      // restart_recognition_suc_one: true
      // canvas_hidden: false,
    })

    that.imageDeal();

  },

  imageDeal: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B 
        var tempFilePaths = '';

        if (tempFilesSize <= 2097152) { //图片小于或者等于2M时 可以执行获取图片                        
          tempFilePaths = res.tempFilePaths[0]; //获取图片
          console.log('<= -- 20000-' + tempFilePaths)
          that.setData({
            image_size: true,
            image_size_canvas: false,
            face_image: tempFilePaths,
            imgHeight: 100
          })
          that.commonImage(tempFilePaths);

        } else { //图片大于2M，弹出一个提示框，压缩图片 
          that.setData({
            image_size: false,
            image_size_canvas: true,
          })
          wx.showLoading({
            title: 'loading',
          })
          console.log('> -- 20000')


          var path = res.tempFilePaths[0];
          console.log("compress -- 1");
          console.log(path);

          wx.getImageInfo({
            src: path,
            success: function(resIm) {
              console.log(resIm.width)
              console.log(resIm.height)

              var picW = resIm.width;
              var picH = resIm.height;

              var imgRate = 1;
              if (picW / picH > 1.339) {
                imgRate = app.globalData.windowWeight / picW;
              } else {
                imgRate = 280 / picH;
              }
              console.log("Rate -- " + imgRate);
              picW = Math.trunc(resIm.width * imgRate);
              picH = Math.trunc(resIm.height * imgRate);
              that.setData({
                canvasWidth: picW,
                canvasHeight: picH
              }) //设置canvas尺寸

              var context = wx.createCanvasContext('myCanvas');
              console.log("picW--" + picW);
              console.log("picH--" + picH);
              context.drawImage(path, 0, 0, picW, picH);
              console.log("compress -- 3");
              context.draw(false, function() {
                console.log("compress -- 4");
                wx.canvasToTempFilePath({
                  fileType: 'jpg',
                  quality: 0.6,
                  canvasId: 'myCanvas',
                  success: function(resPath) { // 获得图片临时路径
                    console.log("compress --");
                    console.log(resPath.tempFilePath);
                    console.log('> -- 20000 --');
                  }
                })
              });
              // copy
              var picWOne = resIm.width;
              var picHOne = resIm.height;
              var imgRateOne = 1;

              if (picWOne / picHOne > 1.339) {
                imgRateOne = app.globalData.windowWeight * 3 / picWOne;
              } else {
                imgRateOne = 280 * 3 / picHOne;
              }
              console.log("RateOne -- " + imgRateOne);
              picWOne = Math.trunc(resIm.width * imgRateOne);
              picHOne = Math.trunc(resIm.height * imgRateOne);
              that.setData({
                canvasOneWidth: picWOne,
                canvasOneHeight: picHOne
              }) //设置canvasCopy尺寸

              var contextOne = wx.createCanvasContext('myCanvasCopy');
              console.log("picWOne--" + picWOne);
              console.log("picHOne--" + picHOne);
              contextOne.drawImage(path, 0, 0, picWOne, picHOne);
              console.log("compress2-- 3");
              contextOne.draw(false, function() {
                console.log("compress2 -- 4");
                wx.canvasToTempFilePath({
                  fileType: 'jpg',
                  quality: 0.6,
                  canvasId: 'myCanvasCopy',
                  success: function(resPath) { // 获得图片临时路径
                    console.log("compress2 --");
                    tempFilePaths = resPath.tempFilePath;
                    console.log(tempFilePaths);
                    console.log('>2 -- 20000 --');
                    that.commonImage(tempFilePaths);

                  }
                })
              });
            }
          })

        }
        console.log('> -- 20000 -- 11');
        that.setData({
          apply_start: false,
          apply_next: true,
        });
      }
    });
  },

  commonImage: function(tempFilePaths) {
    var that = this;
    console.log("tempFilePaths--" + tempFilePaths);
    wx.getImageInfo({
      src: tempFilePaths,
      success(img) {
        wx.getFileSystemManager().readFile({ //只能转本地图片为base64
          filePath: tempFilePaths, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: function(res) { //成功的回调
            // console.log('data:image/png;base64,' + res.data);
            console.log("temp -- ");
            // console.log(res.data);
            console.log("temp -- 1");
            var temp = res.data;
            console.log(that.data.token)
            wx.getNetworkType({
              success: function(net) {
                console.log(net.networkType);
                if (net.networkType == 'none') {
                  wx.showToast({
                    title: '网络未连接',
                    duration: 2000
                  })
                  // } else if (net.networkType == '4g' || net.networkType == '3g' || net.networkType == '2g') {
                  //   wx.showToast({
                  //     title: '未连接WiFi',
                  //     duration: 2000
                  //   })
                } else {
                  wx.showLoading({
                    title: '检测中...',
                  })
                  console.log("detect --")
                  console.log(wx.getStorageSync('token'));
                  var host = app.globalData.host;
                  console.log("host--" + host);
                  wx.request({
                    url: host + '/api/detectFace',
                    method: 'POST',
                    data: {
                      'image': temp,
                      'image_type': 'BASE64',
                      'face_type': '',
                      'max_face_num': '',
                      'face_field': '',
                      'group_id_list': 'TEST_2',
                    },
                    header: {
                      'content-type': 'application/json',
                      'token': wx.getStorageSync('token')
                    },
                    success: function(resData) {
                      console.log("detect -- suc" + resData);
                      console.log(resData);
                      console.log("detect -- suc")

                      if (resData.data.result != null) {
                        console.log("detect -- suc -- 1")
                        wx.hideLoading();

                        var ctx = wx.createCanvasContext('myFirstCanvas');

                        var platform = wx.getSystemInfoSync().platform

                        var angle = resData.data.result.face_list[0].angle;
                        var location = resData.data.result.face_list[0].location;

                        ctx.setFillStyle('rgba(255,255,255,1)');
                        ctx.setStrokeStyle("#207ce9");
                        ctx.setLineWidth(2);
                        var imgOffsetWidth = 0;
                        var imgOffsetHeight = 0;
                        var imgRate = 1;
                        // console.log(img.width);
                        // console.log(img.height);
                        if (img.width / img.height > 1.339) {
                          imgRate = app.globalData.windowWeight / img.width;
                          imgOffsetHeight = (280 - img.height * imgRate) / 2;
                        } else {
                          imgRate = 280 / img.height;
                          imgOffsetWidth = (360 - img.width * imgRate) / 2;
                        }
                        console.log("Rate -- " + imgRate);
                        console.log("offset--" + imgOffsetWidth + "::" + imgOffsetHeight);
                        console.log(location);
                        // ctx.fillRect(location.left * imgRate + imgOffsetWidth, location.top * imgRate + imgOffsetHeight, location.width * imgRate, location.height * imgRate);
                        // ctx.clearRect(location.left * imgRate + imgOffsetWidth + 1, location.top * imgRate + imgOffsetHeight + 1, (location.width * imgRate) - 2, (location.height * imgRate - 2));
                        // ctx.fill(); //填充
                        // ctx.stroke(); //绘制边框
                        // ctx.draw();
                        ctx.drawImage(tempFilePaths, (location.left), (location.top), (location.width), (location.height), 0, 0, 100, 100);
                        ctx.draw(false, () => {
                          wx.canvasGetImageData({ // 2. 获取图像数据， API 1.9.0
                            canvasId: 'myFirstCanvas',
                            x: 0,
                            y: 0,
                            width: 100,
                            height: 100,
                            success(resTemp) {
                              console.log(resTemp)
                              console.log("resTemp")
                              if (platform === 'ios') {
                                // 兼容处理：ios获取的图片上下颠倒
                                resTemp = that.reverseImgData(resTemp);
                              }
                              var pngData = upng.encode([resTemp.data.buffer], resTemp.width, resTemp.height); // 3. png编码
                              var base64 = wx.arrayBufferToBase64(pngData); // 4. base64编码
                              app.globalData.temp = base64;
                              console.log("temp1 -- ");
                              console.log(app.globalData.temp);
                              console.log("temp1 -- 1");
                              // console.log('data:image/jpeg;base64,' + base64)
                              // that.setData({ // 标签是image时这样用
                              //   b64: 'data:image/jpeg;base64,' + base64
                              // });
                            },
                            fail: function (resTemp){
                              console.log(resTemp)
                            }
                          })
                        })

                        that.setData({
                          recognition_suc_next: true,
                          recognition_suc: true,
                          no_recognition_suc: false,
                          apply_restart: false,
                          apply_restart_suc: true,
                          canvas_hidden: true,
                          apply_show: true
                        })

                      } else if (resData.data.error_code === 222202) {
                        console.log("detect -- suc -- 2")
                        that.setData({ //未识别到人脸
                          no_recognition_suc: true,
                          recognition_suc: true,
                          restart_recognition_suc_one: true,
                          restart_recognition_suc_two: true,
                          recognition_suc_next: true,
                          apply_clear_restart: true,
                        })

                      } else if (resData.statusCode === 502) {
                        console.log("detect -- suc -- 4")
                        wx.showModal({
                          title: '错误提示',
                          content: resData.data.message + '请重拍！',
                        })
                        that.setData({
                          // no_recognition_suc: true,
                          recognition_suc: false,
                          restart_recognition_suc_one: true,
                          restart_recognition_suc_two: true,
                          apply_clear_restart: true,
                          no_net_recognition_suc: true
                        })
                      } else if (resData.data.error_code === 14) {
                        wx.showModal({
                          title: '错误提示',
                          content: resData.data.error_msg,
                        })
                      }
                    },
                    fail: function(res) {
                      console.log(res);
                      console.log("detect -- fail -- 1")
                      wx.showToast({
                        title: res.errMsg,
                        icon: 'none',
                        duration: 2000,
                        success: function() {
                          that.setData({
                            // recognition_suc: true,
                            restart_recognition_suc_one: true,
                            restart_recognition_suc_two: true,
                            apply_clear_restart: true,
                            no_net_recognition_suc: true
                          })
                        }
                      })

                    },
                    complete: function(res) {
                      console.log("detect -- complete")
                      wx.hideLoading()
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  
  //ios图片处理 
  reverseImgData(res) {
    var w = res.width
    var h = res.height
    let con = 0
    for (var i = 0; i < h / 2; i++) {
      for (var j = 0; j < w * 4; j++) {
        con = res.data[i * w * 4 + j]
        res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
        res.data[(h - i - 1) * w * 4 + j] = con
      }
    }
    return res
  },

  clickNext: function() {
    var that = this;

    that.setData({
      recognition_suc: true,
      recognition_suc_next: true,
      no_recognition_suc: false,
      restart_recognition_suc_one: false,
      restart_recognition_suc_two: false,
      apply_restart: false,
      apply_restart_suc: false,
      apply_show: false
    })

    wx.navigateTo({ // 点击下一步，保存、更新成功后跳转
      url: '../newApply/identityInformation/identityInformation',
      success: function () {
        that.setData({
          apply_start: false,
          apply_next: true,
          apply_show: false,
          apply_restart: false,
          apply_restart_suc: true,
          recognition_suc: true,
        })
      }
    });

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar('tabBar', 1, this) //1表示第2个tabbar
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    that.setData({
      token: wx.getStorageSync('token')
    })
    // console.log(that.data.token)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    that.setData({
      token: wx.getStorageSync('token')
    })
    // console.log(that.data.token)
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

  },

  getImageInfoOneI: function() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片


        var tempFilePaths = res.tempFilePaths
        that.setData({
          face_image: tempFilePaths,
          apply_start: false,
          apply_next: true,
          imgHeight: 100
        });

        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success(img) {
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePaths[0], //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: function(res) { //成功的回调
                // console.log('data:image/png;base64,' + res.data);
                // console.log(res.data)
                var temp = res.data;
                console.log(that.data.token)
                wx.getNetworkType({
                  success: function(net) {
                    console.log(net.networkType);
                    if (net.networkType == 'none') {
                      wx.showToast({
                        title: '网络未连接',
                        duration: 2000
                      })
                      // } else if (net.networkType == '4g' || net.networkType == '3g' || net.networkType == '2g') {
                      //   wx.showToast({
                      //     title: '未连接WiFi',
                      //     duration: 2000
                      //   })
                    } else {
                      wx.showLoading({
                        title: '检测中...',
                      })
                      wx.request({
                        url: 'http://192.168.10.12:3000/api/detectFace',
                        method: 'POST',
                        data: {
                          'image': temp,
                          'image_type': 'BASE64',
                          'face_type': '',
                          'max_face_num': '',
                          'face_field': '',
                          'group_id_list': 'TEST_2',
                        },
                        header: {
                          'content-type': 'application/json',
                          'token': wx.getStorageSync('token')
                          // 'token': that.data.token
                        },
                        success: function(resData) {
                          console.log(resData);


                          if (resData.data.result != null) {
                            wx.hideLoading();
                            console.log(resData.data.result.face_list[0].location);

                            var ctx = wx.createCanvasContext('firstCanvas');
                            var angle = resData.data.result.face_list[0].angle;
                            var location = resData.data.result.face_list[0].location;

                            ctx.setFillStyle('rgba(255,255,255,1)');
                            ctx.setStrokeStyle("#207ce9");
                            ctx.setLineWidth(2);
                            var imgOffsetWidth = 0;
                            var imgOffsetHeight = 0;
                            var imgRate = 1;
                            if (img.width / img.height > 1.339) {
                              imgRate = 360 / img.width;
                              imgOffsetHeight = (280 - img.height * imgRate) / 2;
                            } else {
                              imgRate = 280 / img.height;
                              imgOffsetWidth = (360 - img.width * imgRate) / 2;
                            }
                            console.log("Rate -- " + imgRate);
                            console.log("offset--" + imgOffsetWidth + "::" + imgOffsetHeight);
                            ctx.fillRect(location.left * imgRate + imgOffsetWidth, location.top * imgRate + imgOffsetHeight, location.width * imgRate, location.height * imgRate);
                            ctx.clearRect(location.left * imgRate + imgOffsetWidth + 1, location.top * imgRate + imgOffsetHeight + 1, (location.width * imgRate) - 2, (location.height * imgRate - 2));
                            ctx.fill(); //填充
                            ctx.stroke(); //绘制边框
                            ctx.draw();

                            that.setData({
                              recognition_suc: false,
                              apply_restart: false,
                              apply_restart_suc: true,
                              apply_show: true
                            })



                          } else if (resData.data.error_code == 222202) {
                            that.setData({ //未识别到人脸
                              recognition_suc: false,
                              no_recognition_suc: true,
                              restart_recognition_suc_one: true,
                              restart_recognition_suc_two: true,
                              apply_clear_restart: true,
                            })
                          } else if (resData.statusCode == 502) {
                            wx.showModal({
                              title: '错误提示',
                              content: resData.data.message + '请重拍！',
                            })
                            that.setData({
                              // no_recognition_suc: true,
                              restart_recognition_suc_one: true,
                              restart_recognition_suc_two: true,
                              apply_clear_restart: true,
                              no_net_recognition_suc: true
                            })
                          }
                        },
                        fail: function(res) {
                          console.log(res);
                          wx.showToast({
                            title: res.errMsg,
                            icon: 'none',
                            duration: 2000,
                            success: function() {
                              that.setData({
                                // recognition_suc: true,
                                restart_recognition_suc_one: true,
                                restart_recognition_suc_two: true,
                                apply_clear_restart: true,
                                no_net_recognition_suc: true
                              })
                            }
                          })
                        },
                        complete: function(res) {
                          wx.hideLoading()
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
    });
  }

})