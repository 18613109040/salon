const { connect } = require('../../../libs/wechat-weapp-redux.js')
const promisify = require('../../../libs/promisify');
const downloadFile = promisify(wx.downloadFile);
const saveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum);
import { getcreateWxaqrcode} from '../../../actions/shop.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    image:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { shopInfo } = this.data;
    this.dispatch(getcreateWxaqrcode({
      id: shopInfo.id
    }, (res) => {
      this.setData({
        image: res.result
      })
      this.ctx = wx.createCanvasContext('canvas');
      this.ctx.drawImage(res.result, 0, 0, 300, 300)
      this.ctx.draw()
    }))
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
  onShareAppMessage(res) {
    let { shopInfo, goodId } = this.data;
    if (res.from === 'button') {
      // 来自页面内转发按
    }
    return {
      title: shopInfo.name,
      path: `/subShopInfo/pages/qrCode/index`,
      success: function (res) {
        // 转发成功
        console.debug(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }

},
  /**
   * 下载图片保存到本地
   */
  downLoad(){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.canvasToTempFilePath({
                canvasId: 'canvas',
                success: (resd)=> {
                  saveImageToPhotosAlbum({
                    filePath: resd.tempFilePath
                  })
                }
              })
            }
          })
        }
      }
    })
    
  }
}
function mapStateToProps(state) {
 
  return {
    shopInfo: state.shopInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))