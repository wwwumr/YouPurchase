import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet, SectionList} from 'react-native'
import {commonStyle} from './commonStyle'
import {Header,Icon} from 'react-native-elements'
    const data= [
      {
        shopName : "店铺名称1",
        shopId : "0001",
        shopItems: [
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 100.00,
            minQuantity: 2,
            maxQuantity: 10,
            itemDes: "这个测试商品"
          },
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 110.00,
            minQuantity: 1,
            maxQuantity: 20,
            itemDes: "这个测试商品"
          },
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 120.00,
            minQuantity: 5,
            maxQuantity: 30,
            itemDes: "这个测试商品"
          },
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 130.00,
            minQuantity: 2,
            maxQuantity: 40,
            itemDes: "这个测试商品"
          }
        ]
      },
      {
        shopName : "店铺名称2",
        shopId : "0001",
        shopItems: [
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 140.00,
            minQuantity: 2,
            maxQuantity: 5,
            itemDes: "这个测试商品"
          },
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 150.00,
            minQuantity: 10,
            maxQuantity: 15,
            itemDes: "这个测试商品"
          },
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 160.00,
            minQuantity: 20,
            maxQuantity: 22,
            itemDes: "这个测试商品"
          },
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 170.00,
            minQuantity: 2,
            maxQuantity: 24,
            itemDes: "这个测试商品"
          }
        ]
      },
      {
        shopName : "店铺名称3",
        shopId: "0001",
        shopItems: [
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 180.00,
            minQuantity: 2,
            maxQuantity: 6,
            itemDes: "这个测试商品"
          },
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 100.00,
            minQuantity: 2,
            maxQuantity: 8,
            itemDes: "这个测试商品"
          },
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 100.00,
            minQuantity: 2,
            maxQuantity: 10,
            itemDes: "这个测试商品"
          },
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 100.00,
            minQuantity: 2,
            maxQuantity: 100,
            itemDes: "这个测试商品"
          }
        ]
      },
      {
        shopName : "店铺名称4",
        shopId : "0001",
        shopItems: [
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 100.00,
            minQuantity: 1,
            maxQuantity: 3,
            itemDes: "这个测试商品"
          },
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 100.00,
            minQuantity: 3,
            maxQuantity: 9,
            itemDes: "这个测试商品"
          }
        ]
      },
      {
        shopName : "店铺名称5",
        shopId : "0001",
        shopItems: [
          {
            itemName: "商品一",
            itemId: "10001",
            itemimg: "http://ovyjkveav.bkt.clouddn.com/17-10-19/15885901.jpg",
            itemPrice: 100.00,
            minQuantity: 1,
            maxQuantity: 20,
            itemDes: "这个测试商品"
          }
        ]
      }
    ]
export default class ShopCart1 extends Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.state = {
      status: [],
      isSelectedAllItem: false,
      totalNum: 0,
      totalPrice: 0.00
    }
  }

  componentWillMount() {
    let dataArr = data;
    let tempStatusArr = []
    for (let i = 0; i < dataArr.length; i++) {
      let items = dataArr[i].shopItems
      let shopObj = {}
      shopObj.checked = false
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
    console.log(this.state.status)
  }

  componentDidMount() {
    // 网络请求获取购物车数据
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
    let items = shop.items
    let item = items[index]
    if (item.quantity <= item.minQuantity) {
      alert('商品购买数量不能小于:'+item.minQuantity)
    } else {
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
      item.quantity += 1
    }
    if (item.checked) {
      this.calculateCountAndPrice()
    }
    this.setState({status: tempStatus})
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
        <Image style={{width: 80, height: 80}} source={{uri: item.itemimg}}/>
        <View style={{justifyContent: commonStyle.around, flex: 1, marginHorizontal: 10, height: 50}}>
          <Text style={{fontSize: 13, color: commonStyle.textBlockColor}}>{item.itemName}</Text>
          <Text style={{fontSize: 13, color: commonStyle.textBlockColor}}>{`￥${item.itemPrice}`}</Text>
        </View>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, marginHorizontal: 10}}>
          <TouchableOpacity onPress={() => this.minus(sectionIndex, index)}>
            <Image source={require('./assets/Group.png')}/>
          </TouchableOpacity>
          <Text style={{width: 30, textAlign: 'center'}}>{statusItem.quantity}</Text>
          <TouchableOpacity onPress={() => this.add(sectionIndex, index)}>
            <Image source={require('./assets/Group5.png')}/>
          </TouchableOpacity>
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

  render() {
    let tempArr = data.map((item, index) => {
      let tempData = {}
      tempData.key = item.shopName
      tempData.index = index
      tempData.data = item.shopItems
      return tempData
    })
    return (
      <View style={styles.container}>
        <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
               /> }
                centerComponent={{ text: '购 物 车', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>
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
            <TouchableOpacity onPress={() => this.checkAllShop()}>
              <Image style={styles.checkBox} source={this.state.isSelectedAllItem ? require('./assets/ic_selected.png') : require('./assets/ic_defult.png')} resizeMode={'center'}/>
            </TouchableOpacity>
            <Text>全选</Text>
          </View>
          <Text style={{marginHorizontal: 10}}>合计:
            <Text style={{color: commonStyle.red}}>￥{parseFloat(this.state.totalPrice).toFixed(2)}</Text>
          </Text>
          <View style={{width: 120, backgroundColor: commonStyle.red, alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            <Text style={{color: commonStyle.white}}>去结算({this.state.totalNum})</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
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
    alignItems: commonStyle.center
  }
})