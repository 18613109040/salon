// subGroup/pages/comment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:"-1",
      topid:"0",
      pickcard:[
        {
          title:"卷发养护套餐",
          date:"2010-01-01",
          money: "698",
          content:" 第二次在店里买东西了，真的很方便，不用逛超市了直接选好自己喜欢的东西，下单到家只要2天，快递员送货到家门口实在方便得很啊，开心开心开心！！~~",
          merchant:"商家解释：感谢您对我们的支持，这款卷发棒是vip级的，您用的时候稍微插插点让他稍微热一下，卷曲程度就非常棒了！！快去给你做个美美的发型吧！！！",
          imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',         'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
          ],
        },
        {
          title: "弹力卷护套餐",
          date: "2010-01-02",
          money:"199",
          content: "tom的手艺不错，非常非常棒，很喜欢这个发型师给我做头发,团购更划算，下次也要到这个APP上购买商品，一如既然的好评",
          merchant: "谢谢亲的大力支持，您的鼓励是我们的动力，欢迎您下次再光临",
          imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
          ],
        },
        {
          title: "美容美发套餐",
          date: "2010-01-01",
          money: "167",
          content: " 第二次在店里买东西了，真的很方便，不用逛超市了直接选好自己喜欢的东西，下单到家只要2天，快递员送货到家门口实在方便得很啊，开心开心开心！！~~",
          merchant: "商家解释：感谢您对我们的支持，这款卷发棒是vip级的，您用的时候稍微插插点让他稍微热一下，卷曲程度就非常棒了！！快去给你做个美美的发型吧！！！",
          imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
          ],
        }
      ]
  },
  // 点击展开
  open_word:function(e){
    let id = e.currentTarget.dataset.id
    this.setData({
      id:id
    })
  },
  //头部栏切换
  onchange:function(e){
    let topid =e.currentTarget.dataset.id
    this.setData({
      topid:topid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})