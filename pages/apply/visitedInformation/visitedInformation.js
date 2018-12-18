// pages/apply/visitedInformation/visitedInformation.js

var dateTimePicker = require('../../../utils/dateTimePicker.js');
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageInfo: '100',
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2100,
    dateTimeNew: '',
  },

  // bindTimeEvent: function(e) {
  //   this.setData({
  //     time: e.detail.value
  //   })
  // },
  formSubmit: function() {

  },

  clickNext: function() {
    wx.navigateTo({
      url: '../applySuccess/applySuccess',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
    });
    console.log(this.data.dateTime);
    console.log(this.data.dateTimeArray);
    console.log(this.data.dateTimeArray1);
    console.log(this.data.dateTime1);
  },

  changeDate(e) {
    this.setData({
      date: e.detail.value
    });
    // console.log(this.data.date);  
  },

  changeTime(e) {
    this.setData({
      time: e.detail.value
    });
    // console.log(this.data.time);
  },

  changeDateTime(e) {
    this.setData({
      dateTime: e.detail.value
    });
    // console.log(dateTime)
  },

  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
    // console.log(this.data.dateTime1)
  },

  changeDateTimeColumn(e) {
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr,
    });
    var dataTimeNewTwo = this.data.dateTimeArray1[0][this.data.dateTime1[0]] + "-" + this.data.dateTimeArray1[1][this.data.dateTime1[1]] + "-" + this.data.dateTimeArray1[2][this.data.dateTime1[2]] + " " + this.data.dateTimeArray1[3][this.data.dateTime1[3]] + ":" + this.data.dateTimeArray1[4][this.data.dateTime1[4]];
    console.log(dataTimeNewTwo)
    this.setData({
      dateTimeNew: new Date(dataTimeNewTwo)
    })
    // console.log(typeof (this.data.dateTimeNew))
    var one = parseInt(this.data.dateTimeNew.getTime().toFixed(0));
    // var two = util.formatTime(this.data.dateTimeNew);
    var three = util.formatDate(one);
    console.log(typeof(one))
    // console.log(parseInt((this.data.dateTimeNew).getTime() / 1000).toFixed(0));
    console.log(one);
    // console.log(two); 
    console.log(three);
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