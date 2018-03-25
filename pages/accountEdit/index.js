import {
  saveUserInfo,
  getUserInfo
} from '../../actions/account'
import weCropper from '../../components/weCropper/weCropper.js'
import * as wxApi from '../../utils/wxApi.js'
const promisify = require('../../libs/promisify')
const getSystemInfo = promisify(wx.getSystemInfo)
const getWxUserInfo = promisify(wx.getUserInfo)
const chooseImage = promisify(wx.chooseImage)
const { connect } = require('../../libs/wechat-weapp-redux.js')
var app = getApp();
const pageConfig = {

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    actionSheetItems: ['相机拍摄', '相册'],
    show: false,
    color: app.globalData.color,
    greycolor: app.globalData.greycolor,
    cropperOpt: {
      id: 'cropper',
      width: "",
      height: "",
      scale: 2.8,
      zoom: 8,
      cut: {
        x: (wx.getSystemInfoSync().windowWidth - 200) / 2,
        y: (wx.getSystemInfoSync().windowHeight - 200) / 2,
        width: 200,
        height: 200
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getSystemInfo().then((res) => {
      let { cropperOpt } = this.data
      cropperOpt.height = res.windowHeight - 80
      cropperOpt.width = res.windowWidth
      this.setData({ cropperOpt: cropperOpt })
      new weCropper(cropperOpt)
        .on('ready', function (ctx) {
        })
        .on('beforeImageLoad', (ctx) => {
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          wx.hideToast()
        })
    })
  },
  onShow: function () {

  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    let token = wx.getStorageSync('token')//||'8c16decebc8440c7a6116d1001805e3d';
    let uid = wx.getStorageSync('uid')//||'16'
    let that = this
    this.wecropper.getCropperImage((src) => {
      if (src) {
        wxApi.photoUpload(src, (res) => {
          that.data.userInfo.avatarUrl = res
          that.setData({
            userInfo: that.data.userInfo,
            show: false
          })
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  uploadTap() {

    chooseImage({
      count: 1, // 默认9
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    }).then((res) => {
      const src = res.tempFilePaths[0]
      this.wecropper.pushOrign(src)
    })
  },
  actionSheetChange() {
    this.setData({
      actionSheetHidden: true
    })
  },
  //获取微信信息
  getWxUserINfo() {
    getWxUserInfo().then((res) => {
        let userInfo = res.userInfo
        let data = {
          nickName: userInfo.nickName,
          gender: userInfo.gender - 1,
          avatarUrl: userInfo.avatarUrl,
          city: userInfo.city
        }
        this.onSaveInfo(data)
      }
    )
  },
  onClickImage() {
    this.setData({
      actionSheetHidden: false,
    })
  },
  onActionSheet(e) {
    let { name } = e.currentTarget.dataset;
    chooseImage({
      count: 1, // 默认9
      // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: name == "相机拍摄" ? ['camera'] : ['album'], // 可以指定来源是相册还是相机，默认二者都有
    }).then((res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        this.wecropper.pushOrign(tempFilePaths[0])
        this.setData({
          show: true
        })
      }
    )
    this.setData({
      actionSheetHidden: true
    })
  },
  //保存用户信息
  formSubmit(e) {
    if (!e.detail.value.nickName) {
      this.show("请填写昵称")
      return;
    }
    let { userInfo: { avatarUrl, city } } = this.data
    let data = {
      nickName: e.detail.value.nickName,
      gender: e.detail.value.gender,
      avatarUrl,
      city
    }
    this.onSaveInfo(data)
  },
  onSaveInfo(data) {
    this.dispatch(saveUserInfo(data, (res) => {
      this.dispatch(getUserInfo());
      wx.navigateBack();
    }))
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo.toJS()
  }
}

Page(connect(mapStateToProps)(pageConfig))





