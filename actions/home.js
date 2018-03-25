import { wxRequest } from 'fetch'
export const GET_HOT_RECOMMEND_PACKAGE = "GET_HOT_RECOMMEND_PACKAGE"
export const GET_EXIT = "GET_EXIT"
//获取首页热门套餐
export function getHotRecommendPackage(option){
  return dispatch => {
    wxRequest({
      url: `beauty/package/getHomePageList`,
      data: option,
    }).then((json) => {
      return dispatch({
        type: GET_HOT_RECOMMEND_PACKAGE,
        json
      })
    })
  }
}


