import {
  GET_PACKAGE_LIST_COMMENT, EMPTY_PACKAGE_LIST_COMMENT, GET_BARBER_PACKAGE_LIST_COMMENT, EMPTY_BARBER_PACKAGE_LIST_COMMENT
} from '../actions/evaluation.js'
import { fromJS } from '../libs/immutable'
const inintData = {
  "all": {
    data: [],
    totalCount: 0,
    load: true,
    code: -1
  },
  "hasimage": {
    data: [],
    totalCount: 0,
    load: true,
    code: -1
  },
  "good": {
    data: [],
    totalCount: 0,
    load: true,
    code: -1
  },
  "bad": {
    data: [],
    totalCount: 0,
    load: true,
    code: -1
  }
}
export function packageComment(state = inintData, action) {
  let json = action.json
  switch (action.type) {
    case GET_PACKAGE_LIST_COMMENT:
     
      let arraystatus = ['all','hasimage','good','bad']
      let { status, data} = json;
      status = arraystatus[status]
      let temState = state.toJS();
      let array = []
      data.data.map(item=>{
        item.imageList = Array.from([item.commentImg1, item.commentImg2, item.commentImg3])
      })
      array = [].concat(temState[status].data, data.data)
      if (array.length < data.totalCount){
        temState[status].load = true;
      }else{
        temState[status].load = false;
      }
      temState[status].data = array;
      temState[status].totalCount = data.totalCount;
      temState[status].totalPage = data.totalPage;
      temState[status].code = 0
      return fromJS(temState)
    case EMPTY_PACKAGE_LIST_COMMENT:
      return fromJS(inintData)
    default:
      return fromJS(state)

  }
}


export function barberPackageComment(state = inintData, action) {
  let json = action.json
  switch (action.type) {
    case GET_BARBER_PACKAGE_LIST_COMMENT:
      let arraystatus = ['all', 'hasimage', 'good', 'bad']
      let { status, data } = json;
      status = arraystatus[status]
      let temState = state.toJS();
      let array = []
      data.data.map(item => {
        item.imageList = Array.from([item.commentImg1, item.commentImg2, item.commentImg3])
      })
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
      return fromJS(temState)
    case EMPTY_BARBER_PACKAGE_LIST_COMMENT:
      return fromJS(inintData)
    default:
      return fromJS(state)

  }
}
