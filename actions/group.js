import { wxRequest } from 'fetch'
export const SAVE_SKU_GOODS = 'SAVE_SKU_GOODS'

/*
// 测试用sku数据
let data = {"errorCode":0,"errorMsg":"成功","result":[{"attrIds":"001:2;13604:9608","attrValues":"拼团人数:2人团;回合肥:黄家驹","groupActivityId":192,"groupMembers":2,"groupPirce":0.01,"id":736,"imgUrl":null,"price":0.50,"singlePrice":0.50,"skuId":42872,"skuSalenum":0,"skuStock":9999},{"attrIds":"001:5;13604:9604","attrValues":"拼团人数:5人团;回合肥:发广告","groupActivityId":192,"groupMembers":5,"groupPirce":0.01,"id":740,"imgUrl":null,"price":0.50,"singlePrice":0.50,"skuId":42868,"skuSalenum":2,"skuStock":9998},{"attrIds":"001:5;13604:9608","attrValues":"拼团人数:5人团;回合肥:黄家驹","groupActivityId":192,"groupMembers":5,"groupPirce":0.01,"id":744,"imgUrl":null,"price":0.50,"singlePrice":0.50,"skuId":42872,"skuSalenum":0,"skuStock":9999},{"attrIds":"001:6;13604:9608","attrValues":"拼团人数:6人团;回合肥:黄家驹","groupActivityId":192,"groupMembers":6,"groupPirce":0.01,"id":748,"imgUrl":null,"price":0.50,"singlePrice":0.50,"skuId":42872,"skuSalenum":0,"skuStock":9999}],"success":true}
let json = data.result
*/
const combinationSku = (json) => {
  let obj = {};
  //set 去重
  json.map((item) => {
    let array = item.attrValues.split(";");
    array.map(it => {
      if (!obj[it.split(":")[0]]) {
        obj[it.split(":")[0]] = new Set();
      }
      obj[it.split(":")[0]].add(it.split(":")[1]);
    })
  })
  // 组合好的sku数据
  let skuArray = Object.keys(obj)
  let firstTitle = skuArray[0]
  let firstArray = Array.from(obj[firstTitle])
  let comSkuArray = []
  let list = firstArray.map((f, index) => {
    let ishas = true
    let firstKey = firstTitle + ":" + f
    for (let i = 1; i < skuArray.length; i++) {
      let key = skuArray[i]
      let arr = Array.from(obj[key])
      ishas = arr.every(it => {
        let str = firstKey + ";" + key + ':' + it
        return json.findIndex(ix => str == ix.attrValues) > -1
      })
    }
    return { name: f, select: index == 0, ishas: ishas }
  })
  comSkuArray.push({
    title: firstTitle,
    value: list
  })
  comSkuArray = list.reduce((init, f, index) => {
    if (!f.select) return init
    let firstKey = firstTitle + ":" + f.name
    let list = Object.keys(obj).reduce((arr, item, index) => {
      if (index == 0) return arr
      let nameArrray = Array.from(obj[item]);
      let list = nameArrray.map((it, index) => {
        let str = firstKey + ";" + item + ':' + it
        return { name: it, select: index == 0, ishas: json.findIndex(ix => str == ix.attrValues) > -1 }
      })
      arr.push({ title: item, value: list })
      return arr
    }, [])
    let arr = init.concat(list)
    return arr
  }, comSkuArray)
  return comSkuArray
}

// 拼团列表
export const groupPackageList = (data,success=()=>{})=>{
	wxRequest({
		url:'beauty/groupPackage/page',
		data:data
	}).then(({errorCode,result})=>{
		if(errorCode==0) success(result)
	})
}
// 拼团详情
export const groupPackageDetail=(id,success=()=>{})=>{
	wxRequest({
		url:'beauty/groupPackage/detail',
		data:{activityId:id}
	}).then(({errorCode,result})=>{
		if(errorCode==0) success(result)
	})
}
// 开团的sku
export const groupPackageSku = (id,success=()=>{})=>{
	wxRequest({
		url:`beauty/groupPackage/sku/${id}`,
	}).then(({errorCode,result})=>{
		if(errorCode==0){
			success({
				combinationSku:combinationSku(result),
				goodsSku:result,
			})
		}
	})
}
// 查询活动的正在拼团的订单
export const groupActivityOrder=(data,success=()=>{})=>{
	wxRequest({
		url:'beauty/groupPackage/getActivityOrderForPage',
		data:data
	}).then(({errorCode,result})=>{
		if(errorCode==0) success(result)
	})
}

// 切换商品sku选项
export const onChangeSkuSelect=(id, state, data)=>{
  let attrIndex = id.split("-")[0]; // 规格的索引
  let attrIdIndex = id.split("-")[1]; // 规格值得索引

  let item = state[attrIndex]
  let { title, value } = item
  let d = title + ":" + value[attrIdIndex].name;
  let filterData = data.filter(item => item.attrValues.includes(d))
  state.map((item, index) => {
    if (index.toString() !== attrIndex.toString()) {
      item.value.map(ix => {
        if (filterData.filter(ite => ite.attrValues.includes(item.title + ":" + ix.name)).length > 0) {
          ix.ishas = true;
        } else {
          ix.ishas = false;
        }
      })
    }
  })
  state[attrIndex].value.map(item => item.select = false);
  state[attrIndex].value[attrIdIndex].select = true;
  return state
}


// 保存商品sku
export const saveSkuGoodsData=(data)=>{
  return dispatch => {
    dispatch({
      type: SAVE_SKU_GOODS,
      data: data
    })
  }
}


// 开团
export const groupOrderAdd=(data,success=()=>{})=>{
  wxRequest({
    url:'api/beauty/groupOrder/add',
    data:data,
    method:'POST',
  }).then(({errorCode,result})=>{
    if(errorCode==0) success(result)
  })
}
// 参与拼团
export const groupOrderMemberAdd=(data,success=()=>{})=>{
  wxRequest({
    url:'api/beauty/groupOrder/addGroupMember',
    data:data,
    method:'POST',
  }).then(({errorCode,result})=>{
    if(errorCode==0) success(result)
  })
}


// 查看别人团详情
export const groupMemberOrder=(id,success=()=>{})=>{
  wxRequest({
    url:`beauty/groupPackage/orderDetail/${id}`,
  }).then(({errorCode,result})=>{
    if(errorCode==0) success(result)
  })
}
// 查看团订单详情
export const groupOrderDetail=(id,success=()=>{})=>{
  wxRequest({
    url:`api/beauty/groupOrder/getGroupMemberOrder/${id}`,
  }).then(({errorCode,result})=>{
    if(errorCode==0) success(result)
  })
}

//查看团订单详情

export  function getGroupOrderDetail(option, cb = () => { }){
  wxRequest({
    url: `beauty/groupPackage/orderDetail/${option.id}`,
  }).then(({ errorCode, result }) => {
    if (errorCode == 0) cb(result)
  })
}









