const { connect } = require('../../../libs/wechat-weapp-redux.js')
import { getGroupOrderDetail} from '../../../actions/group.js'
const { leftTimer } = require("../../../utils/util")
const pageConfig = {


  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    groupDetail:{},
    time:0
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let {id} = this.data;
    getGroupOrderDetail({
      id:id
    },(res)=>{
      
      let time  = leftTimer(res.groupSuccessTime)
      this.setData({
        time:time
      })
      this.timeInterVal = setInterval(()=>{
        
        let times= leftTimer(res.groupSuccessTime)
        if (!times) {
          clearInterval(this.timeInterVal)
        }
        this.setData({
          time: times
        })
      },1000)
      this.setData({
        groupDetail:res
      })
    })
  },
  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {
    clearInterval(this.timeInterVal)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let { groupDetail } = this.data;
    if (res.from === 'button') {
      // 来自页面内转发按
    }
    return {
      title: groupDetail.memberName,
      path: `/subGroup/pages/Collagedetails/index?id=${groupDetail.groupActivityId}`,
      success: function (res) {
        // 转发成功
        console.debug(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
}
function mapStateToProps(state) {

  return {
    shopInfo: state.shopInfo.toJS(),
    userInfo: state.userInfo.toJS()
  }
}
Page(connect(mapStateToProps)(pageConfig))