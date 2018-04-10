const { connect } = require('../../../libs/wechat-weapp-redux.js')
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
  // 返回首页
  returnHome: function () {
    wx.switchTab({
      url: '/pages/home/index'
    })
  },
  details: function () {
    let { reservationOrderDetail} = this.data;
    wx.redirectTo({
      url: `/subreservation/pages/reservationdetails/index?id=${reservationOrderDetail.orderId}`,
    })
  }
}

function mapStateToProps(state) {

  return {
    reservationOrderDetail: state.reservationOrderDetail.toJS(),
    shopInfo: state.shopInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))