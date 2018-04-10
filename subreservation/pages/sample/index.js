const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getAppointmentTeacherList, getAppointmentTeacherDetail} from '../../../actions/beautician.js'

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
    let { shopInfo } = this.data;
    this.dispatch(getAppointmentTeacherList({
      shopId: shopInfo.id,
      "page.pageSize" : 100 ,
       "page.currentPage":1
    }))
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
  onReady: function () {
    
  },
  openman(e) {
    let { id } = e.currentTarget.dataset;
    // this.dispatch(getAppointmentTeacherDetail({
    //   id: id
    // }))
    wx.navigateTo({
      url: `/subreservation/pages/character/index?id=${id}`,
    })
  }
}

function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS(),
    appointmentTeacherLsit: state.appointmentTeacherLsit.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))