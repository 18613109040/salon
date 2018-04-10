const { Provider } = require('./libs/wechat-weapp-redux.js');
const configureStore = require('./store/configureStore.js');
import { getLocation } from './utils/util.js'
import { getShopInfo } from './actions/shop.js'
App(Provider(configureStore())({
  onLaunch() {

    //初始入口获取店铺信息
    wx.getExtConfig({
      success: (res) => {
        let { shopId } = res.extConfig
        this.getShopDetail(shopId)
      }
    })
  },

  //获取店铺详情
  getShopDetail(shopId) {
    getLocation((res) => {
      const { latitude, longitude } = res;
      this.globalData.point = {
        latitude: latitude,
        longitude: longitude
      }
      this.store.dispatch(getShopInfo({
          shopId: shopId,
          longitude: longitude,
          latitude: latitude
      }))
    })
  },
  globalData: {
    userInfo: null,
    color: '#FF7920',
    point: {
      latitude: 0,
      longitude: 0
    }
  }
}))
