import {
  GET_SHOP_INFO, 
  GET_SHOP_IMAGES
} from '../actions/shop.js';

import { getFlatternDistance } from '../utils/util.js'
import { fromJS } from '../libs/immutable'
const inintShopInfo = wx.getStorageSync("shopInfo") || {};
export function shopInfo(state = inintShopInfo, action) {
  let json = action.json;
  switch (action.type) {
    case GET_SHOP_INFO:
      let { result } = json;
      //通过经纬度计算距离
      const app = getApp()
      let { latitude, longitude } = app.globalData.point;
      let num = getFlatternDistance(latitude, longitude, result.latitude, result.longitude);
      let distance = ""
      if (num>1000){
        distance =  (num/1000).toFixed(2)+'公里'
      }else{
        distance = parseInt(num)+'米'
      }
      result.distance = distance;
      //判断数组中是否含有轮播图
      if (state.toJS().shopImage){
        result.shopImage = state.toJS().shopImage
      }
      wx.setStorageSync("shopInfo", result)
      return fromJS(result)
    case GET_SHOP_IMAGES:
      let temState = state.toJS();
      temState.shopImage = json.result||[];
      wx.setStorageSync("shopInfo", temState)
      return fromJS(temState)
    default:
      return fromJS(state);
     
  }
}
