import React, {Component} from 'react'
import {View, Text, TouchableOpacity,  StyleSheet, SectionList,Alert,DeviceEventEmitter,Dimensions,ToastAndroid} from 'react-native'
import {commonStyle} from './commonStyle'
import DeviceStorage from './Store';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header,Input,Button,Image,Overlay} from 'react-native-elements';
var Data1="";
import SQLite from './Sqlite';
var sqLite = new SQLite();
var db;
var foreverdata=[];
const {height,width} = Dimensions.get('window');
import axios from 'axios';
import config from '../components/config/config';
export default class ShopCart1 extends Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.state = {
      status: [],
      isSelectedAllItem: false,
      totalNum: 0,
      totalPrice: 0.00,
      tarAddress:"",
      tarPeople:"",
      tarPhone:"",
      isVisible:false,
      data:[],
      yes:""
    }
  }
  compennetDidUnmount(){
    sqLite.close();
  }
  componentWillMount(){
    var data=[];
    if(!db){
      db = sqLite.open();
    }
    //建表
    sqLite.createTable();
    db.transaction((tx)=>{
      tx.executeSql("select * from item order by storeId", [],(tx,results)=>{
        var len = results.rows.length;
        var currentStoreId = -1;
        var tempShopItem={};
      //  console.log(results.rows);
        if(len==0) data=[];
        else{
          currentStoreId =  results.rows.item(0).storeId;
          tempShopItem.shopName = results.rows.item(0).storeName;
          tempShopItem.shopId = results.rows.item(0).storeId;
          tempShopItem.shopItems=[]; 
        }
       
        for(let i=0; i<len; i++){
          var u = results.rows.item(i);
          console.log(u.commodityCoverPicUrl);
          if(u.storeId==currentStoreId){
            var tempitem ={};
            tempitem.itemName = u.commodityInfo;
            tempitem.itemId = u.goodId;
            tempitem.itemimg = u.commodityCoverPicUrl;
            tempitem.itemPrice = u.price;
            tempitem.minQuantity = u.amount;
            tempitem.maxQuantity = 20;
            tempitem.itemDes="这个测试商品";
            tempShopItem.shopItems.push(tempitem);
          }else{
            data.push(tempShopItem);
            tempShopItem={};
            currentStoreId = u.storeId;
            tempShopItem.shopName = results.rows.item(i).storeName;
            tempShopItem.shopId = results.rows.item(i).storeId;
            tempShopItem.shopItems=[]; 
            var tempitem ={};
            tempitem.itemName = u.commodityInfo;
            tempitem.itemId = u.goodId;
            tempitem.itemimg = results.rows.item(i).commodityCoverPicUrl;
            tempitem.itemPrice = u.price;
            console.log("Here amount:"+u.amount);
            console.log("Here pic:"+u.commodityCoverPicUrl);
            tempitem.minQuantity = results.rows.item(i).amount;
            tempitem.maxQuantity = 20;
            tempitem.itemDes="这个测试商品";
            tempShopItem.shopItems.push(tempitem);
          }
         
        }
        data.push(tempShopItem);
        let dataArr = data;
        foreverdata = data;
let tempStatusArr = []
for (let i = 0; i < dataArr.length; i++) {
  let items = dataArr[i].shopItems
  let shopObj = {}
  shopObj.shopName = dataArr[i].shopName;
  shopObj.checked = false,
  shopObj.shopId = dataArr[i].shopId;
  let tempItems = []
  for (let j = 0; j < items.length; j++) {
    let item = items[j]
    item.checked = false
    item.quantity = item.minQuantity
    tempItems.push(item)
  }
  shopObj.items = tempItems
  tempStatusArr.push(shopObj)
}
this.state.status = tempStatusArr
this.state.data = data
this.setState({data:data,status:tempStatusArr})
console.log(this.state.status)
      });
    },(error)=>{//打印异常信息
      console.log(error);
    });
  }
  componentWillReceiveProps(){
    var data=[];
    db.transaction((tx)=>{
      tx.executeSql("select * from item order by storeId", [],(tx,results)=>{
        var len = results.rows.length;
        var currentStoreId = -1;
        var tempShopItem={};
      //  console.log(results.rows);
        if(len==0) data=[];
        else{
          currentStoreId =  results.rows.item(0).storeId;
          tempShopItem.shopName = results.rows.item(0).storeName;
          tempShopItem.shopId = results.rows.item(0).storeId;
          tempShopItem.shopItems=[]; 
        }
       
        for(let i=0; i<len; i++){
          var u = results.rows.item(i);
          console.log(u.commodityCoverPicUrl);
          if(u.storeId==currentStoreId){
            var tempitem ={};
            tempitem.itemName = u.commodityInfo;
            tempitem.itemId = u.goodId;
            tempitem.itemimg = u.commodityCoverPicUrl;
            tempitem.itemPrice = u.price;
            tempitem.minQuantity = u.amount;
            tempitem.maxQuantity = 20;
            tempitem.itemDes="这个测试商品";
            tempShopItem.shopItems.push(tempitem);
          }else{
            data.push(tempShopItem);
            tempShopItem={};
            currentStoreId = u.storeId;
            tempShopItem.shopName = results.rows.item(i).storeName;
            tempShopItem.shopId = results.rows.item(i).storeId;
            tempShopItem.shopItems=[]; 
            var tempitem ={};
            tempitem.itemName = u.commodityInfo;
            tempitem.itemId = u.goodId;
            tempitem.itemimg = results.rows.item(i).commodityCoverPicUrl;
            tempitem.itemPrice = u.price;
            console.log("Here amount:"+u.amount);
            console.log("Here pic:"+u.commodityCoverPicUrl);
            tempitem.minQuantity = results.rows.item(i).amount;
            tempitem.maxQuantity = 20;
            tempitem.itemDes="这个测试商品";
            tempShopItem.shopItems.push(tempitem);
          }
         
        }
        data.push(tempShopItem);
        let dataArr = data;
        foreverdata = data;
let tempStatusArr = []
for (let i = 0; i < dataArr.length; i++) {
  let items = dataArr[i].shopItems
  let shopObj = {}
  shopObj.checked = false,
  shopObj.shopId = dataArr[i].shopId;
  shopObj.shopName = dataArr[i].shopName;
  let tempItems = []
  for (let j = 0; j < items.length; j++) {
    let item = items[j]
    item.checked = false
    item.quantity = item.minQuantity
    tempItems.push(item)
  }
  shopObj.items = tempItems
  tempStatusArr.push(shopObj)
}
this.state.status = tempStatusArr
this.state.data = data
this.setState({data:data,status:tempStatusArr})
console.log(this.state.status)
      });
    },(error)=>{//打印异常信息
      console.log(error);
    });
  }
  componentDidMount(){
        this.setState({yes:this.props.yes})
  }
    pay(){
      if(foreverdata.length == 0){
        ToastAndroid.show('请选择下单物品',ToastAndroid.SHORT);
        return;
      }
      var orderItemlist=[];
      var storeId =-1;
      var shopName="";
      let tempStatus = this.state.status;
      var idlist=[];
      for (let i = 0; i < tempStatus.length; i ++) {
        let shop = tempStatus[i]
        let items = shop.items
        for (let j = 0; j < items.length; j++) {
          let item = items[j]
          if (item.checked) {
            if(storeId ==-1 || shop.shopId == storeId){
            storeId = shop.shopId;
            shopName=shop.shopName;
            let id = storeId*10000+item.itemId;
            idlist.push(id);
            orderItemlist.push(item);
          }
          else{
            ToastAndroid.show('请选择同一商店商品',ToastAndroid.SHORT);
            return;
          }
          }
        }
      
      }
      if(idlist.length == 0){
        ToastAndroid.show('请选择下单物品',ToastAndroid.SHORT);
        return;
      }
      sqLite.deleteItems(idlist);
      for(var i=0;i<foreverdata.length;i++){
        if(foreverdata[i].shopId==storeId){
          var tempitems = foreverdata[i].shopItems;
          console.log("i:"+i);
          for(var j=0;j<orderItemlist.length;j++){
            var itemId =  orderItemlist[j].itemId;
            console.log("commodityId:"+itemId);
            for(var z = 0;z<tempitems.length;z++){
              console.log("itemid"+tempitems[z].itemId)
              if(tempitems[z].itemId == itemId){
                tempitems.splice(z,1);
                console.log("z:"+z);
                break;
              }
            }
          }
          foreverdata[i].shopItems = tempitems;
          console.log("tempitems:")
          console.log(tempitems);
          break;
        }
      }
      if(foreverdata.length==1){
        console.log("Ok Here");
        if(foreverdata[0].shopItems.length==0) foreverdata=[];
      }
      else{
      for(var i=0;i<foreverdata.length;i++){
        if(foreverdata[i].shopId== storeId){
          var tempitems = foreverdata[i].shopItems;
          if(tempitems.length == 0){
            console.log();
            foreverdata.splice(i,1);
          }
          break;
        }
      }}
      console.log("foreverdata");
      console.log(foreverdata)
      data = foreverdata;
      let dataArr = data;
      let tempStatusArr = []
  for (let i = 0; i < dataArr.length; i++) {
    let items = dataArr[i].shopItems
    let shopObj = {}
    shopObj.shopName = dataArr[i].shopName;
    shopObj.checked = false,
    shopObj.shopId = dataArr[i].shopId;
    let tempItems = []
    for (let j = 0; j < items.length; j++) {
      let item = items[j]
      item.checked = false
      item.quantity = item.minQuantity
      tempItems.push(item)
    }
    shopObj.items = tempItems
    tempStatusArr.push(shopObj)
  }
  this.state.status = tempStatusArr
  this.state.data = data
  this.setState({data:data,status:tempStatusArr,totalPrice:0.00})
  this.props.navigation.navigate('OrderOk',{shopId:storeId,shopName:shopName,orderItemlist:orderItemlist,total:this.state.totalPrice,userId:this.props.userId})
  
    }
  checkItem(sectionIndex, index) {
    let tempStatus = this.state.status
    let tempShop = tempStatus[sectionIndex]
    let tempShopItems = tempStatus[sectionIndex].items
    let item = tempShopItems[index]
    item.checked = !item.checked

    let isSelectedAllShopItem = true
    for (let j = 0; j < tempShopItems.length; j++) {
      let item = tempShopItems[j]
      if (!item.checked) {
        isSelectedAllShopItem = false
        break
      }
    }

    tempShop.checked = isSelectedAllShopItem

    let isSelectedAllShop = true
    for (let k = 0; k < tempStatus.length; k ++) {
      let shop = tempStatus[k]
      if (!shop.checked) {
        isSelectedAllShop = false
        break
      }
    }

    this.calculateCountAndPrice()
    this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
  }

  checkedShop(index) {
    let tempStatus = this.state.status
    let shop = tempStatus[index]
    shop.checked = !shop.checked
    let items = shop.items
    for (let j = 0; j < items.length; j++) {
      let item = items[j]
      item.checked = shop.checked
    }

    let isSelectedAllShop = true
    for (let j = 0; j < tempStatus.length; j++) {
      let shop = tempStatus[j]
      if (!shop.checked) {
        isSelectedAllShop = false
        break
      }
    }

    this.calculateCountAndPrice()
    this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
  }

  checkAllShop() {
    let tempSelectedAllItem = !this.state.isSelectedAllItem
    let tempStatus = this.state.status
    for (let i = 0; i < tempStatus.length; i++) {
      let shop = tempStatus[i]
      shop.checked = tempSelectedAllItem
      let items = shop.items
      for (let j = 0; j < items.length; j++) {
        let item = items[j]
        item.checked = tempSelectedAllItem
      }
    }

    this.calculateCountAndPrice()
    this.setState({isSelectedAllItem: tempSelectedAllItem, status: tempStatus})
  }

  minus(sectionIndex, index) {
    let tempStatus = this.state.status
    let shop = tempStatus[sectionIndex]
    console.log(shop);
    let items = shop.items
    let item = items[index]
    if (item.quantity <= 1) {
      ToastAndroid.show('商品购买数量不能小于:1',ToastAndroid.SHORT);
      return;
    } else {
      var id =  shop.shopId*10000+item.itemId;
      sqLite.minusAmount(id);
      item.quantity -= 1
    }

    if (item.checked) {
      this.calculateCountAndPrice()
    }
    this.setState({status: tempStatus})
  }

  add(sectionIndex, index) {
    let tempStatus = this.state.status
    let shop = tempStatus[sectionIndex]
    let items = shop.items
    let item = items[index]
    if (item.quantity >= item.maxQuantity) {
      alert('商品购买数量不能大于:'+item.maxQuantity)
    } else {
      var id =  shop.shopId*10000+item.itemId;
      sqLite.addAmount(id);
      item.quantity += 1
    }
    if (item.checked) {
      this.calculateCountAndPrice()
    }
    this.setState({status: tempStatus})
  }
  delete(sectionIndex, index) {
    var data=[];
    let tempStatus = this.state.status
    let shop = tempStatus[sectionIndex]
    let items = shop.items
    let item = items[index]
    var id =  shop.shopId*10000+item.itemId;
    sqLite.deleteItem(id);
    console.log(item);
    item.quantity =0;
    if(items.length==1){
      for(var i=0;i<foreverdata.length;i++){
        if(foreverdata[i].shopId==shop.shopId){
          foreverdata.splice(i,1);
          break;
        }
      }
    }
    else{
      for(var i=0;i<foreverdata.length;i++){
        if(foreverdata[i].shopId==shop.shopId){
         var tempItems = foreverdata[i].shopItems;
         for(var j=0;j<tempItems.length;j++){
           if(tempItems[j].itemId == item.itemId){
             tempItems.splice(j,1);
             foreverdata[i].shopItems = tempItems;
             break;
           }
         }
         break;
        }
      }
    }
    data = foreverdata;
    let dataArr = data;
    let tempStatusArr = []
for (let i = 0; i < dataArr.length; i++) {
  let items = dataArr[i].shopItems
  let shopObj = {}
  shopObj.checked = false,
  shopObj.shopId = dataArr[i].shopId;
  let tempItems = []
  for (let j = 0; j < items.length; j++) {
    let item = items[j]
    item.checked = false
    item.quantity = item.minQuantity
    tempItems.push(item)
  }
  shopObj.items = tempItems
  tempStatusArr.push(shopObj)
}
this.state.status = tempStatusArr
this.state.data = data
this.setState({data:data,status:tempStatusArr})
    
  }

  calculateCountAndPrice() {
    let tempTotalNum = 0
    let tempTotalPrice = 0
    let tempStatus = this.state.status
    for (let i = 0; i < tempStatus.length; i ++) {
      let shop = tempStatus[i]
      let items = shop.items
      for (let j = 0; j < items.length; j++) {
        let item = items[j]
        if (item.checked) {
          tempTotalNum += 1
          tempTotalPrice += item.itemPrice * item.quantity
        }
      }
    }
    this.setState({totalNum: tempTotalNum, totalPrice: tempTotalPrice})
  }

  renderItem = info => {
    let item = info.item
    let index = info.index
    let sectionIndex = info.section.index
    let shop = this.state.status[sectionIndex]
    let statusItem = shop.items[index]
    return (
      <View style={styles.cellStyle}>
        <TouchableOpacity onPress={() => this.checkItem(sectionIndex, index)}>
          <Image style={styles.checkBox} source={statusItem.checked ? require('./assets/ic_selected.png') : require('./assets/ic_defult.png')} resizeMode={'center'}/>
        </TouchableOpacity>
        <Image style={{width: 80, height: 80}} source={{uri: config.url2+item.itemimg}}/>
        <View style={{justifyContent: commonStyle.around, flex: 1, marginHorizontal: 10, height: 50}}>
          <Text style={{fontSize: 13, color: commonStyle.textBlockColor}}>{item.itemName}</Text>
          <Text style={{fontSize: 13, color: commonStyle.textBlockColor}}>{`￥${item.itemPrice}`}</Text>
        </View>
        <View>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, marginHorizontal: 10}}>
          <TouchableOpacity onPress={() => this.minus(sectionIndex, index)}>
            <Image source={require('./assets/Group.png')}/>
          </TouchableOpacity>
          <Text style={{width: 30, textAlign: 'center'}}>{statusItem.quantity}</Text>
          <TouchableOpacity onPress={() => this.add(sectionIndex, index)}>
            <Image source={require('./assets/Group5.png')}/>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:10,marginLeft:40} }>
          <TouchableOpacity onPress={()=>{this.delete(sectionIndex,index)}}>
        <Icon 
        name='remove'
        size={17}
        color='#A9A9A9'
        /></TouchableOpacity></View>
        </View>
      </View>
    )
  }

  renderSectionHeader = info => {
    let section = info.section.key
    let index = info.section.index
    let shop = this.state.status[index]
    return (
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={() => this.checkedShop(index)}>
          <Image style={styles.checkBox} source={shop.checked ? require('./assets/ic_selected.png') : require('./assets/ic_defult.png')} resizeMode={'center'}/>
        </TouchableOpacity>
        <Text style={{color: commonStyle.gray, fontSize: 12}}>{section}</Text>
      </View>
    )
  }
handler1(){
  this.setState({isVisible:false});
}
handler(){
  this.setState({isVisible:true});
}
  render() {
    
    let tempArr = this.state.data.map((item, index) => {
      let tempData = {}
      tempData.key = item.shopName
      tempData.index = index
      tempData.data = item.shopItems
      return tempData
    })
    console.log("Hello")
    console.log(tempArr);
    return (
      <View style={styles.container}>
        <View style={{height:height*0.07,marginTop:15}}>
        <View style={{marginLeft:10}}>
          <Text style={{fontSize:20}}>购物车</Text>
        </View>
        </View>
        <SectionList
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          sections={tempArr}
          ItemSeparatorComponent={() => <View/>}
          ListHeaderComponent={() => <View/>}
          ListFooterComponent={() => <View/>}
        />
        <View style={styles.toolBar}>
          <View style={{flex: 1, flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
              <Image style={styles.checkBox} source={this.state.isSelectedAllItem ? require('./assets/ic_selected.png') : require('./assets/ic_defult.png')} resizeMode={'center'}/>
            <Text>全选</Text>
          </View>
          <Text style={{marginHorizontal: 10}}>合计:
            <Text style={{color: commonStyle.red}}>￥{parseFloat(this.state.totalPrice).toFixed(2)}</Text>
          </Text>
          <TouchableOpacity onPress={this.pay.bind(this)}>
          <View style={{width: 120, backgroundColor: commonStyle.red, alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            <Text style={{color: commonStyle.white}}>去结算</Text>
          </View>
          </TouchableOpacity>
          </View>
        
   </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  navBar: {
    height: commonStyle.navHeight,
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center,
    borderBottomWidth: commonStyle.lineWidth,
    borderBottomColor: commonStyle.lineColor
  },
  cellStyle: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor
  },
  sectionHeader: {
    height: 40,
    flexDirection: commonStyle.row,
    backgroundColor: commonStyle.bgColor,
    alignItems: commonStyle.center,
  },
  checkBox: {
    width: 40,
    height: 40,
  },
  toolBar: {
    height: commonStyle.cellHeight,
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    borderTopWidth:0.7,
    borderTopColor:'#D0D0D0'
  }
})