// pages/affirmSubscribe/index.js
const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { postOrder, getSubscribeTimeList, getCanSubscribeList, wxPay, getReservationOrderDetail} from '../../../actions/order.js'
import { getAppointmentTeacherList } from '../../../actions/beautician.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    number: 1,
    money: 0,
    payDisabled:false
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
    let { packageDetail } = this.data;
    this.setData({
      money: packageDetail.price
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

  },

  changeInput(e) {
    if (/^1[34578]\d{9}$/.test(e.detail.value)) {

    } else {
      wx.showToast({
        title: '手机号码不正确',
        icon: "none"
      })
    }
  },
  formSubmit(e) {
    let { shopInfo, number, packageDetail, selectedIndex, appointmentTeacherLsit, subscribeDate } = this.data;
    let { buyerRemark, buyerNickName, buyerPhone } = e.detail.value;
    let openId = wx.getStorageSync("openid")
    if (/^1[34578]\d{9}$/.test(buyerPhone)) {

    } else {
      wx.showToast({
        title: '手机号码不正确',
        icon: "none"
      })
      return;
    }
    if (!buyerNickName) {
      wx.showToast({
        title: '请填写称呼',
        icon: "none"
      })
      return;
    }
    this.setData({
      payDisabled:true
    })
    postOrder({
      shopId: shopInfo.id,
      payType: 1,
      orderType: 0,
      serverId: 0,
      packageId: packageDetail.packageId,
      quantity: number,
      skuId: packageDetail.skuId ? packageDetail.skuId:"",
      subscribeDate: "",
      buyerRemark: buyerRemark,
      orderSource: 1,
      buyerPhone: buyerPhone,
      buyerNickName: buyerNickName,
      openId: openId,
      formId: e.detail.formId
    }, (res) => {
      
      if (res.errorCode == 0) {
          wx.requestPayment({
            'timeStamp': res.result.timeStamp.toString(),
            'nonceStr': res.result.nonceStr,
            'package': res.result.prepayId,
            'signType': res.result.signType,
            'paySign': res.result.paySign,
            'success': (resd) => {
              this.setData({
                payDisabled: false
              })
              wx.redirectTo({
                url: `/pages/payWin/index?orderId=${res.result.orderId}`
              })
            },
            'fail': (resd) => {
              this.setData({
                payDisabled: false
              })
              wx.redirectTo({
                url: `/subMyInfo/pages/orderDetails/index?id=${res.result.orderId}`
              })
            }
          })
      }else{
        this.setData({
          payDisabled: false
        })
      }

    })
  },
  desNum() {
    let { number, packageDetail } = this.data;
    if (number <= 1) {
      wx.showToast({
        title: '预约人数不能少于1人',
        icon: "none"
      })
      return;
    }
    number--
    this.setData({
      number: number,
      money: packageDetail.price * number
    })
  },
  addNum() {
    let { number, packageDetail } = this.data;
    number++
    this.setData({
      number: number,
      money: packageDetail.price * number
    })
  }
}
function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS(),
    packageDetail: state.packageDetail.toJS(),
    userInfo: state.userInfo.toJS()

  }
}
Page(connect(mapStateToProps)(pageConfig))