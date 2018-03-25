// subGroup/pages/home/index.js
const { connect } = require('../../../libs/wechat-weapp-redux.js')
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    pickcard:[
      {
        title:"拼团",
        nums:'2000',
        img:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      },
      {
        title: "砍价",
        nums: '453',
        img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
      },
      {
        title: "秒杀",
        nums: '4573',
        img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      }
      
    ]
  },
  onMore(){
    wx.navigateTo({
      url: '/subGroup/pages/FightGroups/index',
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
  onchange(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      id: id
    })
  }
}

function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo,
  }
}
Page(connect(mapStateToProps)(pageConfig))