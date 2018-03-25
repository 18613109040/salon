let app = getApp();
import { clickSkuTabAction, updataPackDetail} from '../../actions/hotPackage.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModel:{
      type:Boolean,
      value:false
    },
    packageSku:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    image:"",
    price:0,
    skuValues:"请选择规格及数量",
    packageName:"",
    selectShop:false
  },
  ready(){
    let { packageDetail } = app.store.getState();
    console.dir(packageDetail.toJS())
    this.setData({
      image: packageDetail.toJS().mainImgUrl,
      price: packageDetail.toJS().price,
      packageName: packageDetail.toJS().packageName
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChangeSku(e){
      const { item, id } = e.currentTarget.dataset;
      let { skuList } = app.store.getState();
      if (item.ishas) {
        app.store.dispatch(clickSkuTabAction({ id: id, data: skuList.toJS()}))
        let selectShop = {};
        let selectLable = ""
        this.data.packageSku.map((item, id) => {
          if ((item.value.filter(ix => ix.select == true)).length > 0) {
            selectLable += item.title + ":";
            selectLable += item.value.filter(ix => ix.select == true)[0].name;
            if (id !== this.data.packageSku.length - 1) {
              selectLable += ";"
            }
          }
        })
        selectShop = skuList.toJS().find(item => item.attrValues === selectLable)
        this.setData({
          skuValues: selectLable,
          price: selectShop ? selectShop.price : this.data.price,
          selectShop: selectShop?true:false
        })
        if (selectShop){
          app.store.dispatch(updataPackDetail({
            skuId: selectShop.id,
            skuValue: selectLable
          }))
        }
      }
      
    },
    clickEnter(){
      this.setData({
        showModel:false
      })
      this.triggerEvent('clickskumodel', {})
    },
    onTouchstart(){
      this.setData({
        showModel: false
      })
    }
  }
})
