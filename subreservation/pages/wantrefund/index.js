const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getRefundPickCode, getRefundReasonList, appRefundOrder, getReservationOrderDetail } from '../../../actions/order.js'
const pageConfig = {
   /*
    页面的初始数据
   */
  data: {
    sheetAction: false,
    chooseIndex: -1,
    animationData: {},
    orderId:0,
    refundData:[],
    allmoney:0,
    money:0,
    refundList:[],
    refundName:""
  },

  closeMaskAnimation() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in',
    })
    this.animation = animation
    animation.translateY(0).step();
    this.setData({
      animationData: animation.export()
    })
    this.animation.translateY(300).step();
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(() => {
      this.setData({
        sheetAction: false,
      })
    }, 500)
  },
  /**
   * 显示违规内容
   */
  onShowCall() {
    getRefundReasonList({

    },(res)=>{
      if (res.errorCode == 0){
        this.setData({
          refundList: res.result         
        })
      }
    })
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out',
    })
    animation.translateY(330).step();
    this.setData({
      sheetAction: true,
      animationData: animation.export()
    })
    setTimeout(() => {
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export()
      })
    }, 300)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShowCall() {
    this.setData({
      sheetAction: !this.data.sheetAction
    })
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
          }
        );
        wx.navigateBack();
        console.log("qqq")
      }
    }.bind(this), 200)

  },
  onLoad: function (options) {
    this.setData({
      orderId: options.id
    })
  },
  clickchange(e) {
    let { index } = e.currentTarget.dataset;
    this.setData({
      chooseIndex: index,
      refundName: this.data.refundList[index].value
    })
    this.closeMaskAnimation()
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
    getRefundPickCode({
      id: this.data.orderId
    },(res)=>{
      if (res.errorCode == 0){
        let allmoney = 0;
        res.result.map(item=>{
         
          if (item.pickCodeStatus == 0){
            item.select = true
            allmoney += item.money
          }
           
        })
        this.setData({
          allmoney: allmoney,
          money: allmoney,
          refundData: res.result
        })
      }
    })
  },

  clickTab(e){
    let { index } = e.currentTarget.dataset;
    let { refundData, money} = this.data;
    refundData[index].select = !refundData[index].select
    console.dir(refundData[index].select)
    this.setData({
      money: refundData[index].select ? parseFloat((money + refundData[index].money).toFixed(2)) : parseFloat((money - refundData[index].money).toFixed(2)),
      refundData: refundData
    })
  },
  clikInput(e){
    this.setData({
      refundExplain: e.detail.value
    })
  },
  /**
   * 申请退款
   */
  postData(){
    let { orderId, chooseIndex, refundList, refundExplain, refundData} = this.data;
    let pickCodes = [];
    refundData.map(item=>{
      if (item.select){
        pickCodes.push(item.pickCode)
      }
    })
    appRefundOrder({
      orderId: orderId,
      refundReason: refundList[chooseIndex].key,
      refundExplain: refundExplain,
      pickCodes: pickCodes.toString()
    },(res)=>{
      if (res.errorCode == 0){
        wx.showToast({
          title: '申请成功',
        })
        this.dispatch(getReservationOrderDetail({
          orderId: orderId
        }))
        wx.navigateBack()
      }
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