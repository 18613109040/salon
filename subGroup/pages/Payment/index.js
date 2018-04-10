import {
  groupOrderAdd,
  groupOrderMemberAdd
} from '../../../actions/group'
import { wxPay, getReservationOrderDetail} from '../../../actions/order.js'
const { connect } = require('../../../libs/wechat-weapp-redux.js')
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    id: "-1",
    showid: 0
  },
  opentext(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({

      showid: showid,
    })
  },

  changeInput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  payMent(){
    let openId = wx.getStorageSync('openid');
    let {GroupCart,GroupCart:{number,groupPrice},phone} = this.data
    //?groupActivityId=1172&groupMembers=5&openId&skuId&skuValue&fromId=5&orderSource=1&buyerRemark&payType=1
    var re = /^1\d{10}$/
    if(!re.test(phone)){
      wx.showToast({
        title: "请输入正确的手机号码",
        icon: 'none',
        duration: 2000
      })
      return
    }
    let data={
      openId:openId,
      skuId:GroupCart.skuId||'',
      skuValue:GroupCart.skuValue||'',
      fromId:5,//
      orderSource:1,//
      buyerRemark:'',//
      payType:1,// 微信支付
      number:number,
      phone:phone,
    }
    if(GroupCart.joinGroupType=='add'){
      // 自己发起的拼团
      data.groupActivityId=GroupCart.groupActivityId
      data.groupMembers=GroupCart.groupMembers
    }
    if(GroupCart.joinGroupType=='join'&&GroupCart.groupOrderId){
      // 参与他人发请的拼团
      data.groupOrderId = GroupCart.groupOrderId
    }if(GroupCart.joinGroupType=='join'&&!GroupCart.groupOrderId){
      wx.showToast({
        title: "小主，获取参团信息失败，请重新选择",
        icon: 'none',
        duration: 2000
      })
      return
    }

    if(GroupCart.joinGroupType=='join'){
      groupOrderMemberAdd(data,this.wxPayToDo)
    }else if(GroupCart.joinGroupType=='add'){
      groupOrderAdd(data, this.wxPayToDo)
    }
  },
  wxPayToDo(res){
    wx.showToast({
      title: "成功",
      icon: 'none',
      duration: 1000
    })
    console.dir(res)
    let { shopInfo} = this.data;
    let openId = wx.getStorageSync("openid")
    wxPay({
      orderId: res.result,
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
            url: `/pages/payWin/index?orderId=${res.result}&type=1`,
          })
        },
        'fail': (resd) => {
          this.dispatch(getReservationOrderDetail({
            orderId: res.result
          }))
          wx.redirectTo({
            url: `/subMyInfo/pages/orderDetails/index`
          })
        }
      })
    })
  },
  goToShopByMap() {
    let { shopInfo } = this.data
    wx.openLocation({//查看位置
      latitude: shopInfo.latitude,
      longitude: shopInfo.longitude,
      scale: 28,
      name: shopInfo.name,
      address: shopInfo.address
    })
  },
  onNumber(e){
    let {type} = e.currentTarget.dataset
    let {GroupCart,GroupCart:{number,groupPrice}} = this.data
    if(type=='add') number += 1
    if(type=='sub') number -= 1
    GroupCart.number = number 
    this.setData({
      GroupCart:GroupCart,
      totalPrice:(number*groupPrice)
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
  onchange(e) {
    let showid = e.currentTarget.dataset.id
    this.setData({
      showid: showid
    })
  }
}

function mapStateToProps(state) {
  console.log(state.shopInfo.toJS())
  console.log(state.GroupCart.toJS())
  let GroupCart = state.GroupCart.toJS()
  let totalPrice = GroupCart.number*GroupCart.groupPrice
  return {
    GroupCart:GroupCart,
    shopInfo: state.shopInfo.toJS(),
    totalPrice:totalPrice
  }
}
Page(connect(mapStateToProps)(pageConfig))