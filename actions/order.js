import { wxRequest } from 'fetch'
export const  GET_ORDER_LIST = "GET_ORDER_LIST";
export const GET_RESERVATION_ORDER_DETAIL = "GET_RESERVATION_ORDER_DETAIL";
export const EMPTY_ORDER_LIST = "EMPTY_ORDER_LIST";

//提交订单
export function postOrder(option,cb=()=>{}) {
    wxRequest({
      url: `api/beauty/order/add`,
      data: option,
      method:"POST"
    }).then((json) => {
      cb(json)
    })
  
}

//我的订单
export function getOrderList(option, cb = () => { }) {
  return dispatch => {
    wxRequest({
      url: `api/beauty/order/page`,
      data: option,
    }).then((json) => {
      return dispatch({
        type: GET_ORDER_LIST,
        json:{
          data: json.result,
          status: option.queryStatus
        }
      })
    })
  }
}

export function emptyOrderList(json){
  return {
    type:EMPTY_ORDER_LIST,
    json
  }
}
//获取预约时间
export function getSubscribeTimeList(option, cb = () => { }){
  wxRequest({
    url: `beauty/package/getSubscribeTimeList/${option.id}`,
    data: option
  }).then((json) => {
    cb(json)
  })
}

//获取预约人员
export function getCanSubscribeList(option, cb = () => { }) {
  wxRequest({
    url: `beauty/server/getCanSubscribeList`,
    data: option
  }).then((json) => {
    cb(json)
  })
}

//获取预约人员值班表
export function getServerTimeList(option, cb = () => { }) {
  wxRequest({
    url: `beauty/server/serverTimeList/${option.id}`,
    data: option
  }).then((json) => {
    cb(json)
  })
}


//获取订单详情
export function getReservationOrderDetail(option, cb = () => { }){
  return dispatch => {
    wxRequest({
      url: `api/beauty/order/detail`,
      data: option,
    }).then((json) => {
      return dispatch({
        type: GET_RESERVATION_ORDER_DETAIL,
        json
      })
    })
  }
}

//微信支付
export function wxPay(option, cb = () => { }) {
  wxRequest({
    url: "api/beauty/order/pay",
    data: option,
    method: "POST"
  }).then((json)=>{
    cb(json)
  })
}

//获取评价详情
export function getOrderCommentDetail(option, cb = () => { }){
  wxRequest({
    url: `api/beauty/comment/getOrderCommentDetail`,
    data: option
  }).then((json) => {
    cb(json)
  })
}

//获取团订单详情
export function groupPackageOrderDetail(option){
  return dispatch => {
    wxRequest({
      url: `beauty/groupPackage/orderDetail/${option.id}`,
      data: option,
    }).then((json) => {
      return dispatch({
        type: GET_RESERVATION_ORDER_DETAIL,
        json
      })
    })
  }
}

//取消预约
export function cancelSubscribe(option, cb = () => { }){
  wxRequest({
    url: `api/beauty/order/cancelSubscribe`,
    data: option,
    method: "POST"
  }).then((json) => {
    cb(json)
  })
}

//取消订单
export function cancelOrder(option, cb = () => { }) {
  wxRequest({
    url: `api/beauty/order/cancel`,
    data: option,
    method: "POST"
  }).then((json) => {
    cb(json)
  })
}


//添加套餐评价
export function addPackageComment(option, cb = () => { }) {
  wxRequest({
    url: `api/beauty/comment/addPackageComment`,
    data: option,
    method: "POST"
  }).then((json) => {
    cb(json)
  })
}

//添加美容美发评价
export function addServerComment(option, cb = () => { }) {
  wxRequest({
    url: `api/beauty/comment/addServerComment`,
    data: option,
    method: "POST"
  }).then((json) => {
    cb(json)
  })
}


//获取退款券码信息
export function getRefundPickCode(option, cb = () => { }){
  wxRequest({
    url: `api/beauty/refund/getRefundPickCode/${option.id}`,
    data: option
  }).then((json) => {
    cb(json)
  })

}

//获取退款理由
export function getRefundReasonList(option, cb = () => { }) {
  wxRequest({
    url: `api/beauty/refund/getRefundReasonList`,
    data: option
  }).then((json) => {
    cb(json)
  })

}
//申请退款
export function appRefundOrder(option, cb = () => { }) {
  wxRequest({
    url: `api/beauty/refund/appRefundOrder`,
    data: option,
    method: "POST"
  }).then((json) => {
    cb(json)
  })

}