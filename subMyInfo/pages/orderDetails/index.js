// pages/affirmSubscribe/index.js

const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { countDown, confirm} from '../../../utils/util.js'
var QR = require("../../../libs/qrcode.js");
import { wxPay, getReservationOrderDetail, cancelSubscribe, cancelOrder} from '../../../actions/order.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    time: "00:00",
    windowWidth: 0
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
    let { reservationOrderDetail } = this.data;
    if (reservationOrderDetail.pickCode) {
      reservationOrderDetail.pickCode.map((item, index) => {
        let useStatusText=['','已使用','退款中','已退款','退款失败']
        this.createQrCode(item.pickCode, "mycanvas" + index, 150, 150, useStatusText[item.useStatus]);
      })
    }
    let time = reservationOrderDetail.leftPayTimeMills;
    if (time) {
      this.timeInter = setInterval(() => {
        if (time > 0) {
          this.setData({
            time: countDown(time)
          })
        } else {
          clearInterval(this.timeInter)
        }
        time = time - 1000;
      }, 1000)
    }
  },
  createQrCode(url, canvasId, cavW, cavH,str) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH,str);


  },
  /**
  * 取消订单
  */
  clickCancelOrder() {
    let { reservationOrderDetail } = this.data;
    confirm({
    
      content: "确定取消订单",
      ok: () => {
        cancelOrder({
          orderId: reservationOrderDetail.orderId
        }, (res) => {
          if (res.errorCode == 0) {
            wx.showToast({
              title: '取消成功',
              icon: "none"
            })
            clearInterval(this.timeInter)
            this.dispatch(getReservationOrderDetail({
              orderId: reservationOrderDetail.orderId
            }))
          }
        })
      }
    })
    
  },
  /**
  * 立刻支付
  */
  payImmediately() {
    let { reservationOrderDetail } = this.data;
    let { shopInfo } = this.data;
    let openId = wx.getStorageSync("openid")
    wxPay({
      orderId: reservationOrderDetail.orderId,
      openId: openId,
      shopId: shopInfo.id
    }, (resd) => {
      wx.requestPayment({
        'timeStamp': resd.result.timeStamp.toString(),
        'nonceStr': resd.result.nonceStr,
        'package': resd.result.prepayId,
        'signType': resd.result.signType,
        'paySign': resd.result.paySign,
        'success': (resd) => {
          clearInterval(this.timeInter)
          wx.redirectTo({
            url: '/subHotPackage/pages/payWin/index'
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
  /**
   * 立刻评价
   */
  evaluation() {
    let { reservationOrderDetail } = this.data;
    wx.navigateTo({
      url: `/subreservation/pages/commentserve/index?id=${reservationOrderDetail.orderId}`
    })
  },
  /**
   * 联系商家
   */
  phonecallevent() {
    let { reservationOrderDetail } = this.data;
    wx.makePhoneCall({
      phoneNumber: reservationOrderDetail.shopPhone
    })
  },
  /**
   * 申请退款
   */
  requestRefund(){
    let { reservationOrderDetail } = this.data;
    wx.navigateTo({
      url: `/subreservation/pages/wantrefund/index?id=${reservationOrderDetail.orderId}`,
    })
  }
}
function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS(),
    reservationOrderDetail: state.reservationOrderDetail.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))