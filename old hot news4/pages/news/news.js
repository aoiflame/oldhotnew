Page({
  data: {
  },
  onLoad: function (option) {
    var that = this
    wx.request({
      url: 'http://60.205.221.177:8080/wxnewlist',
      method: 'GET',
      data: {
        'id': 'new' + option.id.match(/\d/g).join("")
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data,
          someid: option.id
        },
        )
      }
    })
  }
})