// subGroup/pages/mygroup/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiems: 0,
    navList: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '待分享'
      },
      {
        id: 2,
        name: '拼团成功'
      },
    ],
    pickcard:[
      {
        id:0,
        time:"2018-03-12",
        status:"3",
        bar:"滋润泡泡浴",
        bartime:"60",
        nums:3,
        money:196
        },
        {
        id: 1,
        time: "2018-03-13",
        status: "5",
        bar: "美肌光滑浴",
        bartime: "120",
        nums: 4,
        money: 298
      },
      {
          id: 2,
          time: "2018-03-14",
          status: "6",
          bar: "迷人香薰浴",
          bartime: "60",
          nums: 16,
          money: 222
        }
    ],
  },
  //邀请好友团购
  invitefriend(){
    wx.navigateTo({
      url: '../beShared/index',
    })
  },
// 头部导航栏切换
  tiemClick(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      tiems: index,
    })
  },
  // 查看拼团成功
  checksuccess(){
    wx.navigateTo({
      url: '../consumed/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})