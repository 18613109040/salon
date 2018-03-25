const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { postOrder, getReservationOrderDetail, getServerTimeList} from '../../../actions/order.js'

const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    sheetAction: false,
    number:1,
    selectIndex:-1,
    packageName:"",
    week: [],
    timeSlots: [],
    changeValue: [0, 0],
    subscribeDate: "",
    showPick: false,//预约时间
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
    // 
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
  onpendrawer(){
    this.setData({
      sheetAction: !this.data.sheetAction
    })
  },
  closedrawer(){
    this.setData({
      sheetAction: !this.data.sheetAction
    })
  },
  changeInput(e){
    if (/^1[34578]\d{9}$/.test(e.detail.value)) {
     
    }else{
      wx.showToast({
        title: '手机号码不正确',
        icon:"none"
      })
    }
  },
  onpentime() {
    this.setData({
      show: !this.data.show
    })
  },
  closetime() {
    this.setData({
      show: !this.data.show
    })
  },
  changeTab(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      selectIndex: index
    })
  },
  //弹出预约时间
  showClick: function () {
    let { packageDetail, appointmentTeacherdetail} = this.data;
    getServerTimeList({
      id: appointmentTeacherdetail.serverId
    }, (res) => {
    
      if (res.errorCode == 0) {
        let data = res.result.filter(item => item.isRest == false && item.timeSlots.length > 0)
        this.setData({
          week: data,
          showPick: true,
          timeSlots: data[0].timeSlots
        })
      }
    }) 
  },
  bindChange(e) {
    let { week } = this.data;
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
  enterAddress() {
    let { week, changeValue } = this.data;
    this.setData({
      showPick: false,
      subscribeDate: week[changeValue[0]].timeSlots[changeValue[1]].date
    })
  },
  enter(){
    let { packageInfoList} = this.data.appointmentTeacherdetail
    this.setData({
      sheetAction: !this.data.sheetAction,
      packageName: packageInfoList[this.data.selectIndex].packageName
    })
  },
  formSubmit(e){
   
    let { packageInfoList } = this.data.appointmentTeacherdetail
    let { shopInfo, selectIndex, appointmentTeacherdetail, number, packageName, subscribeDate} = this.data;
    let { buyerRemark, buyerNickName, buyerPhone } = e.detail.value;
    let openId = wx.getStorageSync("openid")
    if (/^1[34578]\d{9}$/.test(buyerPhone)) {
    
    }else{
      wx.showToast({
        title: '手机号码不正确',
        icon: "none"
      })
      return ;
    }
    if (!packageName){
      wx.showToast({
        title: '请选择服务',
        icon: "none"
      })
      return;
    }
    postOrder({
      shopId: shopInfo.id,
      payType:0,
      orderType:2,
      serverId: appointmentTeacherdetail.serverId,
      packageId: packageInfoList[selectIndex].packageId,
      quantity: number,
      skuId:"",
      subscribeDate: subscribeDate,
      buyerRemark: buyerRemark,
      orderSource:1,
      buyerPhone: buyerPhone,
      buyerNickName: buyerNickName,
      openId: openId,
      formId: e.detail.formId
    },(res)=>{
     
      if (res.errorCode == 0){
        this.dispatch(getReservationOrderDetail({
          orderId: res.result.orderId
        }))
        wx.redirectTo({
          url:"/subreservation/pages/payreservations/index"
        })
      }
    })
  },
  desNum(){
    let { number} = this.data;
    if(number<=1){
      wx.showToast({
        title: '预约人数不能少于1人',
        icon:"none"
      })
      return ;
    }
    number--
    this.setData({
      number: number
    })
  },
  addNum(){
    let { number } = this.data;
    number++
    this.setData({
      number: number
    })
  }
}

function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS(),
    appointmentTeacherdetail: state.appointmentTeacherdetail.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))