const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getOrderList, emptyOrderList} from '../../../actions/order.js'

const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    navList: ['全部', '待支付', '待消费', '已完成','已取消','退款/售后'],
    selectIndex:0,

    pageSize: 10

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

    let { shopInfo, pageSize, commentData, selectIndex} = this.data;
    if (commentData[selectIndex].code == -1) {
      this.dispatch(getOrderList({
        "page.currentPage" : 1 ,
        "page.pageSize": pageSize,
        "shopId": shopInfo.id ,
        "queryStatus": selectIndex,
        "queryType":0
      }))
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.dispatch(emptyOrderList())
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.dispatch(emptyOrderList())
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    this.dispatch(emptyOrderList())
    let { shopInfo, pageSize, commentData, selectIndex } = this.data;
    this.dispatch(getOrderList({
      "page.currentPage": 1,
      "page.pageSize": pageSize,
      "shopId": shopInfo.id,
      "queryStatus": selectIndex,
      "queryType": 0
    }, (res) => {
      wx.stopPullDownRefresh()
    }))
    

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    let { shopInfo, pageSize, commentData, selectIndex } = this.data;
    if (commentData[selectIndex].load) {
      this.dispatch(getOrderList({
        "page.currentPage": parseInt(commentData[selectIndex].data.length / pageSize) + 1,
        "page.pageSize": pageSize,
        "shopId": shopInfo.id,
        "queryStatus": selectIndex,
        "queryType": 0
      }))
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickNav(e) {
    let { index } = e.currentTarget.dataset;
    let { shopInfo, pageSize, commentData, selectIndex } = this.data;
    this.setData({
      selectIndex: index
    })
    if (commentData[index].code == -1) {
      this.dispatch(getOrderList({
        "page.currentPage":1,
        "page.pageSize": pageSize,
        "shopId": shopInfo.id,
        "queryStatus": index,
        "queryType": 0
      }))
    }
  }
}
function mapStateToProps(state) {
  let { all, paid, consumed, complete, cancel, refundSale} = state.orderList.toJS();
  let commentData = [all, paid, consumed, complete, cancel,refundSale]
  return {
    commentData: commentData,
    shopInfo: state.shopInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))