const { connect } = require('../../../libs/wechat-weapp-redux.js')
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    id: "-1",
    showid:0
  },
  opentext(e){
    let id = e.currentTarget.dataset.id
    console.log(id)
      this.setData({
         
          showid: showid,
      })
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
  onchange(e){
    let showid = e.currentTarget.dataset.id
    this.setData({
      showid: showid
    })
  }
}

function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo,
  }
}
Page(connect(mapStateToProps)(pageConfig))