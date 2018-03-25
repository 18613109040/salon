// components/ShopMap/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopInfo:{
      type:Object,
      value:{

      }
    },
    type:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToShopByMap() {
      let { shopInfo } = this.data
      wx.openLocation({//查看位置
        latitude: shopInfo.latitude,
        longitude: shopInfo.longitude,
        scale: 28,
        name: shopInfo.name,
        address: shopInfo.shopAddress
      })
    }
  }
})
