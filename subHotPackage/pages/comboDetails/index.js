
const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getPackageDetail, saveCollect, getPackageSkuList} from '../../../actions/hotPackage.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    goodId:"",
    showModel:false
  },
  // 预约
  gotobespoke() {
    wx.navigateTo({
      url: '/subHotPackage/pages/affirmSubscribe/index'
    })
  },
  clickSkuModer(){
    let { packageDetail } = this.data;
    
    wx.navigateTo({
      url: packageDetail.subcribe == 0 ? '/subHotPackage/pages/noReservation/index' : '/subHotPackage/pages/affirmSubscribe/index'
    })
  },
  //免预约
  gotobeSpokeFree(){
    let { packageDetail} = this.data;
    if (packageDetail.multiKinds!=0){
      this.setData({
        showModel:true
      })
      this.dispatch(getPackageSkuList({
        id: packageDetail.packageId
      }))
    }else{
      wx.navigateTo({
        url: '/subHotPackage/pages/noReservation/index'
      })
    }
  },
  //收藏
  collect(e){
    let { goodId, shopInfo } = this.data;
    let { collect} = e.currentTarget.dataset;
    saveCollect({
      packageId: goodId,
      collect: collect,
      shopId: shopInfo.id
    },(res)=>{
      if (res.errorCode == 0){
        this.setData({
          hasCollect: collect
        })
      }
      
      wx.showToast({
        title: res.errorMsg,
        icon:"none"
      })
    })
  },
  //返回首页
  returnHome: function () {
    wx.switchTab({
      url: '/pages/home/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodId: options.id
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
    let { goodId, userInfo} = this.data;
    this.dispatch(getPackageDetail({
      packageId: goodId,
      memberId: userInfo.id||""
    }))
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let { shopInfo, goodId } = this.data;
    if (res.from === 'button') {
      // 来自页面内转发按
    }
    return {
      title: shopInfo.name,
      path: `/subHotPackage/pages/comboDetails/index?id=${goodId}`,
      success: function (res) {
        // 转发成功
        console.debug(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
}
function mapStateToProps(state) {
  console.dir(state.packageSku.toJS())
  return {
    shopInfo: state.shopInfo.toJS(),
    packageDetail: state.packageDetail.toJS(),
    userInfo: state.userInfo.toJS(),
    hasCollect: state.packageDetail.toJS().hasCollect,
    packageSku: state.packageSku.toJS()
  }
}

Page(connect(mapStateToProps)(pageConfig))