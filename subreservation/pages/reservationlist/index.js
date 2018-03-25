// subreservation/pages/reservationlist/index.js
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
        name: '待支付'
      },
      {
        id: 2,
        name: '待消费'
      },
      {
        id: 3,
        name: '已完成'
      },
      {
        id: 4,
        name: '已消费'
      },
    ],
  },

  // 分页菜单函数
  tiemClick(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index)
    this.setData({
      tiems: index,
    })
  },

  // 微信支付
  weixinzhifu:function(){
    wx.navigateTo({
      url: '/pages/payWin/index',
    })
  },
  // 预约详情
  look:function(){
    wx.navigateTo({
      url: '/subreservation/pages/reservationdetails/index',
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