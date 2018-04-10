import { wxRequest } from 'fetch'
export const GET_SHOP_INFO = 'GET_SHOP_INFO'
export const GET_SHOP_IMAGES = 'GET_SHOP_IMAGES'
export const GET_CREATE_WX_AQRCODE = 'GET_CREATE_WX_AQRCODE'

// 获取店铺信息
export function getShopInfo(option) {
  return dispatch => {
    wxRequest({
      url: `shop/getById`,
      data: option,
    }).then((json) => {
      if (json.errorCode == 0) {
        return dispatch({
          type: GET_SHOP_INFO,
          json
        })
      }
    })
  }
}

//店铺商品轮播
export function getShopImages(option) {
  return dispatch => {
    wxRequest({
      url: `shop/getShopImages`,
      data: option,
    }).then((json) => {
      if (json.errorCode == 0){
        return dispatch({
          type: GET_SHOP_IMAGES,
          json
        })
      }
      
    })
  }
}


//获取店铺二维码
export function getcreateWxaqrcode(option,cb=()=>{}){
  return dispatch => {
    wxRequest({
      url: `shop/createWxaqrcode/${option.id}`
    }).then((json) => {
      cb(json)
      if (json.errorCode == 0) {
        return dispatch({
          type: GET_CREATE_WX_AQRCODE,
          json
        })
      }

    })
  }
}