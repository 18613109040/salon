// components/List/index.js
Component({
  /**
   * 组件的属性列表
   * @thumb {String}缩略图(当为 string 类型时作为 img src)
   * @extra {String}右边内容
   * @content {String} 左侧内容
   * @arrow {String} 箭头方向(右,上,下), 可选horizontal,up,down,empty，如果是empty不显示
   * @wrap {Boolean} 是否换行，默认情况下，文字超长会被隐藏，
   */
  properties: {
    thumb:{
     type:String,
     value:"" 
    },
    extra:{
      type:String,
      value:"" 
    },
    content:{
      type:String,
      value:"左侧内容"
    },
    arrow:{
      type:String,
      value:"horizontal"
    },
    wrap:{
      type:Boolean,
      value:true
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

  }
})
