// components/evaluationItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentItem:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id: "-1"
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    open(e){
      let id = e.currentTarget.dataset.id
      this.setData({
        id: id
      })
    }
  }
})
