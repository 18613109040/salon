import { GET_APPOINTMENT_TEACHER, GET_APPOINTMENT_TEACHER_DETAIL,GET_APPOINTMENT_TEACHER_LIST} from '../actions/beautician.js'
import { fromJS } from '../libs/immutable'

const inint = wx.getStorageSync("appointteacher") || [];
export function appointmentTeacher(state = inint, action) {
  let json = action.json
  switch (action.type) {
    case GET_APPOINTMENT_TEACHER:
      wx.setStorageSync("appointteacher", json.result)
      return fromJS(json.result)
    default:
      return fromJS(state)
  }
}

export function appointmentTeacherLsit(state = [], action) {
  let json = action.json
  switch (action.type) {
    case GET_APPOINTMENT_TEACHER_LIST:
     
      json.result.data.map(item=>{
        item.labels = JSON.parse(item.labels)
      })
      return fromJS(json.result.data || [])
    default:
      return fromJS(state)
  }
}

//名师详情
export function appointmentTeacherdetail(state = [], action) {
  let json = action.json
  switch (action.type) {
    case GET_APPOINTMENT_TEACHER_DETAIL:   
      json.result.labels = JSON.parse(json.result.labels)
      json.result.opus = JSON.parse(json.result.opus)
      return fromJS(json.result)
    default:
      return fromJS(state)
  }
}

