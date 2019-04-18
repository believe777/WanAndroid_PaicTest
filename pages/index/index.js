var num = 0
Page({
  data: {
    home_items: [],
  },
  onLoad: function() {
    this.getHomeData(0)
    this.test()
  },
  getHomeData(number) {
    wx.showNavigationBarLoading()
    var thisData = this
    wx.request({
      url: 'http://www.wanandroid.com/article/list/' + number + '/json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data['data']['datas'])
        thisData.setData({
          home_items: thisData.data.home_items.concat(res.data['data']['datas'])
        })
      },
      fail() {
        console.log("home data request failed")
      },
      complete() {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading()
      }
    })
  },

  onPullDownRefresh: function() {
    console.log("上拉刷新")
    num = 0
    this.data.home_items = []
    this.getHomeData(num)
  },
  onReachBottom: function() {
    console.log("下拉加载更多")
    num = num + 1
    this.getHomeData(num)
  },
  jump: function(event) {
    var data = event.currentTarget.dataset
    console.log("currentLink " + data.link)
    wx.navigateTo({
      url: '/pages/web/web?link=' + data.link,
    })
  },
  test() {
    wx.request({
      url: 'http://www.wanandroid.com/article/list/0/json?cid=176',
      success(res) {
        console.log(res.data)
      },
      fail() {}
    })
  }
})