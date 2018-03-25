const Redux = require('../libs/redux.js')
const combineReducers = Redux.combineReducers;
import { shopInfo} from './shop.js'
import { userInfo} from './account.js'
import { hotRecommendPackage } from './home.js'
import { appointmentTeacher, appointmentTeacherdetail, appointmentTeacherLsit} from './beautician.js'

import { hotPackageList, packageDetail, packageSku, skuList} from './hotPackage.js'
import { packageComment, barberPackageComment} from './evaluation.js'
import { orderList, reservationOrderDetail} from './order.js'
import * as group from './group'
const todoApp = combineReducers({
  shopInfo,
  userInfo,
  hotRecommendPackage,
  hotPackageList,
  ...group,
  appointmentTeacher,
  appointmentTeacherdetail,
  appointmentTeacherLsit,
  hotPackageList,
  packageDetail,
  packageSku,
  skuList,
  packageComment,
  barberPackageComment,
  orderList,
  reservationOrderDetail
})
module.exports = todoApp