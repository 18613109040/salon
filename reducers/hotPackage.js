import {
  GET_HOT_PACKAGE_LIST, EMPTY_HOT_PACKAGE_LIST, GET_PACKAGE_DETAIL, GET_PACKAGE_SKU_LIST, CLICK_PACKAGE_SKU, UPDATA_PACK_DETAIL
} from '../actions/hotPackage.js'
import { fromJS } from '../libs/immutable'
import { arrayToRepeat} from '../utils/util.js'
export function hotPackageList(state = {
  data:[],
  totalCount:0,
  totalPage:0,
  load:true
}, action) {
  let json = action.json
  switch (action.type) {
    case GET_HOT_PACKAGE_LIST:
      let temState = state.toJS();
      let load = true;
      let data = [].concat(temState.data, json.result.data||[]);
      console.dir(data);
      if (data.length < json.result.totalCount){
        load = true
      }else{
        load = false
      }
      return fromJS({
        data: data,
          totalCount: json.result.totalCount,
          totalPage: json.result.totalPage,
          load: load
        })
    case EMPTY_HOT_PACKAGE_LIST:
      return fromJS({
        data: [],
        totalCount:0,
        totalPage: 0,
        load: true
      })
    default:
      return fromJS(state)

  }
}
export function packageDetail(state = { hasCollect:false}, action) {
  let json = action.json
  switch (action.type) {
    case GET_PACKAGE_DETAIL:
      let imgUrl = [];
      let detail = [];
      if (json.result.imgUrl) {
        imgUrl = JSON.parse(json.result.imgUrl);
      }
      if (json.result.detail){
        detail = JSON.parse(json.result.detail);
      }

      return fromJS(Object.assign({}, json.result, { imgUrl: imgUrl }, { detail: detail }))
    case UPDATA_PACK_DETAIL:
      return fromJS(Object.assign({}, state.toJS(), { skuId: json.skuId, skuValue: json.skuValue}))
    default:
      return fromJS(state)

  }
}

export function skuList(state = [], action) {
  let json = action.json;
  switch (action.type) {
    case GET_PACKAGE_SKU_LIST:
      return fromJS(json.result || []);
    default:
      return fromJS(state)
  }
}
export function packageSku(state = [], action) {
  let json = action.json
  switch (action.type) {
    case GET_PACKAGE_SKU_LIST:
      let skuList = json.result;
      if (skuList){
        let obj = {};
        //set 去重
        skuList.map((item) => {
          let array = item.attrValues.split(";");
          array.map(it => {
            if (!obj[it.split(":")[0]]) {
              obj[it.split(":")[0]] = [];
              obj[it.split(":")[0]].push(it.split(":")[1])
            }

            obj[it.split(":")[0]].push(it.split(":")[1]);
          })
        })
        Object.keys(obj).map(item => {
          obj[item] = arrayToRepeat(obj[item])
        })
        //转换成数组
        let temarray = [];
        Object.keys(obj).map((item) => {
          let nameArrray = [];
          obj[item].map((it, index) => {
            // if (index == 0) {
            //   nameArrray.push({ name: it, select: true, ishas: true })
            // } else {
              nameArrray.push({ name: it, select: false, ishas: true })
            //}

          })
          temarray.push({ title: item, value: nameArrray })
        })
        return fromJS(temarray)
      }
    case CLICK_PACKAGE_SKU:
      let tempState = state.toJS();
      const { id, data } = json;
      let temflage = id.split("-");
      let d = tempState[temflage[0]].title + ":" + tempState[temflage[0]].value[temflage[1]].name;
      let filterData = data.filter(item => item.attrValues.includes(d))
      tempState.map((item, id) => {
        if (id.toString() !== temflage[0].toString()) {
          item.value.map(ix => {
            if (filterData.filter(ite => ite.attrValues.includes(item.title + ":" + ix.name)).length > 0) {
              ix.ishas = true;
            } else {
              ix.ishas = false;
            }
          })
        }
      })
      tempState[temflage[0]].value.map(item => item.select = false);
      tempState[temflage[0]].value[temflage[1]].select = true;
      return fromJS(tempState);
    default:
      return fromJS(state);

  }
}

