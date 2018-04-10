// pages/affirmSubscribe/index.js
const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { postOrder, getSubscribeTimeList, getCanSubscribeList, wxPay} from '../../../actions/order.js'
import {  getReservationOrderDetail } from '../../../actions/order.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    week: [],
    timeSlots: [],
    changeValue:[0,0],
    subscribeDate:"",
    showPick: false,//预约时间
    showWaiter: false,//选择服务人员
    number:1,
    selectedIndex:-1,
    money:0,
    name:"",
    appointmentTeacherLsit:[],
    payDisabled: false
  },
  // 点击服务员
  selectWaiter: function (e) {
    let { appointmentTeacherLsit} = this.data;
    let index = e.currentTarget.dataset.index
    this.setData({
      selectedIndex: index,
      name: appointmentTeacherLsit[index].serverName
    })
  },
  //弹出服务人员
  waiterClick:function(){
    let { packageDetail, shopInfo, subscribeDate } = this.data;
    if (!subscribeDate) {
      wx.showToast({
        title: '请选择预约时间',
        icon: "none"
      })
      return;
    }
  
   getCanSubscribeList({
     packageId: packageDetail.packageId,
      shopId: shopInfo.id,
      subscribeDt: subscribeDate
    },(res)=>{
      if (res.errorCode == 0){
        this.setData({
          showWaiter: true,
          appointmentTeacherLsit:res.result
        })
      }
    })
  },
  //关闭服务人员
  waiterHidder:function(){
    this.setData({
      showWaiter: false
    })
  },
  //弹出预约时间
  showClick: function () {
    let { packageDetail } = this.data;
    getSubscribeTimeList({
      id: packageDetail.packageId
    },(res)=>{
      if (res.errorCode == 0){
        this.setData({
          week: res.result,
          timeSlots: res.result[0].timeSlots
        })
      }
    })
    this.setData({
      showPick: true
    })
  },
  bindChange(e) {
    let { week} = this.data;
    this.setData({
      timeSlots: week[e.detail.value[0]].timeSlots,
      changeValue: e.detail.value
    })
  },
  //关闭预约时间
  cancelAddress: function () {
    this.setData({
      showPick: false
    })
  },

  enterAddress(){
    let { week, changeValue} = this.data;
    this.setData({
      showPick: false,
      subscribeDate: week[changeValue[0]].timeSlots[changeValue[1]].date
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let { packageDetail} = this.data;
    this.setData({
      money: packageDetail.price
    })
 
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
    let { shopInfo, number, packageDetail, selectedIndex, appointmentTeacherLsit, subscribeDate} = this.data;
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
    if (!buyerNickName){
      wx.showToast({
        title: '请填写称呼',
        icon: "none"
      })
      return;
    }
    if (!subscribeDate){
      wx.showToast({
        title: '请选择预约时间',
        icon: "none"
      })
      return;
    }
    if (selectedIndex==-1){
      wx.showToast({
        title: '请选择预约人员',
        icon: "none"
      })
      return;
    }
    
    this.setData({
      payDisabled: true
    })
    postOrder({
      shopId: shopInfo.id,
      payType: 1,
      orderType: 1,
      serverId: appointmentTeacherLsit[selectedIndex].serverId,
      packageId: packageDetail.packageId,
      quantity: number,
      skuId: packageDetail.skuId ? packageDetail.skuId : "",
      subscribeDate: subscribeDate,
      buyerRemark: buyerRemark,
      orderSource: 1,
      buyerPhone: buyerPhone,
      buyerNickName: buyerNickName,
      openId: openId,
      formId: e.detail.formId
    }, (res) => {
      if (res.errorCode == 0){
        wxPay({
          orderId: res.result.orderId,
          openId: openId,
          shopId:shopInfo.id
        },(resd)=>{
        
          wx.requestPayment({
            'timeStamp': resd.result.timeStamp.toString(),
            'nonceStr': resd.result.nonceStr,
            'package': resd.result.prepayId,
            'signType': resd.result.signType,
            'paySign': resd.result.paySign,
            'success': (resd) => {
              this.setData({
                payDisabled: false
              })
              wx.redirectTo({
                url: `/pages/payWin/index?orderId=${res.result.orderId}&type=2`
              })
              
            },
            'fail': (resd) => {
              this.setData({
                payDisabled: false
              })
              wx.redirectTo({
                url: `/subreservation/pages/reservationdetails/index?id=${res.result.orderId}`
              })
            }
          })
        })
      } else {
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