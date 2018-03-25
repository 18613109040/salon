import { getProblemById } from '../../actions/account.js'
let query = {}
var app = getApp();
Page({
  data: {
    detail: [],
    anno:{},
    color: app.globalData.color,
    greycolor: app.globalData.greycolor,
  },
  onLoad: function (options) {
    query = options;
    this.setData({
      color: app.globalData.color,
      greycolor: app.globalData.greycolor,
    })
    wx.setNavigationBarTitle({
      title: options.title||'公告'
    })

  },
  onShow: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: app.globalData.color
    })
    getProblemById({
      
        id: query.id
    },
     (res) => {
        this.setData({
          anno: res.result,
          detail: res.result.content ? JSON.parse(res.result.content) : []
        })
      }
    )
  }
})