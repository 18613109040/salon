// pages/affirmSubscribe/index.js
const { connect } = require('../../../libs/wechat-weapp-redux.js')
var QR = require("../../../libs/qrcode.js");
import { countDown, confirm } from '../../../utils/util.js'
import { wxPay, cancelSubscribe, cancelOrder, getReservationOrderDetail } from '../../../actions/order.js'

const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    time: "00:00",
    showModal: false
  },
  // 弹窗点击事件
  submit: function () {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {

  },

  go: function () {
    this.setData({
      showModal: false
    })
  },
  // 点击事件
  phonecallevent(e) {
    let { reservationOrderDetail } = this.data;
    wx.makePhoneCall({
      phoneNumber: reservationOrderDetail.shopPhone
    })
  },
  // 预约
  gotobespoke() {
    wx.navigateTo({
      url: '/subHotPackage/pages/affirmSubscribe/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowWidth: res.windowWidth
        })
      },
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
    let { reservationOrderDetail } = this.data;
    if (reservationOrderDetail.pickCode) {
      reservationOrderDetail.pickCode.map((item, index) => {
        let useStatusText = ['', '已使用', '退款中', '已退款', '退款失败']
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
  createQrCode(url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
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
    clearInterval(this.timeInter)
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
  /**
   * 取消订单
   */
  clickCancelOrder() {
    let { reservationOrderDetail } = this.data;
    confirm({
      content:"确定取消预约",
      ok:()=>{
        cancelOrder({
          orderId: reservationOrderDetail.orderId
        }, (res) => {
          if (res.errorCode == 0) {
            wx.showToast({
              title: '取消成功',
              icon: "none"
            })
            this.dispatch(getReservationOrderDetail({
              orderId: reservationOrderDetail.orderId
            }))
          }
        })
      }
    })
    
  },
  /**
   * 取消预约
   */
  cancelReservation() {
    let { reservationOrderDetail } = this.data;
    confirm({

      content: "确定取消预约",
      ok: () => {
        cancelSubscribe({
          orderId: reservationOrderDetail.orderId
        }, (res) => {
          if (res.errorCode == 0) {
            wx.showToast({
              title: '取消成功',
              icon: "none"
            })
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
  }
}
function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS(),
    reservationOrderDetail: state.reservationOrderDetail.toJS(),
  }
}
Page(connect(mapStateToProps)(pageConfig))