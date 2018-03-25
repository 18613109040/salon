import { wxRequest } from 'fetch'
export const GET_USER_INFO = "GET_USER_INFO"
export const ACCOUNT_CLEAR = 'ACCOUNT_CLEAR'
/**
 * 获取用户信息
 */
export function getUserInfo(option) {
  return dispatch => {
    wxRequest({
      url: "api/user/get",
      data:option
    }).then(result => {
      console.log(result)
      if (result.errorCode == 0) {
        return dispatch({
          type: GET_USER_INFO,
          json: result
        })
      }
    })
  }
}
//编辑用户信息
export function saveUserInfo(option, cb = () => { }) {
  return dispatch => {
    wxRequest({
      url: 'api/user/updateUser',
      data: option,
      method: "POST"
    }).then(({ result, errorCode }) => {
      cb(result)
    })

  }
}
//退出登陆
export function longinOut(option, cb = () => { }) {
  return dispatch => {
    wxRequest({
      url: 'api/user/removeXcxUser',
      data: option,
    }).then((result) => {
      cb(result)
      return dispatch({
        type: ACCOUNT_CLEAR
      })
    })
  }
}

//发送验证码
export function sendCode(option,cb=()=>{}) {
  wxRequest({
    url: 'sms/registerCode',
    data: option,
    method:"POST"
  }).then(res => {
    cb(res)
  })
}
//微信电话号码注册
export function registerXcxPhone(option, cb = () => { }) {
  wxRequest({
    url: 'wechat/registerXcxPhone',
    data: option,
    method: "POST",
    filter: true,
  }).then((result) => {
    cb(result)
  })
}
//用户注册
export function register(option, cb = () => { }) {
  wxRequest({
    url: 'wechat/wechatRegister',
    data: option,
    method: "POST"
  }).then(result => {
    cb(result)
  })
}
//提交意见反馈
export function addReport(option, cb = () => { }) {
  wxRequest({
    url: 'api/report/add',
    data: option,
    method: "POST"
  }).then(result => {
    cb(result)
  })
}

//问题详细内容
export function getProblemById(option, cb = () => { }) {
  wxRequest({
    url: 'article/getById',
    data: option
  }).then(result => {
    cb(result)
  })
}