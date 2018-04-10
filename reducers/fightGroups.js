import { GET_PACKAGE_DETAIL } from '../actions/fightGroups.js'
import { fromJS } from '../libs/immutable'
export function getPackageDetail(state = {}, action) {
  let json = action.json
  switch (action.type) {
    case GET_PACKAGE_DETAIL:
      if (json.result.detail)
        json.result.detail = JSON.parse(json.result.detail)
      return fromJS(json.result)
    default:
      return fromJS(state)
  }
}
