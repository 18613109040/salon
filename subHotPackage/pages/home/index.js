const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getHotPackageList, emptyHostPackageList} from '../../../actions/hotPackage.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    pageSize:10
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
    let { shopInfo, pageSize } = this.data
    this.dispatch(getHotPackageList({
      shopId: shopInfo.id,
      "page.currentPage":1,
      "page.pageSize": pageSize
    }))
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.dispatch(emptyHostPackageList())
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.dispatch(emptyHostPackageList())
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.dispatch(emptyHostPackageList())
    let { shopInfo, pageSize } = this.data
    this.dispatch(getHotPackageList({
      shopId: shopInfo.id,
      "page.currentPage": 1,
      "page.pageSize": pageSize
    },(res)=>{
      wx.stopPullDownRefresh()
    }))
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { shopInfo, pageSize} = this.data;
    const { load ,data} = this.data.hotPackageList;
    if(load){
      this.dispatch(getHotPackageList({
        shopId: shopInfo.id,
        "page.currentPage": parseInt(data.length/pageSize)+1,
        "page.pageSize": pageSize
      }))
    }
  }
}
function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS(),
    hotPackageList: state.hotPackageList.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))