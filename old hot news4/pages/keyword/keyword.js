var util = require('../../utils/util.js');
Page({
  data: {
  },
  onLoad: function (option) {
    var that = this
    wx.request({
      url: 'http://60.205.221.177:8080/wxtest',
      method: 'GET',
      data: {
        'class': option.class + '_week'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data,
          classify:option.class
        })
      }
    })
  },
  onShareAppMessage: function (option) {
    var what = this.data.classify
    switch(this.data.classify){
      case 'tech':what = '科技';break
      case 'sport':what = '体育';break
      case 'ent':what = '娱乐';break
      case 'soc': what = '社会';break
      case 'mil': what = '军事';break
      case 'eco': what = '财经';break
      default:what = '';break
    }
    return {
      title: '昨日头条',
      desc: '来看看最近的'+what+'热点变化',
      path: '/page/user?id=123'
    }
  }

})