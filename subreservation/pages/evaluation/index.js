const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getBarberPackageListComment, emptyBarberPackageListComment } from '../../../actions/evaluation.js'
const pageConfig = {
  /**
   * 页面的初始数据
   */
  data: {
    topid: 0,
    serverId: 0,
    pageSize: 10,
    nav: ["全部", "有图", '好评', '低分']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      serverId: options.serverId
    })
    wx.setNavigationBarTitle({
      title: `对${options.name}的评价`,
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
    const { serverId, pageSize, topid, commentData } = this.data;
    if (commentData[topid].code == -1) {
      this.dispatch(getBarberPackageListComment({
        "page.pageSize": pageSize,
        "page.currentPage": 1,
        "serverId": serverId,
        type: topid
      }))
    }
   
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
    this.dispatch(emptyBarberPackageListComment())
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.dispatch(emptyBarberPackageListComment())
    const { serverId, pageSize, topid, commentData } = this.data;
    this.dispatch(getBarberPackageListComment({
      "page.pageSize": pageSize,
      "page.currentPage": 1,
      "serverId": serverId,
      type: topid
    }, (res) => {
      wx.stopPullDownRefresh()
    }))
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { serverId, pageSize, topid, commentData } = this.data;
    if (commentData[topid].load) {
      this.dispatch(getBarberPackageListComment({
        "page.pageSize": pageSize,
        "page.currentPage": parseInt(commentData[topid].data.length / pageSize) + 1,
        "serverId": serverId,
        type: topid
      }))
    }

  },
  //头部栏切换
  onchange: function (e) {
    let id = e.currentTarget.dataset.id
    const { serverId, pageSize, topid, commentData } = this.data;
    if (commentData[id].code == -1) {
      this.dispatch(getBarberPackageListComment({
        "page.pageSize": pageSize,
        "page.currentPage": 1,
        "serverId": serverId,
        type: id
      }))
    }
    this.setData({
      topid: id
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}

function mapStateToProps(state) {
  let { all, hasimage, good, bad } = state.barberPackageComment.toJS();
  let commentData = [all, hasimage, good, bad]
  return {
    shopInfo: state.shopInfo.toJS(),
    commentData: commentData
  }
}
Page(connect(mapStateToProps)(pageConfig))