import {
  GET_USER_INFO,
  ACCOUNT_CLEAR
} from '../actions/account.js'
import { fromJS } from '../libs/immutable'
const userInfoInit = {
  nickName: '您还没有登录/点击登录',
  avatarUrl: '../../images/avatar.png',
  code: -1
}
export function userInfo(state = userInfoInit, action) {
  let json = action.json
  switch (action.type) {
    case GET_USER_INFO:
      if (json.errorCode == 0) {
        json.result["code"] = json.errorCode;
        return fromJS(json.result);
      } else {
        return fromJS(userInfoInit)
      }
    case ACCOUNT_CLEAR:
      return fromJS({
        nickName: '您还没有登录/点击登录',
        avatarUrl: '../../images/avatar.png',
        code: -1
      })
    default:
      return fromJS(state)

  }
}

