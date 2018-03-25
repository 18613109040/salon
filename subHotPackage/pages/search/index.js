const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { searchHotPackage } from '../../../actions/hotPackage.js'
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    searchList:[],
    pageSize:10,
    code:false,
    historyList:[],
    keyWord:"",
    load:true
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
 
    this.setData({
      historyList: (wx.getStorageSync("history") || []).length>8?wx.getStorageSync("history").slice(0, 8):wx.getStorageSync("history")||[]
    })
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

  clickTab(e){
    let { name } = e.currentTarget.dataset;
    let { shopInfo, pageSize } = this.data;
    searchHotPackage({
      keyWord: name,
      shopId: shopInfo.id,
      "page.pageSize": pageSize,
      "page.currentPage": 1
    }, (res) => {
      this.setData({
        keyWord: name,
        searchList: res.result.data || [],
        code: true,
        load: (res.result.data || []).length < res.result.totalCount ? true : false,
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let { shopInfo, pageSize, searchList, keyWord, load } = this.data;
    this.setData({
      load: false
    })
    if (load) {
      searchHotPackage({
        keyWord: keyWord,
        shopId: shopInfo.id,
        "page.pageSize": pageSize,
        "page.currentPage": parseInt(searchList.length / pageSize) + 1
      }, (res) => {
        let list = [].concat(searchList, res.result.data)
        this.setData({
          searchList: list,
          load: list.length < res.result.totalCount ? true : false
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
    
  },
  searchList(e){
    let { shopInfo, pageSize, historyList} = this.data;
    if (e.detail.value){
      historyList.unshift(e.detail.value)
      wx.setStorage({
        key: 'history',
        data: historyList
      })
      searchHotPackage({
        keyWord: e.detail.value,
        shopId: shopInfo.id,
        "page.pageSize": pageSize,
        "page.currentPage": 1
      }, (res) => {

        this.setData({
          keyWord: e.detail.value,
          searchList: res.result.data || [],
          code: true,
          load: (res.result.data || []).length < res.result.totalCount?true:false,
          historyList: historyList.length > 8 ? historyList.slice(0, 8) : historyList
        })
      })
    }else{
      this.setData({
        searchList: [],
        code: false
      })
    }
    
  }
}
function mapStateToProps(state) {
  return {
    shopInfo: state.shopInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))