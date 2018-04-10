// pages/affirmSubscribe/index.js
const { connect } = require('../../../libs/wechat-weapp-redux.js')
var QR = require("../../../libs/qrcode.js");
import { countDown, confirm } from '../../../utils/util.js'
import { wxPay, cancelSubscribe, cancelOrder, getReservationOrderDetail, getRefuseMsg } from '../../../actions/order.js'

const pageConfig = {
  data: {
    time: "00:00",
    showModal: false,
    showPickCode: false,
    orderId: "",
    resultMessage:"",
    image:"",
    orderDetail: {},
    selectIndex: 0,
    useStatusText: ['未使用', '已使用', '退款中', '已退款', '拒绝退款', '拒绝退款']
  },
  // 弹窗点击事件
  submit: function () {
    this.setData({
      showModal: true
    })
    let { orderDetail } = this.data;
    getRefuseMsg({
      id: orderDetail.orderId
    },(res)=>{
      this.setData({
        resultMessage: res.result
      })
    })

  },
  closeModel() {
    this.setData({
      showModal: false
    })
  },

  go: function () {
    this.setData({
      showModal: false
    })
  },
  // 点击事件
  phonecallevent(e) {
    let { orderDetail } = this.data;
    wx.makePhoneCall({
      phoneNumber: orderDetail.shopPhone
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
    this.setData({
      orderId: options.id
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
    this.getData()
  },
  getData() {
    this.dispatch(getReservationOrderDetail({
      orderId: this.data.orderId
    }, (res) => {
      if (res.errorCode == 0) {
        let result = Object.assign({}, res.result)
        if (result.pickCode) {
          result.pickCode = JSON.parse(result.pickCode)
          this.createQrCode(result.pickCode[0].pickCode, "mycanvas", 150, 150);
        }
        this.setData({
          orderDetail: result,
          pickCodeData: result.pickCode[0]
        })
        let time = result.leftPayTimeMills;
        if (time) {
          if (time > 0) {
            this.setData({
              time: countDown(time)
            })
          }
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
      }
    }))
  },
  createQrCode(url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片

    QR.api.draw(url, canvasId, cavW, cavH, (res) => {
      this.setData({
        image: res.tempFilePath
      })
    })
    

  },
  onShowCode(e) {
    let { type } = e.currentTarget.dataset;
    let { selectIndex, orderDetail } = this.data;
    if (type == 'prev') {
      this.setData({
        pickCodeData: orderDetail.pickCode[selectIndex - 1],
        selectIndex: selectIndex - 1
      })
      this.createQrCode(orderDetail.pickCode[selectIndex - 1].pickCode, "mycanvas", 150, 150);
    }
    if (type == 'next') {
      this.setData({
        pickCodeData: orderDetail.pickCode[selectIndex + 1],
        selectIndex: selectIndex + 1
      })
      this.createQrCode(orderDetail.pickCode[selectIndex + 1].pickCode, "mycanvas", 150, 150);
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
    let { orderDetail } = this.data;
    confirm({
      content: "确定取消预约",
      ok: () => {
        cancelOrder({
          orderId: orderDetail.orderId
        }, (res) => {
          if (res.errorCode == 0) {
            wx.showToast({
              title: '取消成功',
              icon: "none"
            })
            this.getData()
          }
        })
      }
    })

  },
  /**
   * 取消预约
   */
  cancelReservation() {
    let { orderDetail } = this.data;
    confirm({
      content: "确定取消预约",
      ok: () => {
        cancelSubscribe({
          orderId: orderDetail.orderId
        }, (res) => {
          if (res.errorCode == 0) {
            wx.showToast({
              title: '取消成功',
              icon: "none"
            })
            this.getData()
          }
        })
      }
    })

  },
  /**
   * 立刻支付
   */
  payImmediately() {
    let { orderDetail } = this.data;
    let { shopInfo } = this.data;
    let openId = wx.getStorageSync("openid")
    wxPay({
      orderId: orderDetail.orderId,
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
            url: `/pages/payWin/index?orderId=${orderDetail.orderId}`
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
    let { orderDetail } = this.data;
    wx.navigateTo({
      url: `/subreservation/pages/commentserve/index?id=${orderDetail.orderId}`
    })
  },
  /**
  * 申请退款
  */
  requestRefund() {
    let { orderDetail } = this.data;
    wx.navigateTo({
      url: `/subreservation/pages/wantrefund/index?id=${orderDetail.orderId}`,
    })
  }
}
function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))