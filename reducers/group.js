import {
  SAVE_SKU_GOODS,
} from '../actions/group'
const Immutable = require('../libs/immutable')
const { fromJS } = Immutable

export const GroupCart = (state = fromJS({}), action) => {
  if (action.type == SAVE_SKU_GOODS) {
    return fromJS(action.data)
  } else {
    return state
  }
}