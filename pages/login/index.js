
import{
  sendCode,
  register,
  registerXcxPhone
} from '../../actions/account'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    verifyCode:"",
    name:"获取验证码",
    disabled:false,
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {

  },

  changeImput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  //验证吗
  changeverifyCode(e){
    this.setData({
      verifyCode: e.detail.value
    })
  },
  //绑定手机号
  bindCode(){
    let openid = wx.getStorageSync("openid");
    let {phone,verifyCode} = this.data
    let re = /^1\d{10}$/;
    if(!re.test(phone)){
      wx.showToast({
        title: '请输入正确的手机号码',
        icon:"none"
      })
      return
    }
    if(!verifyCode){
      wx.showToast({
        title: '请输入验证码',
        icon: "none"
      })
      return
    } 
    register({
          phone: this.data.phone,
          verifyCode: this.data.verifyCode,
          openId: openid
        },
        ({errorCode,result,errorMsg})=>{
          if(errorCode==0){ 
            wx.setStorageSync("token", result.token);
            wx.setStorageSync("uid", result.uid);
            wx.navigateBack();
            // wx.switchTab({
            //   url: "/pages/account/index",
            // })
          }else{
            wx.showToast({
              title: errorMsg,
              icon:"none",
              duration: 2000
            })
          }
        })
    
  },
  onUnload(){
    this.timer&&clearInterval(this.timer);
  },
  //获取手机验证码
  getCode(){
    let {phone} = this.data
    let re = /^1\d{10}$/
    if (!phone||!re.test(phone)){
      wx.showToast({
        title: '请输入正确的电话号码',
        icon: "none"
      })
      return;
    }
    this.setData({
      disabled:true
    })
    let time = 60;
    this.timer =  setInterval((res)=>{
      if(time==1){
        this.setData({
          name: "获取验证码",
          disabled: false
        })
        clearInterval(this.timer);
        return;
      }
      time--
      this.setData({
        name: `${time}秒`
      })
    },1000)
    sendCode({
      phone: phone
    },(res)=>{
      console.dir(res)
      if (res.errorCode == 0){

        wx.showToast({
          title: res.errorMsg,
          icon: "none"
        })
      }
    })
  },
  //微信一键登录
  getPhoneNumber: function (e) {
    registerXcxPhone({
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        thridSessionKey: wx.getStorageSync("thridSessionKey")
      },(res) => {
        if (res.errorCode == 0) {
      
          wx.setStorageSync("openid", res.result.openid);
          wx.setStorageSync("token", res.result.token);
          wx.setStorageSync("uid", res.result.uid);
          wx.navigateBack();
        } 
      }
    )
  }
})