const { connect } = require('../../../libs/wechat-weapp-redux.js')

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
    // setTimeout(()=>{
    //   let { appointmentTeacherdetail } = this.data;
    //   console.dir(appointmentTeacherdetail)
    //   this.ctx = wx.createCanvasContext('canvas')
    //   this.ctx.beginPath();
    //   this.ctx.drawImage(appointmentTeacherdetail.imgUrl, 0, 0, 100, 100)
    //   this.ctx.arc(50, 50, 50, 0, 2 * Math.PI);
    //   this.ctx.stroke();
    //   this.ctx.draw()
    //   wx.canvasToTempFilePath({
    //     canvasId: 'canvas',
    //     success: (res) => {
    //       this.images = res.tempFilePath;
    //     }
    //   })
    // },4000)
    
     
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
    // 评论
  gotojudge(){
    let { appointmentTeacherdetail } = this.data;
    wx.navigateTo({
      url: `/subreservation/pages/evaluation/index?serverId=${appointmentTeacherdetail.serverId}&name=${appointmentTeacherdetail.serverName}`
    })
  },
  returnHome(){
   
    wx.switchTab({
      url: '/pages/home/index',
    })
  },
  //客服
  gotocustom() {
    wx.navigateTo({
      url: ''
    })
  },
  // 预约
  gotobespoke() {

    wx.navigateTo({
      url: '/subreservation/pages/bespoke/index'
    })

  },
  lookImage(e){
    let index = e.currentTarget.dataset.index;
    let { appointmentTeacherdetail } = this.data;
    wx.previewImage({
      current: appointmentTeacherdetail.opus[index || 0], // 当前显示图片的http链接
      urls: appointmentTeacherdetail.opus// 需要预览的图片http链接列表
    })
  },
  onShareAppMessage: function () {
    // let { shopInfo, goodId } = this.data;
    // if (res.from === 'button') {
    //   // 来自页面内转发按
    // }
    // return {
    //   title: shopInfo.name,
    //   path: `/subreservation/pages/character/index?id=${goodId}`,
    //   success: function (res) {
    //     // 转发成功
    //     console.debug(res)
    //   },
    //   fail: function (res) {
    //     // 转发失败
    //   }
    // }

  }
}

function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS(),
    appointmentTeacherdetail: state.appointmentTeacherdetail.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))