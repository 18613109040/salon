const { connect } = require('../../libs/wechat-weapp-redux.js')
const app = getApp()
import { getShopImages } from '../../actions/shop.js';
import { getHotRecommendPackage } from '../../actions/home.js'
import { getAppointmentTeacherDetail,getAppointmentTeacher } from '../../actions/beautician.js'

const pageConfig = {
  /**
   * 页面的初始数据
   */
  data: {
    title: [{
      name: "活动专区",
      ailas: "ACTIVITY",
      url: "/pages/activity/index",
      openType: "switchTab"
    }, {
      name: "热门套餐",
      ailas: "PACKAGE",
      url: "/subHotPackage/pages/home/index",
      openType: "navigate"
    }, {
      name: "我的预约",
      ailas: "ORDER",
      url: "/subMyInfo/pages/reservation/index",
      openType: "navigate"
    }, {
      name: "门店信息",
      ailas: "STORE",
      url: "/subShopInfo/pages/shopDetails/index",
      openType: "navigate"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getExtConfig({
      success: (res) => {
        let { shopId } = res.extConfig
        this.dispatch(getShopImages({
          shopId: shopId
        }))
        this.dispatch(getHotRecommendPackage({
          shopId: shopId
        }))
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getExtConfig({
      success: (res) => {
        let { shopId } = res.extConfig
        this.dispatch(getAppointmentTeacher({
          shopId: shopId
        }))
      }
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

  onShareAppMessage(res) {
    let { shopInfo } = this.data;
    if (res.from === 'button') {
      // 来自页面内转发按
    }
    return {
      title: shopInfo.name,
      path: `/pages/home/index`,
      success: function (res) {
        // 转发成功
        console.debug(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  openhuman() {
    wx.navigateTo({
      url: '/subreservation/pages/sample/index',
    })
  },
  openman(e) {
    let { id } = e.currentTarget.dataset;
    this.dispatch(getAppointmentTeacherDetail({
      id: id
    }))
    wx.navigateTo({
      url: '/subreservation/pages/character/index',
    })
  }
}
function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS(),
    hotRecommendPackage: state.hotRecommendPackage.toJS(),
    appointmentTeacher: state.appointmentTeacher.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))