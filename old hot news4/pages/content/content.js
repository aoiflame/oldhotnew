Page({
  data: {
  },
  onLoad: function (option) {
    var that = this
    that.setData({
      urlweb:option.add
    })
    wx.request({
      url: 'http://60.205.221.177:8080/wxnews',
      method: 'GET',
      data: {
        source: "'" + option.add + "'",
        keyid: option.newid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data),
          that.setData({
            list: res.data
            //res代表success函数的事件对，data是固定的，list是数组
          })
      }
    })
  }

})