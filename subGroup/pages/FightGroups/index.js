// subGroup/pages/FightGroups/index.js
import {
  groupPackageList
} from '../../../actions/group'
const { connect } = require('../../../libs/wechat-weapp-redux.js')
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    currentPage:1,
    loading : false, // 是否加载中
    loadmore : true, // 是否下一页
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getList()
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
    this.getList()
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
  // 获取列表
  getList(){
    let {shopInfo,loadmore,loading,currentPage} = this.data
    if(loading||!loadmore) return 
    this.data.loading = true
    groupPackageList({
      shopId:shopInfo.id||4,
      'page.currentPage':currentPage
    },(res)=>{
      if(currentPage>=res.totalPage) this.data.loadmore = false
      this.setData({
        list:res.data
      })
      this.data.loading = false
      this.data.currentPage++
    })
  },
  onchange(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      id: id
    })
  },
  goOffered(e){
    let {item} = e.currentTarget.dataset
    // wx.navigateTo({
    //   url: `/subGroup/pages/Collagedetails/index?id=${item.id}`,
    // })
    wx.navigateTo({
      url: `/subFightGroups/pages/home/index?id=${item.id}`,
    })
  }
}

function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo,
  }
}
Page(connect(mapStateToProps)(pageConfig))