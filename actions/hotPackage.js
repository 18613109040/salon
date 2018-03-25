import { wxRequest } from 'fetch'
export const GET_HOT_PACKAGE_LIST = "GET_HOT_PACKAGE_LIST"
export const EMPTY_HOT_PACKAGE_LIST = "EMPTY_HOT_PACKAGE_LIST"
export const GET_PACKAGE_DETAIL = "GET_PACKAGE_DETAIL"
export const EMPTY_BEAUTY_COLLECT = "EMPTY_BEAUTY_COLLECT"
export const GET_PACKAGE_SKU_LIST = "GET_PACKAGE_SKU_LIST"
export const CLICK_PACKAGE_SKU = "CLICK_PACKAGE_SKU"
export const UPDATA_PACK_DETAIL = "UPDATA_PACK_DETAIL"

//获取热门套餐列表
export function getHotPackageList(option,cb=()=>{}) {
  return dispatch => {
    wxRequest({
      url: `beauty/package/getPackage`,
      data: option,
    }).then((json) => {
      cb(json)
      if (json.errorCode == 0) {
      return dispatch({
        type: GET_HOT_PACKAGE_LIST,
        json
      })
      }
    })
  }
}

//清空热门套餐列表
export function emptyHostPackageList(json){
  return {
    type: EMPTY_HOT_PACKAGE_LIST,
    json
  }
}

//热门套餐搜索
export function searchHotPackage(option, cb = () => { }){
    wxRequest({
      url: `beauty/package/searchPackageForPage`,
      data: option,
    }).then((json) => {
      cb(json)
    })
}
//获取套餐详情
export function getPackageDetail(option, cb = () => { }) {
  return dispatch => {
    wxRequest({
      url: `beauty/package/getPackageDetail`,
      data: option,
    }).then((json) => {
      cb(json)
      if (json.errorCode == 0) {
        return dispatch({
          type: GET_PACKAGE_DETAIL,
          json
        })
      }
    })
  }
}
//更新详情
export function updataPackDetail(json){
  return{
    type:UPDATA_PACK_DETAIL,
    json
  }
}
//收藏
export function saveCollect(option, cb = () => { }) {
  wxRequest({
    url: `api/beauty/collect/saveCollect`,
    data: option,
    method:"POST"
  }).then((json) => {
    cb(json)
  })
}
//获取收藏列表
export function getBeautyCollect(option, cb = () => { }) {
  wxRequest({
    url: `api/beauty/collect/page`,
    data: option,
  }).then((json) => {
    cb(json)
  })
}
//清空收藏
export function emptyBeautyCollect(json){
  return {
    type:EMPTY_BEAUTY_COLLECT,
    json
  }
}

//获取套餐sku
export function getPackageSkuList(option, cb = () => { }) {
  return dispatch => {
    wxRequest({
      url: `beauty/package/getPackageSkuList/${option.id}`,
      data: option,
    }).then((json) => {
      cb(json)
      if (json.errorCode == 0) {
        return dispatch({
          type: GET_PACKAGE_SKU_LIST,
          json
        })
      }
    })
  }
}

//点击sku 
export function clickSkuTabAction(data) {
  return {
    type: CLICK_PACKAGE_SKU,
    json: data
  }
}