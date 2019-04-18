var num = 0
Page({
  data: {
    search_result: [],
    key: ""
  },

  onLoad: function(options) {
    var searchKey = options.key
    this.key = searchKey
    wx.setNavigationBarTitle({
      title: searchKey,
    })
    this.querySearchKey(searchKey, 0)
  },
  querySearchKey(searchKey, number) {
    wx.showNavigationBarLoading()
    var that = this
    wx.request({
      url: 'http://www.wanandroid.com/article/query/' + number + '/json',
      method: 'POST',
      data: {
        k: searchKey
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res.data)
        that.setData({
          search_result: that.data.search_result.concat(res.data['data']['datas']),
          key: searchKey
        })
      },
      fail() {
        console.log('searchKey request failed')
      },
      complete() {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  jump: function(event) {
    var data = event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/web/web?link=' + data.link,
    })
  },
  onPullDownRefresh: function() {
    num = 0
    this.data.search_result = []
    this.querySearchKey(this.data.key, num)
  },
  onReachBottom: function() {
    num = num + 1
    this.querySearchKey(this.data.key, num)
  }
})