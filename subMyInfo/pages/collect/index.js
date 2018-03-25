const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getBeautyCollect } from '../../../actions/hotPackage.js'
import {  saveCollect } from '../../../actions/hotPackage.js'
import { confirm} from '../../../utils/util.js'
const pageConfig = {
  /**
   * 页面的初始数据
   */
  data: {
    collectData:[],
    load:true,
    pageSize:3
  },
  // 跳转到热门套餐
  hotpice(){
    wx.navigateTo({
      url: '/subHotPackage/pages/home/index',
    })
  },
  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.collectData.length==0){
      this.getData(1)
    }
   
  },
  getData(currentPage){
    let { shopInfo, pageSize, collectData } = this.data;
    getBeautyCollect({
      shopId: shopInfo.id,
      "page.currentPage": currentPage,
      "page.pageSize": pageSize
    }, (res) => {
      if (res.errorCode == 0) {
        let collect = [].concat(collectData, res.result.data)
        if (collect.length<res.result.totalCount){
          this.setData({
            collectData: collect,
            load:true
          })
        }else{
          this.setData({
            collectData: collect,
            load: false
          })
        }
        
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let { load, collectData, pageSize} = this.data;
    this.setData({
      load:false
    })
    if(load){
      this.getData(parseInt(collectData.length/pageSize)+1)
    }
  },
  deletePage(e){
    let { shopInfo } = this.data;
    let { goodsid } = e.currentTarget.dataset;
    confirm({
      content:"确定移除收藏",
      ok:()=>{
        saveCollect({
          packageId: goodsid,
          collect: false,
          shopId: shopInfo.id
        }, (res) => {
          wx.showToast({
            title: res.errorMsg,
            icon: "none"
          })
          this.setData({
            collectData:[]
          })
          this.getData(1)
        })
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