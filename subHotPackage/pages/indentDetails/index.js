// pages/affirmSubscribe/index.js
import {
  groupOrderDetail
} from '../../../actions/group'
const { connect } = require('../../../libs/wechat-weapp-redux.js')
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    detail : {}
  },
  // 微信支付
  weixinzhifu: function () {
    wx.navigateTo({
      url: '/pages/payWin/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ...options
    })
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
    groupOrderDetail(this.data.orderId,res=>{
      this.setData({
        detail:res
      })
    })

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
}
function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))