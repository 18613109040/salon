const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { chooseImage } from '../../../utils/wxApi.js'
import { getOrderCommentDetail, addPackageComment,addServerComment} from '../../../actions/order.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    packageScore: 0,
    serverScore:0,
    evaluate:{},
    packImage: [{
      url: '../../../images/li_tow.png',
      sock: false
    }, {
      url: '../../../images/li_tow.png',
      sock: false
    }, {
      url: '../../../images/li_tow.png',
      sock: false
    }],
    teacherImage: [{
      url: '../../../images/li_tow.png',
      sock: false
    }, {
      url: '../../../images/li_tow.png',
      sock: false
    }, {
      url: '../../../images/li_tow.png',
      sock: false
    }],
    packageCommentText:"",
    serverCommentText:"",
    orderId:""
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
    let { packImage, teacherImage} = this.data
    getOrderCommentDetail({
      orderId: this.data.orderId
    },(res)=>{
      if (res.errorCode ==0){
        let arrayTemp =  [];
        if (res.result.packageCommentImg1){
          packImage[0] = {
            url: res.result.packageCommentImg1,
            sock:true
          }         
        }
        if (res.result.packageCommentImg2){
          packImage[1] = {
            url: res.result.packageCommentImg2,
            sock: true
          }    
        }
        if (res.result.packageCommentImg3) {
          packImage[2] = {
            url: res.result.packageCommentImg3,
            sock: true
          }    
        }
        if (res.result.serverCommentImg1){
          teacherImage[0]={
            url: res.result.serverCommentImg1,
            sock: true
          }
        }
        if (res.result.serverCommentImg2) {
          teacherImage[0] = {
            url: res.result.serverCommentImg2,
            sock: true
          }
        }
        if (res.result.serverCommentImg3) {
          teacherImage[0] = {
            url: res.result.serverCommentImg3,
            sock: true
          }
        }
        this.setData({
          evaluate: res.result,
          packImage: packImage,
          teacherImage: teacherImage
        })
      }
     
    })
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
   * 点击评分
   */
  clickRate(e) {
    this.setData({
      packageScore: e.detail.value
    })
  },
  clickServerRate(e){
    this.setData({
      serverScore: e.detail.value
    })
  },
  packageEvaluation(e) {
    let { index } = e.currentTarget.dataset;
    chooseImage("album", (res) => {
      console.dir(res)
      let image = this.data.packImage;
      image[index].url = res;
      image[index].sock = true;
      this.setData({
        packImage: image
      })
    })
  },
  manEvaluation(e) {
    let { index } = e.currentTarget.dataset;

    chooseImage("album", (res) => {
      console.dir(res)
      let image = this.data.teacherImage;
      image[index].url = res;
      image[index].sock = true;
      this.setData({
        teacherImage: image
      })
    })
  },
  packageChange(e){
    this.setData({
      packageCommentText: e.detail.value
    })
  },
  serverChange(e){
    this.setData({
      serverCommentText: e.detail.value
    })
  },
  submitpackageComment(){
    let { orderId, evaluate, packageCommentText, serverCommentText, packageScore, packImage} = this.data;
    let img = packImage.filter(item => item.sock == true)
    if (packageScore){
      addPackageComment({
        orderId: orderId,
        packageId: evaluate.packageId,
        sorce: packageScore,
        commentText: packageCommentText,
        commentImg1: img[0] ? img[0].url : "",
        commentImg2: img[1] ? img[1].url : "",
        commentImg3: img[2] ? img[2].url : ""
      },(res)=>{
        
        if (res.errorCode==0){
          wx.showToast({
            title: '套餐评价成功',
            icon: "none"
          })
          this.setData({
            evaluate: Object.assign({}, this.data.evaluate, { packageScore: packageScore})
          })
        }
        
      })
    }else{
      wx.showToast({
        title: '请对套餐进行评价',
        icon:"none"
      })
    }
  },
  submitServerComment(){
    let { orderId, evaluate, serverCommentText, serverScore, teacherImage } = this.data;
    let img = teacherImage.filter(item => item.sock == true)
    if (serverScore) {
      addServerComment({
        orderId: orderId,
        sorce: serverScore,
        serverId: evaluate.serverId,
        commentText: serverCommentText,
        commentImg1: img[0] ? img[0].url : "",
        commentImg2: img[1] ? img[1].url : "",
        commentImg3: img[2] ? img[2].url : ""
      },(res)=>{
        if (res.errorCode == 0) {
          wx.showToast({
            title: '技师评价成功',
            icon: "none"
          })
          this.setData({
            evaluate: Object.assign({}, this.data.evaluate, { serverScore: serverScore })
          })
        }
      })
    } else {
      wx.showToast({
        title: '请对技师进行评价',
        icon: "none"
      })
    }
    
  }
}
function mapStateToProps(state) {

  return {
    userInfo: state.userInfo.toJS(),
    reservationOrderDetail: state.reservationOrderDetail.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))