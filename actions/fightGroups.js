/**
 * 团订单
 */
import { wxRequest } from 'fetch';
export const GET_PACKAGE_DETAIL = "GET_PACKAGE_DETAIL"
//获取预约名师
export function getPackageDetail(option) {
  return dispatch => {
    wxRequest({
      url: `beauty/groupPackage/detail`,
      data: option,
    }).then((json) => {
      return dispatch({
        type: GET_PACKAGE_DETAIL,
        json
      })
    })
  }
}

//获取更多拼团
export function getProcessGroupOrder(option,cb=()=>{}){
    wxRequest({
      url: `beauty/groupPackage/getActivityOrderForPage`,
      data: option,
    }).then((json) => {
      if (json.errorCode==0){
        cb(json.result)
      }
    })
}
