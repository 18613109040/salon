// subGroup/pages/21551/index.js
import {
  groupPackageDetail,
  groupActivityOrder,
  groupPackageSku,
  onChangeSkuSelect,
  saveSkuGoodsData,
  groupMemberOrder
} from '../../../actions/group'
const {leftTimer} = require("../../../utils/util")
const { connect } = require('../../../libs/wechat-weapp-redux.js')
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    content:[],// 详情内容
    combinationSku : [],  // 团商品sku组合后的数据格式
    goodsSku:[],          // 团商品的sku 
    selectSku:{},         // 选中的商品sku详情数据，用于提交
    tuanData:{},          // 参加拼团信息
    imgUrls: [], // 滚动图
    ActivityList:[],// 正在拼团中的列表
    groupOrders : [],//
    specification:[
      " 规格一", "规格二", " 规格三", " 规格四", " 规格五", " 规格六", " 规格七"
    ],
    property:[
      "属性一", "属性二", "属性三"
    ],
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    showSeparatepurchase: false,
    sheetAction: false,//弹窗正在拼团的默认值
    Offered: false,  //一开始我要参团的默认值
    Number:1,
    num:1,
    minusStatus:'disable',
    id:"",
    choose:-1,//属性值
    size:-1,//规格
  },

  onAdd(){   //点击加号
    var Number = this.data.Number;
    Number++;
    var minusStatus = Number < 1 ? 'disable' : 'normal';
    this.setData({
      Number: Number,
      minusStatus: minusStatus
    })  
  },
  onMinus(){ //点击减号
    var Number = this.data.Number;
    if(Number > 1){
      Number--;
    }
    var minusStatus = Number <= 1 ? 'disable' : 'normal';
    this.setData({
      Number : Number,
      minusStatus: minusStatus
    })
  },
  bindManual:function(e){
    var Number = e.detail.value;
    this.setData({
      Number:Number
    });
  },
  onShowOffered() {
    this.setData({
      Offered: !this.data.Offered
    })
  },
  // 点击选择属性
  chooseprop(e){
    console.log(e)
    let choose = e.currentTarget.dataset.index
    this.setData({
      choose:choose
    })
  },
  // 点击选择规格
  choosesize(e){
    console.log(55)
    console.log(e)
    let size = e.currentTarget.dataset.size
    console.log(size)
    this.setData({
      size:size
    })
  },
  onShows() {
    this.setData({
      sheetAction: !this.data.sheetAction
    })
  },
  // 查看别人的开团详情
  onShowsfirst(e){
    let {item} = e.currentTarget.dataset
    groupMemberOrder(item.id,(res)=>{
      this.intervalTuanTime =  setInterval(()=>{
        res.times=leftTimer(res.groupSuccessTime)
        res.subMember = (res.groupMembers-res.joinMembers)
        this.setData({
          tuanData:res,
        })
      },1000)
      this.setData({
        tuanData:res,
        sheetAction:true,
      })
    })
  },
  closeMaskAnimation() {
    this.setData({
      sheetAction: false,
      Offered: false
    })
  },
  //点击关闭蒙层
  closewin(){
    this.setData({
      Offered: false
    })
  },
  buyer: function (e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
      showSeparatepurchase: !this.data.showSeparatepurchase,
      id: id
    })
  },
  close: function () {
    this.setData({
      showSeparatepurchase: !this.data.showSeparatepurchase
    })
  },
  ViewAll(){ //查看全部评价
    wx.navigateTo({
      url: '/subGroup/pages/allcomment/index',
    })
  },
  // 参与他人发起的拼团
  participate(){
    const { detail,tuanData } = this.data;
    this.hideTuanData()
    console.log(detail)
    if(detail.multiKinds==1){
      this.startTuan({
        currentTarget:{
          dataset:{
            type:'join'
          }
        }
      })
    }else{
      this.setData({
        joinGroupType : 'join',// add=自己发起的拼团，join=参与他人发起的拼团
      })
      this.clickEnter()
    }
  },
  // 切换sku选项
  onChangeSku(e){
    let {id,item} = e.currentTarget.dataset
    if(!item.ishas) return

    let {combinationSku,goodsSku} = this.data
    let newComSku = onChangeSkuSelect(id,combinationSku,goodsSku)
    let selectSku = this.getSelectSku(newComSku,goodsSku)
    this.setData({
      combinationSku:newComSku,
      selectSku:selectSku
    })
  },
  /*
    type==add@默认发起拼团
    type==join@参与他人的拼团
    用于提交拼团订单时判断调用的接口
  */
  clickEnter(e){ 
    let {detail,selectSku,tuanData,joinGroupType} = this.data
    let data = {
      ...selectSku,
      ...detail,
      number:1,
      groupOrderId :tuanData.id||'', 
      joinGroupType:joinGroupType
    }
    this.dispatch(saveSkuGoodsData(data))
    wx.navigateTo({
      url:'/subGroup/pages/Payment/index'
    })
  },

  // 计算选中的sku值
  getSelectSku(skuList,goodsSku){
    // 拼接选中的商品sku的字符串
    let selectList=skuList.map((item,index)=>{
      let {title,value} = item
      let obj = value.find(ix=>ix.select)
      
      return title+':'+obj.name
    })
    let selectLable = selectList.join(';')
    let selectShop = goodsSku.find(item => item.attrValues === selectLable)||{}
    return selectShop
  },
  // 发起拼团
  hideTuanData(){
    this.setData({
      showSeparatepurchase:false
    })
  },
  startTuan(e){
    let {type} = e.currentTarget.dataset
    let {detail} = this.data
    groupPackageSku(detail.id,(res)=>{
      let selectSku = this.getSelectSku(res.combinationSku,res.goodsSku)
      this.setData({
        joinGroupType : type,// add=自己发起的拼团，join=参与他人发起的拼团
        showSeparatepurchase : true,
        selectSku : selectSku,
        combinationSku:res.combinationSku,
        goodsSku : res.goodsSku
      })
    })
  },
  // 拼团商品详情
  getDetail(id){
    groupPackageDetail(id,(res)=>{
      let {groupOrders,imgUrls,detail} =res 
      if(groupOrders.length) {
        let _run = ()=>{
          groupOrders = groupOrders.map(item=>{
            item.times=leftTimer(item.groupSuccessTime)
            return item
          })
          this.setData({
            groupOrders:groupOrders
          })
        }
        this.intervalTime =  setInterval(_run,1000)
        _run()
      }
      this.setData({
        detail:res,
        imgUrls:imgUrls,
        content: detail?JSON.parse(detail)||[]:[]
      })
    })
    groupActivityOrder({
      activityId:id,
      'page.currentPage':1
    },res=>{
      console.log(res)
      this.setData({
        ActivityList:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
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
  onShareAppMessage(res) {
    let { detail } = this.data;
    if (res.from === 'button') {
      // 来自页面内转发按
    }
    return {
      title: detail.packageName,
      path: `/subGroup/pages/Collagedetails/index?id=${detail.id}`,
      imageUrl:detail.packageImg,
      success: function (res) {
        // 转发成功
        console.debug(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onTouchstart(){
    console.log('onTouchstart')
  }
}

function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS(),
  }
}
Page(connect(mapStateToProps)(pageConfig))