Page({
  data: {
    hotkey: [],
    hot_friend: [],
    home_banner: [],
    hot_text_color: ["#0000FF", "#008B00", "#FFC125", "#FF6A6A", "#FF1493", "#8A2BE2", "#32CD32"]
  },

  onLoad: function(options) {
    this.getHotKey()
    this.getHotFriend()
    this.getHomeBanner()
  },
  getHotKey() {
    var that = this;
    wx.request({
      url: 'http://www.wanandroid.com//hotkey/json',
      success(res) {
        console.log(res.data['data'])
        that.setData({
          hotkey: res.data['data']
        })
      },
      fail() {
        console.log('hotkey request failed')
      }
    })
  },
  getHotFriend() {
    var that = this
    wx.request({
      url: 'http://www.wanandroid.com/friend/json',
      success(res) {
        console.log(res.data['data'])
        that.setData({
          hot_friend: res.data['data']
        })
      },
      fail() {

      }
    })
  },
  getHomeBanner() {
    var thisData = this
    wx.request({
      url: 'http://www.wanandroid.com/banner/json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data['data'])
        thisData.setData({
          home_banner: res.data['data']
        })
      },
      fail() {
        console.log("home data request failed")
      },
      complete() { }
    })
  },
  hotSearch:function(event) {
    var data = event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/detail/search_detail?key='+data.name,
    })
  }
})