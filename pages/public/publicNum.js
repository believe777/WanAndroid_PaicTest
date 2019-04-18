Page({
  data: {
    public_num: [],
    random: []
  },
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://wanandroid.com/wxarticle/chapters/json',
      success(res) {
        console.log(res.data['data'])
        var ran = []
        for (var i = 0; i < res.data['data'].length; i++) {
          var num = Math.round(Math.random() * 5) * 8 + 40
          that.data.random = that.data.random.concat([num])
        }
        console.log(that.data.random)
        that.setData({
          public_num: res.data['data'],
          random: that.data.random
        })
      },
      fail() {
        console.log('public_num request failed')
      }
    })
  },
  getRandomHeight() {
    var ran = Math.floor(Math.random * 5)
    console.log(ran)
    this.setData({
      random: ran * 8 + 40
    })
  }
})