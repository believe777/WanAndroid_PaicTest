var num = 0
Page({
  data: {
    system_first_classify: [],
    system_second_classify: [],
    first_classify_selected: 0,
    second_classify_selected: 0,
    system_arit: [],
  },
  onLoad: function(options) {
    this.getSystem_classify()
  },
  getSystem_classify() {
    var that = this
    wx.request({
      url: 'http://www.wanandroid.com/tree/json',
      success(res) {
        console.log(res.data['data'])
        console.log(res.data['data'][0]['children'][0]['id'])
        that.getSystemArit(0, res.data['data'][0]['children'][0]['id'])
        that.setData({
          system_first_classify: res.data['data'],
          system_second_classify: res.data['data'][0]['children']
        })
      },
      fail() {

      }
    })
  },
  getSystemArit(number, id) {
    var that = this
    wx.showNavigationBarLoading()
    wx.request({
      url: 'http://www.wanandroid.com/article/list/' + number + '/json?cid=' + id,
      success(res) {
        console.log(res.data['data']['datas'])
        that.setData({
          system_arit: that.data.system_arit.concat(res.data['data']['datas'])
        })
      },
      fail() {
        console.log('SystemArit request failed')
      },
      complete() {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  selectFirstClassify(event) {
    console.log(this.data.system_first_classify[event.currentTarget.dataset.index]['children'])
    var index = event.currentTarget.dataset.index
    if (index == this.data.first_classify_selected) {
      console.log('selected a same item')
      return
    }
    this.data.system_arit = []
    this.getSystemArit(0, this.data.system_first_classify[index]['children'][0]['id'])
    this.setData({
      system_second_classify: this.data.system_first_classify[index]['children'],
      first_classify_selected: index,
      second_classify_selected: 0
    })
  },
  selectSecondClassify(event) {
    var index = event.currentTarget.dataset.index
    if (index == this.data.second_classify_selected) {
      console.log('selected a same item')
      return
    }
    console.log(this.data.system_second_classify[index]['id'])
    this.data.system_arit = []
    this.getSystemArit(0, this.data.system_second_classify[index]['id'])
    this.setData({
      second_classify_selected: index
    })
  },
  onPullDownRefresh: function() {
    console.log('下拉刷新')
    num = 0
    this.data.system_arit = []
    this.getSystemArit(num, this.data.system_first_classify[this.data.first_classify_selected]['children'][this.data.second_classify_selected]['id'])
  },
  onReachBottom: function() {
    console.log('上拉加载更多')
    num = num + 1
    this.getSystemArit(num, this.data.system_first_classify[this.data.first_classify_selected]['children'][this.data.second_classify_selected]['id'])
  },
  jump: function(event) {
    var data = event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/web/web?link=' + data.link,
    })
  }
})