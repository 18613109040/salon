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
    image:"",
    orderId:"",
    orderDetail:{},
    selectIndex:0,
    useStatusText :['未使用', '已使用', '退款中', '已退款', '拒绝退款', '拒绝退款']
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
  onShow(){
    this.getData()
  },
  getData(){
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
    // QR.api.draw(url, canvasId, cavW, cavH)
    QR.api.draw(url, canvasId, cavW, cavH,(res)=>{
      this.setData({
        image: res.tempFilePath
      })
    })
   

  },
  onShowCode(e){
    let { type } = e.currentTarget.dataset;
    let { selectIndex, orderDetail} = this.data;
    if (type == 'prev') {
      this.setData({
        pickCodeData: orderDetail.pickCode[selectIndex-1],
        selectIndex: selectIndex-1
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
  * 取消订单
  */
  clickCancelOrder() {
    let { orderDetail } = this.data;
    confirm({
      content: "确定取消订单",
      ok: () => {
        cancelOrder({
          orderId: orderDetail.orderId
        }, (res) => {
          if (res.errorCode == 0) {
            wx.showToast({
              title: '取消成功',
              icon: "none"
            })
            clearInterval(this.timeInter)
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
          clearInterval(this.timeInter)
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
   * 联系商家
   */
  phonecallevent() {
    let { orderDetail } = this.data;
    wx.makePhoneCall({
      phoneNumber: orderDetail.shopPhone
    })
  },
  /**
   * 申请退款
   */
  requestRefund(){
    let { orderDetail } = this.data;
    wx.navigateTo({
      url: `/subreservation/pages/wantrefund/index?id=${orderDetail.orderId}`,
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
   * 进入商品
   */
  gotoGoods(){
    let { orderDetail} = this.data
    wx.navigateTo({
      url: `/subHotPackage/pages/comboDetails/index?id=${orderDetail.packageId}`,
    })
  }
}
function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))