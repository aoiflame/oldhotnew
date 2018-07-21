const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  click: function (e) {
    wx.connectSocket({
      url: 'ws://60.205.221.177:8080'
    })

    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')

      wx.sendSocketMessage({
        data: 'Hello,World:' + Math.round(Math.random() * 0xFFFFFF).toString(),
      })
    })

    wx.onSocketMessage(function (res) {
      console.log(res)
    })

    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭！')
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  call: function (e) {
    wx.showModal({
      title: '联系我们',
      content: '138-2100-2851',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({ phoneNumber: e.currentTarget.dataset.replyPhone })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  clear: function () {
    wx.clearStorage(),
    wx.showToast({
      title: '清除成功',
      icon: 'success',
      duration: 2000
    })
  }
})