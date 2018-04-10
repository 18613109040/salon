import { wxRequest } from 'fetch'
export const GET_APPOINTMENT_TEACHER = "GET_APPOINTMENT_TEACHER"
export const GET_APPOINTMENT_TEACHER_DETAIL = "GET_APPOINTMENT_TEACHER_DETAIL"
export const GET_APPOINTMENT_TEACHER_LIST = "GET_APPOINTMENT_TEACHER_LIST"

//获取预约名师
export function getAppointmentTeacher(option) {
  return dispatch => {
    wxRequest({
      url: `beauty/server/homeList`,
      data: option,
    }).then((json) => {
      return dispatch({
        type: GET_APPOINTMENT_TEACHER,
        json
      })
    })
  }
}



//获取名师列表
export function getAppointmentTeacherList(option) {
  return dispatch => {
    wxRequest({
      url: `beauty/server/page`,
      data: option,
    }).then((json) => {
      return dispatch({
        type: GET_APPOINTMENT_TEACHER_LIST,
        json
      })
    })
  }
}

//获取名师详情
export function getAppointmentTeacherDetail(option,cb=()=>{}) {
  return dispatch => {
    wxRequest({
      url: `beauty/server/detail/${option.id}`,
      data: option,
    }).then((json) => {
      cb(json)
      return dispatch({
        type: GET_APPOINTMENT_TEACHER_DETAIL,
        json
      })
    })
  }
}