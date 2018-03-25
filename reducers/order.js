import {
  GET_ORDER_LIST,
  GET_RESERVATION_ORDER_DETAIL,
  EMPTY_ORDER_LIST
} from '../actions/order.js'
import { fromJS } from '../libs/immutable'
const inint = {
  all:{
    data:[],
    totalCount: 0,
    load: true,
    code: -1
  },
  paid:{
    data:[],
    totalCount: 0,
    load: true,
    code: -1
  },
  consumed:{
    data:[],
    totalCount: 0,
    load: true,
    code: -1
  },
  complete:{
    data:[],
    totalCount: 0,
    load: true,
    code: -1
  },
  cancel:{
    data: [],
    totalCount: 0,
    load: true,
    code: -1
  },
  refundSale:{
    data: [],
    totalCount: 0,
    load: true,
    code: -1
  }
}
export function orderList(state =inint, action) {
  let json = action.json
  switch (action.type) {
    case GET_ORDER_LIST:
      let arraystatus = ['all', 'paid', 'consumed', 'complete', 'cancel','refundSale']
      let { status, data } = json;
      status = arraystatus[status]
      let temState = state.toJS();
      let array = []
      array = [].concat(temState[status].data, data.data)
      if (array.length < data.totalCount) {
        temState[status].load = true;
      } else {
        temState[status].load = false;
      }
      temState[status].data = array;
      temState[status].totalCount = data.totalCount;
      temState[status].totalPage = data.totalPage;
      temState[status].code = 0
      console.dir(temState)
      return fromJS(temState)
    case EMPTY_ORDER_LIST:
      return fromJS(inint)
    default:
      return fromJS(state)

  }
}
export function reservationOrderDetail(state = {}, action) {
  let json = action.json
  switch (action.type) {
    case GET_RESERVATION_ORDER_DETAIL:
      json.result.pickCode = JSON.parse(json.result.pickCode)
      return fromJS(json.result)
    default:
      return fromJS(state)

  }
}

