// pages/web/web.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    web_url: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.link)
    this.setData({
      web_url:options.link
    })
  },
})