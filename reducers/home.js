import {
  GET_HOT_RECOMMEND_PACKAGE,

} from '../actions/home.js'
import { fromJS } from '../libs/immutable'
const inint = wx.getStorageSync("hotRecommend") || [];
export function hotRecommendPackage(state = inint, action) {
  let json = action.json
  switch (action.type) {
    case GET_HOT_RECOMMEND_PACKAGE:
      wx.setStorageSync("hotRecommend", json.result)
      return fromJS(json.result)
    default:
      return fromJS(state)

  }
}


