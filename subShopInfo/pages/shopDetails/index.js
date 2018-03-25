const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getShopImages } from '../../../actions/shop.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
  
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
  
  },
  /***
   * 联系商家
   */
  call(){
    const {shopInfo} = this.data;
    wx.makePhoneCall({
      phoneNumber: shopInfo.shopPhone
    })
  },
  /**
   * 导航到店
   */
  goToShopByMap() {
    let { shopInfo } = this.data
    wx.openLocation({//查看位置
      latitude: shopInfo.latitude,
      longitude: shopInfo.longitude,
      scale: 28,
      name: shopInfo.name,
      address: shopInfo.shopAddress
    })
  },
  /**
   * 店铺二维码
   */
  qrCode(){
    wx.navigateTo({
      url: '/subShopInfo/pages/qrCode/index',
    })
  }
}
function mapStateToProps(state) {
  let { shopFace} = state.shopInfo.toJS();
  shopFace = (shopFace && shopFace.split(',')) || []
  return {
    shopFace: shopFace,
    shopInfo: state.shopInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))