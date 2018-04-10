const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getListGroupMemberOrder, emptyGroupMemberOrder} from '../../../actions/order.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex:0,
    navList: ['全部','待付款', '待分享', '拼团成功'],
    pageSize:10
  },
  //邀请好友团购
  invitefriend(e){
    let { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/subGroup/pages/beShared/index?id=${id}`,
    })
  },
// 头部导航栏切换
  tiemClick(e) {
    let index = e.currentTarget.dataset.index;
    let { shopInfo, pageSize, commentData, selectIndex } = this.data;
    this.setData({
      selectIndex: index
    })
    if (commentData[index].code == -1) {
      this.dispatch(getListGroupMemberOrder({
        "page.currentPage": 1,
        "page.pageSize": pageSize,
        "shopId": shopInfo.id,
        "status": index == 0 ? "" : index
      }))
    }
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
    let { shopInfo, pageSize, commentData, selectIndex } = this.data;
    if (commentData[selectIndex].code == -1) {
      this.dispatch(getListGroupMemberOrder({
        shopId: shopInfo.id,
        "page.currentPage": 1,
        status: selectIndex == 0 ? "" : selectIndex,
        "page.pageSize": pageSize,
      }))
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.dispatch(emptyGroupMemberOrder())
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.dispatch(emptyGroupMemberOrder())
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.dispatch(emptyGroupMemberOrder())
    let { shopInfo, pageSize, commentData, selectIndex } = this.data;
    this.dispatch(getListGroupMemberOrder({
      "page.currentPage": 1,
      "page.pageSize": pageSize,
      "shopId": shopInfo.id,
      "status": selectIndex == 0 ? "" : selectIndex
    }, (res) => {
      wx.stopPullDownRefresh()
    }))
  },

  onReachBottom: function () {

    let { shopInfo, pageSize, commentData, selectIndex } = this.data;
    if (commentData[selectIndex].load) {
      this.dispatch(getListGroupMemberOrder({
        "page.currentPage": parseInt(commentData[selectIndex].data.length / pageSize) + 1,
        "page.pageSize": pageSize,
        "shopId": shopInfo.id,
        "status": selectIndex == 0 ? "" : selectIndex
      }))
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
}
function mapStateToProps(state) {
  let { all, pay, share, teamwork} = state.groupListMemberOrder.toJS();
  let commentData = [all, pay, share, teamwork]
  return {
    shopInfo: state.shopInfo.toJS(),
    userInfo: state.userInfo.toJS(),
    commentData: commentData
  }
}
Page(connect(mapStateToProps)(pageConfig))