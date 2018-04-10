import QQMapWX from './qqmap-wx-jssdk.min'
import { host, qqmapKey } from '../config'
const qqmap = new QQMapWX({
  key: qqmapKey
});


// 提示框
export function alert(content, callback) {
  wx.showModal({
    title: '提示',
    content: content,
    showCancel: false,
    success: callback
  })
}
export function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
export function convertTimeToStr(timeStamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let date, k, o, tmp;
  if (!timeStamp) { return false; }
  if (typeof timeStamp == 'string') {
    timeStamp = parseInt(timeStamp)
  }
  //如果是10位数,则乘以1000转换为毫秒
  if (timeStamp.toString().length == 10) {
    timeStamp = timeStamp * 1000
  }
  date = new Date(timeStamp);
  o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        tmp = RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length);
        fmt = fmt.replace(RegExp.$1, tmp);
      }
    }
  }
  return fmt
}
export function add(a, b, num) {

  let d = parseFloat(a) + parseFloat(b);
  return parseFloat(d.toFixed(num||2));
}
export function mul(a, b, num) {
  let d = parseFloat(a) - parseFloat(b);
  return parseFloat(d.toFixed(num|| 2));
}

export function leftTimer(time) {
    if (typeof time == 'string') {
      time = parseInt(time)
    }
    var leftTime = (new Date(time)) - (new Date()); //计算剩余的毫秒数 
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
    days = checkTime(days);
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    if (leftTime>0){
      if (days>0){
        return `${days}天${hours}时${minutes}分${seconds}秒`
      } else if (hours>0){
        return `${hours}时${minutes}分${seconds}秒`
      } else{
        return `${minutes}分${seconds}秒`
      }
    }
    else
      return ""
}

export function countDown(time){
  if (typeof time == 'string') {
    time = parseInt(time)
  }
  var minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟 
  var seconds = parseInt(time/ 1000 % 60, 10);//计算剩余的秒数 
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);
  if (time > 0)
    return `${minutes}:${seconds}`
  else
    return ""
}

function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
    if (i < 10)   {
        i = "0" + i;
    }
    return i;
}



// 获取当前地址
export function getCurrentAddress(callback) {

  getCurrentAddressList({
    success(addressList) {
      if (addressList.length > 0) {
        callback(addressList[0])
      }
    }
  })
}
//获取经纬度
export function getLocation(callback){
  wx.getLocation({
    type: 'gcj02',
    success(res) {
      callback(res)
    },
    fail(res) {
      if (res.errMsg == 'getLocation:fail auth deny' && wx.openSetting) {
        confirm({
          content: '若不授权地理位置权限, 则无法正常使用, 请重新授权地理位置权限',
          cancelText: '不授权',
          confirmText: '授权',
          ok() {
            wx.openSetting({
              success(res) {
                if (res.authSetting['scope.userLocation']) {
                  getLocation(callback)
                } else {
                  alert('获取用户地址失败')
                }
              }
            })
          }
        })
      } else {
        alert('获取用户地址失败')
      }

    }
  })
}
// 获取当前地理位置
export function getCurrentAddressList(options) {
  const {
    success, complete
  } = options
  wx.getLocation({
    type: 'gcj02',
    success(res) {
      getAddressFromLocation({
        location: {
          latitude: res.latitude,
          longitude: res.longitude,
        },
        success, complete
      })
    },
    fail(res) {
      if (res.errMsg == 'getLocation:fail auth deny' && wx.openSetting) {
        confirm({
          content: '若不授权地理位置权限, 则无法正常使用, 请重新授权地理位置权限',
          cancelText: '不授权',
          confirmText: '授权',
          ok() {
            wx.openSetting({
              success(res) {
                console.log(res)
                if (res.authSetting['scope.userLocation']) {
                  getCurrentAddressList(options)
                } else {
                  alert('获取用户地址失败')
                }
              }
            })
          }
        })
      } else {
        alert('获取用户地址失败')
      }

    }
  })
}
// 根据坐标获取地址信息
export function getAddressFromLocation(options) {
  const { location, success } = options
  getPois({
    location,
    success(pois) {
      var addressList = []
      pois.forEach(poi => {
        var {
          title, location,
          address, ad_info
        } = poi
        addressList.push(Object.assign({
          title, location, address
        }, resolveAdInfo(ad_info)))
      })
      success && success(addressList)
    }
  })
}

// 获取兴趣点
export function getPois(options) {
  const {
    location, success, complete
  } = options
  qqmap.reverseGeocoder({
    location,
    get_poi: 1,
    success: function (res) {
      success && success(res.result.pois)
    },
    fail: function (err) {
      console.log(err)
    },
    complete
  })
}
//关键子输入提示
export function getKeyAdress(options, cb) {
  qqmap.getSuggestion({
    keyword: options.value,
    region: options.region,
    policy: 1,
    success: function (res) {
      cb(res);
    },
    fail: function (res) {

    },
    complete: function (res) {

    }
  });
}
export function getSearchAdress(options, cb) {
  qqmap.search({
    keyword: options.key,
    location: {
      latitude: options.location.lat,
      longitude: options.location.lng
    },
    page_size: 10,
    page_index: options.pageIndex,
    success: function (res) {
      cb(res);
    },
    fail: function (res) {
      console.dir(res)
    },
    complete: function (res) {
      console.dir(res)
    }
  });
}
// 确认框
export function confirm(options) {
  var {
    content, confirmText, cancelText,
    ok,
  } = options
  confirmText = confirmText || '确定'
  cancelText = cancelText || '取消'
  wx.showModal({
    content,
    confirmText,
    cancelText,
    confirmColor: '#ff7920',
    success(res) {
      if (res.confirm) {
        ok && ok()
      }
    }
  })
}
function resolveAdInfo(adInfo) {
  const { city, district, adcode } = adInfo
  return {
    city, district,
    district_id: adcode,
    city_id: adcode.replace(/\d{2}$/, '00')
  }
}


/***
 * 根据经纬度计算距离
 */

const EARTH_RADIUS = 6378137.0;    //单位M
const PI = Math.PI;

function getRad(d) {
  return d * PI / 180.0;
}
export function getFlatternDistance(lat1, lng1, lat2, lng2) {
  var f = getRad((lat1 + lat2) / 2);
  var g = getRad((lat1 - lat2) / 2);
  var l = getRad((lng1 - lng2) / 2);

  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);

  var s, c, w, r, d, h1, h2;
  var a = EARTH_RADIUS;
  var fl = 1 / 298.257;

  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;

  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;

  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;

  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}

/**
 * 数组去重
 */
export function arrayToRepeat(data=[]){
  var obj = {};
  var newArray=[];
  for(var i=0;i<data.length;i++){
    if(!obj[data[i]]){
      obj[data[i]] = data[i]
      newArray.push(data[i])
    }
  }
  return newArray;
 


}