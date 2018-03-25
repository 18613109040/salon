import { wxRequest } from 'fetch'
export const GET_PACKAGE_LIST_COMMENT = "GET_PACKAGE_LIST_COMMENT"
export const EMPTY_PACKAGE_LIST_COMMENT = "EMPTY_PACKAGE_LIST_COMMENT"
export const GET_BARBER_PACKAGE_LIST_COMMENT = "GET_BARBER_PACKAGE_LIST_COMMENT"
export const EMPTY_BARBER_PACKAGE_LIST_COMMENT = "EMPTY_BARBER_PACKAGE_LIST_COMMENT"

//获取套餐评价列表
export function getPackageListComment(option, cb = () => { }) {
  return dispatch => {
    wxRequest({
      url: `beauty/package/listComment`,
      data: option,
    }).then((json) => {
      cb()
      return dispatch({
        type: GET_PACKAGE_LIST_COMMENT,
        json: {
          data: json.result,
          status: option.type
        }
      })
    })
  }
}

//清空套餐评价列表
export function emptyPackageListComment(json) {
  return {
    type: EMPTY_PACKAGE_LIST_COMMENT,
    json
  }
}

//获取美发师评价列表
export function getBarberPackageListComment(option, cb = () => { }) {
  return dispatch => {
    wxRequest({
      url: `beauty/server/listServerComment`,
      data: option,
    }).then((json) => {
      cb()
      return dispatch({
        type: GET_BARBER_PACKAGE_LIST_COMMENT,
        json: {
          data: json.result,
          status: option.type
        }
      })
    })
  }
}
//清空套餐评价列表
export function emptyBarberPackageListComment(json) {
  return {
    type: EMPTY_BARBER_PACKAGE_LIST_COMMENT,
    json
  }
}
