Page({
  data: {
    item_data: [{
      "src": "/res/images/mine_message.png",
      "text": "我的消息"
    }, {
      "src": "/res/images/mine_blog.png",
      "text": "我的博客"
    }, {
      "src": "/res/images/mine_q&a.png",
      "text": "我的问答"
    }, {
      "src": "/res/images/mine_plan.png",
      "text": "我的计划"
    }, {
      "src": "/res/images/mine_team.png",
      "text": "我的团队"
    }, {
      "src": "/res/images/mine_service.png",
      "text": "我的客服"
    }],
    user_icon: "/res/images/header_icon.png",
    user_name: "获取用户图片昵称信息",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
    // 查看是否授权
    
  },
  login() {
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.data)
              that.setData({
                user_name:res.userInfo.nickName,
                user_icon: res.userInfo.avatarUrl
              })
            }
          })
        }
      }
    })
  }
})