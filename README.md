# 小店微信小程序架构介绍

### 参考文档
- https://mp.weixin.qq.com/debug/wxadoc/dev/index.html    //小程序官方文档
- http://www.redux.org.cn              //redux 中文文档

### 依赖
-  [redux.js](https://github.com/reactjs/redux)
-  [redux-thunk](https://github.com/gaearon/redux-thunk)
-  [wechat-weapp-redux](https://github.com/charleyw/wechat-weapp-redux)
-  [immutable](https://github.com/facebook/immutable-js)

### 使用
![Alt text](./1515640609803.png)
- 打开小程序开发工具 新建小程序项目 选择单前项目 默认开发工具会识别AppID 如果没显示，自行打开目录下 ext.json 填写extAppid 内容到AppID 


###	功能
###### actions/home.js
```
 export const ADD = "ADD";
 export function add(json){
  return {
     type:ADD,
     json
  }
}
```

###### reduces/home.js
```
import { ADD} from '../actions/home.js'
export function total(state = 1, action) {
  let json = action.json;
  switch (action.type) {
    case ADD:
      return ++state
    default:
      return state
  }
}
```

##### reduces/index.js
```
const Redux = require('../libs/redux.js')
const combineReducers = Redux.combineReducers
import { total} from './home'
const todoApp = combineReducers({
  total
})
module.exports = todoApp
```
###### pages/home.js 
```
onShow(){
	 this.dispacth(add())
 }
```


>onLoad: 页面加载
  一个页面只会调用一次。
  接收页面参数  可以获取wx.navigateTo和wx.redirectTo及<navigator/>中的 query。
 
>onShow: 页面显示
  每次打开页面都会调用一次。
 
>onReady: 页面初次渲染完成
  一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
 
 
>onHide: 页面隐藏
  当navigateTo或底部tab切换时调用。
 
>onUnload: 页面卸载
  当redirectTo或navigateBack的时候调用。




#### 编码 规范
##### class 命名规则 
```
.xd_m{

}
```
##### 目录命名
- 驼峰命名： 如classIfication
##### 缩进规则
- 对于所有编程语言，缩进必须是软tab（用空格字符）。在你的文本编辑器里敲 Tab 应该等于 2个空格 。

##### 变量命名
- 变量使用驼峰或全小写
```
	let varName
```

### 项目结构和基本规范
	|──actions                       //Action 创建函数  
	|   └──fetch.js                 //封装post get 请求
	|---components                    //存放小程序组件目录
	|---images
	|---libs                          //存放第三方js资源包
	|   └──redux.js
	|   └──redux-thunk.js
	|   └──wechat-weapp-redux.js
	|   └──immutable.js
	|---pages                       //小程序界面
	|---reducers                    //reducers 目录
	|---store                       // store目录
	|   └──configureStore.js
	|---template                   //template 目前只有全局toast组件
	|   └──toast
	|        └──index.js
	|        └──index.html
	|---utils                    //utils目录
	|---app.js                   //小程序逻辑
	|---app.json                 //小程序公共设置
	|---app.wxss                 //小程序公共样式表
	|---config.js                //全局参数配置              
	|---ext.json                 //第三方平台
