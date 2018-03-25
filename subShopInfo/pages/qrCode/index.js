const { connect } = require('../../../libs/wechat-weapp-redux.js')
const promisify = require('../../../libs/promisify');
const downloadFile = promisify(wx.downloadFile);
const saveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum);
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
  
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
   * 下载图片保存到本地
   */
  downLoad(){
    downloadFile({
      url:"https://img.sibumbg.cn/G1/M00/B5/12/CixGgVmlNN2AB9YPAAAkApRB83s267.png"
    }).then(
      (res)=>{
        console.log(res)
        saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
      }
    )
  }
}
function mapStateToProps(state) {
 
  return {
    
  }
}
Page(connect(mapStateToProps)(pageConfig))