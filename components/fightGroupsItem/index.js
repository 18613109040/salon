// components/fightGroupsItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    group:{
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
    clickJoin(e){
      let { item } = e.currentTarget.dataset;
      let eventDetail = { value: item } // detail对象，提供给事件监听函数
      this.triggerEvent('joinclick', eventDetail)
    }
  }
})
