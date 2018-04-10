import { getPackageDetail, getProcessGroupOrder} from '../../../actions/fightGroups.js'
const { connect } = require('../../../libs/wechat-weapp-redux.js')
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    activityId:"",
    showModel:false,
    showJoin:false,
    listGroup:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId: options.id
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
    const { activityId} = this.data;
    this.dispatch(getPackageDetail({
      activityId: activityId
    }))
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
  //点击查看团详情
  clickMoreGroup(){
    const { activityId } = this.data;
    getProcessGroupOrder({
      activityId: activityId,
      "page.currentPage":1,
      "page.pageSize":10
    },(res)=>{
      this.setData({
        listGroup:res.data
      })
    })
    this.setData({
      showModel:true
    })
  },
  joinGroup(e){
    console.dir(e);
    this.setData({
      showJoin:true
    })
  }
}

function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS(),
    userInfo: state.userInfo.toJS(),
    getPackageDetail: state.getPackageDetail.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))