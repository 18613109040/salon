import { host } from '../config.js'
const promisify = require('../libs/promisify')
const request = promisify(wx.request);
const checkSession = promisify(wx.checkSession)
const WxLogin = promisify(wx.login)
//用户超时 通过code 换取openid
function vaildation(filter) {
  WxLogin().then(res => {
    var shopInfo = wx.getStorageSync('shopInfo')
    console.dir(shopInfo)
    if (res.code) {
      request({
        url: `${host}/wechat/wxcomponent_login`,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          code: res.code,
          shopId: shopInfo.id
        },
        filter: filter,
      }).then(response => {
        let data = response.data;
        if (data.result) {
          wx.setStorageSync("openid", data.result.openid);
          wx.setStorageSync("token", data.result.token);
          wx.setStorageSync("uid", data.result.uid);
          wx.setStorageSync("thridSessionKey", data.result.thridSessionKey)
        }
        wx.removeStorageSync('userInfo')
        if (!filter) {
          wx.navigateTo({
            url: '/pages/login/index'
          })
        }
      })
    }
  })
}

//thridSessionKey 超时
function wxLoginThridSessionKey(filter) {
  checkSession().then(res => {
    request({
      url: `${host}/wechat/wxlogin_thridSessionKey`,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        thridSessionKey: wx.getStorageSync("thridSessionKey")
      },
      filter: filter
    }).then(response => {
      let resp = response.data;
      //用户已登录 
      if (resp.errorCode == 0) {
        wx.setStorageSync("openid", resp.result.openid);
        wx.setStorageSync("token", resp.result.token);
        wx.setStorageSync("uid", resp.result.uid);
        wx.removeStorageSync('userInfo')
        if (!filter) {
          wx.navigateTo({
            url: '/pages/login/index'
          })
        }
      } else if (resp.errorCode == 1) {
        wx.setStorageSync("openid", result.openid);
      } else {
        vaildation(filter)
      }
      })
  })
}

export function wxRequest(options) {
  let token = wx.getStorageSync('token');
  let uid = wx.getStorageSync('uid')
  let params = {
    url: `${host}/${options.url}`,
    data: options.data,
    method: options.method || 'GET',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      "Shop-Token": token,
      "Shop-UID": uid,
      ...options.header
    }
  }
  return new Promise((resolve, reject) => {
    wx.request(
      Object.assign({
        ...params,
        success: (res) => {
          wx.hideLoading()
          const data = res.data;
          const filter = options.data && options.data.filter;
         
          //api拦截请求
          if (data.errorCode == 1) {
            // @thridSessionKey 验证thridSessionKey是否有效
            if (wx.getStorageSync("thridSessionKey")) {
              wxLoginThridSessionKey(filter);
            } else {
              //用户超时 重新校验
              console.dir(filter)
              vaildation(filter)
            }
          } else if (data.errorCode != 0) {
            if (!filter) {
              wx.showToast({
                title: data.errorMsg,
                icon: 'none',
                duration: 2000
              })
            }
          }else 
            resolve(res.data)
        },
        fail: reject
      })
    )
  })
}


