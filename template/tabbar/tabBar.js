//初始化数据
function tabbarinit() {
  return [{
      "current": 0,
      "style": 0, //样式
      "pagePath": "../../pages/index/index",
      "iconPath": "../../image/rch-icon.png",
      "selectedIconPath": "../../image/rc-icon.png",
      "text": "日程"
    },
    {
      "current": 1,
      "style": 1, //样式
      "pagePath": "../../pages/newApply/newApply",
      "iconPath": "../../image/plus_ico.png",
      "selectedIconPath": "../../image/Item.png",
      "text": "申请"
    },
    {
      "current": 2,
      "style": 0, //样式
      "pagePath": "../../pages/mine/mine",
      "iconPath": "../../image/wd-icon.png",
      "selectedIconPath": "../../image/wdl-icon.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath'] //换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({
    bindData
  });
}

module.exports = {
  tabbar: tabbarmain
}