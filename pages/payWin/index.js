import { groupPackageOrderDetail, getReservationOrderDetail} from '../../actions/order.js'
const { connect } = require('../../libs/wechat-weapp-redux.js')
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    type:0
  },
  // 返回首页
  returnHome: function () {
    wx.switchTab({
      url: '/pages/home/index'
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
  details:function(){
    let { orderId, type} = this.data
   
    if(type==2){
      wx.redirectTo({
        url: `/subreservation/pages/reservationdetails/index?id=${orderId}`,
      })
    }else{
      wx.redirectTo({
        url: `/subMyInfo/pages/orderDetails/index?id=${orderId}`,
      })
    }
    
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
}

function mapStateToProps(state) {

  return {
    
  }
}
Page(connect(mapStateToProps)(pageConfig))