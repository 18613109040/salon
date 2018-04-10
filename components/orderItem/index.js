import {
  getReservationOrderDetail, wxPay
} from '../../actions/order.js'
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail:{
      type:Object,
      value:{}
    },
    /**
     * 判断订单类型 1订单 2预约
     */
    type:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoDetail(){
      
      // app.store.dispatch(getReservationOrderDetail({
      //   orderId: this.data.detail.orderId
      // }))
      let { orderId } = this.data.detail;
      wx.navigateTo({
        url: this.data.type == 1 ? `/subMyInfo/pages/orderDetails/index?id=${orderId}` : `/subreservation/pages/reservationdetails/index?id=${orderId}`,
      })
    },
    /**
   * 立刻评价
   */
    evaluation() {
      let { detail } = this.data;
      wx.navigateTo({
        url: `/subreservation/pages/commentserve/index?id=${detail.orderId}`
      })
    },
    /**
 * 立刻支付
 */
  payImmediately() {
      let { detail } = this.data;
      let { shopInfo}  = app.store.getState();
      let openId = wx.getStorageSync("openid")
      wxPay({
        orderId: detail.orderId,
        openId: openId,
        shopId: shopInfo.toJS().id
      }, (resd) => {
        wx.requestPayment({
          'timeStamp': resd.result.timeStamp.toString(),
          'nonceStr': resd.result.nonceStr,
          'package': resd.result.prepayId,
          'signType': resd.result.signType,
          'paySign': resd.result.paySign,
          'success': (resd) => {
            wx.redirectTo({
              url: `/pages/payWin/index?orderId=${detail.orderId}`
            })
          },
          'fail': (resd) => {
            // wx.redirectTo({
            //   url: `/pages/orderDetail/index?orderId=${res.result[0]}`
            // })
          }
        })
      })
    },
  }
})
