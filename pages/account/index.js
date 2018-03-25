const { connect } = require('../../libs/wechat-weapp-redux.js')
import {
  getUserInfo,
  longinOut
} from '../../actions/account'
const pageConfig = {
  /**
   * 页面的初始数据
   */
  data: {
    userLogin:false
  },
  exit(){
    let openId = wx.getStorageSync("openid")
    this.dispatch(longinOut({
      openId: openId
    }))
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onLoad:function(){
    
  },
  onShow: function () {
    const { code } = this.data.userInfo;
    if (code != 0) {
      this.dispatch(getUserInfo({ filter: true }));
    }
    
  },
  onUserInfo: function () {
    let { code } = this.data.userInfo
    wx.navigateTo({
      url: code == 0 ? '/pages/accountEdit/index' : "/pages/login/index"
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
    userInfo: state.userInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))