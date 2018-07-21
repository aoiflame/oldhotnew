Page({
  data: {

    

  },
  changestatus: function (e) {
    var that = this;
    this.setData({
      status: '1'
    })
  },
  changestatusback: function (e) {
    var that = this;
    this.setData({
      status: null
    })
  },

})