// components/ActivityItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeData:{
      type:Object,
      value:{}
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
    toActive: function () {
      wx.navigateTo({
        url: this.data.activeData.url,
      })
    },
  }
})
