const { connect } = require('../../../libs/wechat-weapp-redux.js')
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    showDesigner: false,
    showTime: false,
    selectedIndex: 5,
    designers: []
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arr = [];
    for(let i = 0; i < 15; i++){
        arr.push(['#','david'])
    }
    console.log(arr)
    this.setData({
      designers: arr
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
  showDesigner: function() {
    this.setData({
      showDesigner: true
    })
  },
  closedrawer:function(){
    this.setData({
      showDesigner: false
    })
  },
  selected:function(e) {
    let {index} = e.currentTarget.dataset;
    this.setData({
      selectedIndex: index
    })
  },
  showTime:function(){
    this.setData({
      showTime: true
    })
  },
  closeTime:function(){
    this.setData({
      showTime: false
    })
  }
}
function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))