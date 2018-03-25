const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getPackageListComment, emptyPackageListComment} from '../../../actions/evaluation.js'
const pageConfig = {
  /**
   * 页面的初始数据
   */
  data: {
    topid: 0,
    packageId:0,
    pageSize:10,
    nav:["全部","有图",'好评','低分']
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      packageId: options.packageId
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
    const { packageId, pageSize, topid, commentData} = this.data;
    if (commentData[topid].code == -1) {
      this.dispatch(getPackageListComment({
        "page.pageSize": pageSize,
        "page.currentPage":1,
        "packageId": packageId,
        type: topid
      }))
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
    this.dispatch(emptyPackageListComment())
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.dispatch(emptyPackageListComment())
    
    const { packageId, pageSize, topid, commentData } = this.data;
    this.dispatch(getPackageListComment({
        "page.pageSize": pageSize,
        "page.currentPage": 1,
        "packageId": packageId,
        type: topid
    },(res)=>{
      wx.stopPullDownRefresh()
    }))
    
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const { packageId, pageSize, topid, commentData } = this.data;
    if(commentData[topid].load){
      this.dispatch(getPackageListComment({
        "page.pageSize": pageSize,
        "page.currentPage": parseInt(commentData[topid].data.length / pageSize) +1,
        "packageId": packageId,
        type: topid
      }))
    }
    
  },
  //头部栏切换
  onchange: function (e) {
    let id = e.currentTarget.dataset.id
    const { packageId, pageSize, topid, commentData } = this.data;
    if (commentData[id].code == -1) {
      this.dispatch(getPackageListComment({
        "page.pageSize": pageSize,
        "page.currentPage": 1,
        "packageId": packageId,
        type: id
      }))
    }
    this.setData({
      topid: id
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}

function mapStateToProps(state) {
  let { all, hasimage, good, bad} =  state.packageComment.toJS();
  let commentData = [all, hasimage, good, bad]
  return {
    shopInfo: state.shopInfo.toJS(),
    commentData: commentData
  }
}
Page(connect(mapStateToProps)(pageConfig))