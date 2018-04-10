// components/joinGroup/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showJoin:{
      type:Boolean,
      value:false
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
    coloseModel(){
      this.setData({
        showJoin:false
      })
    }
  }
})
