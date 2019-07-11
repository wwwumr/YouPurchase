import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text } from 'react-native-elements'
import {ScrollView,View} from 'react-native'
const list = [
  {
    orderInfoId: 1,
    icon: 'av-timer',
    storeName:'水果店1',
    orderItemName:'苹果',
    amount:1,
    totalPrice:2,
  },
  {
    orderInfoId: 2,
    icon: 'av-timer',
    storeName:'水果店2',
    orderItemName:'香蕉',
    amount:2,
    totalPrice:4,
  },
  {
    orderInfoId: 3,
    icon: 'av-timer',
    storeName:'水果店3',
    orderItemName:'香梨',
    amount:3,
    totalPrice:6,
  },
  {
    orderInfoId: 4,
    icon: 'av-timer',
    storeName:'水果店4',
    orderItemName:'桃子',
    amount:4,
    totalPrice:8
  },
  {
    orderInfoId: 5,
    icon: 'av-timer',
    storeName:'水果店5',
    orderItemName:'芒果',
    amount:5,
    totalPrice:10,
  },
  {
    orderInfoId: 6,
    icon: 'av-timer',
    storeName:'水果店6',
    orderItemName:'樱桃',
    amount:6,
    totalPrice:12,
  },
  {
    orderInfoId: 7,
    icon: 'av-timer',
    storeName:'水果店7',
    orderItemName:'西瓜',
    amount:7,
    totalPrice:21,
  },
  {
    orderInfoId: 8,
    icon: 'av-timer',
    storeName:'水果店8',
    orderItemName:'苹果',
    amount:1,
    totalPrice:2,
  },
  {
    orderInfoId: 9,
    icon: 'av-timer',
    storeName:'水果店9',
    orderItemName:'香蕉',
    amount:2,
    totalPrice:4,
  },
  {
    orderInfoId: 10,
    icon: 'av-timer',
    storeName:'水果店10',
    orderItemName:'栗子',
    amount:10,
    totalPrice:20,
  }
]
export default class Orderlist extends Component{
    constructor(props){
        super(props);
        state={
            text:'',
            itemlist:[]
        }
    }
    componentWillMount(){
        this.setState({
            itemlist:list
        })
    }
    render(){
        return(
            <View>
                <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: '我 的 订 单', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>  
                <SearchBar round={true}
          placeholder="订 单 号"
        />
          
<ScrollView style={{marginBottom:150}}>
  {
    this.state.itemlist.map((item, i) => (
      <ListItem 
        key={item.orderInfoId}
        title={"订单号"+item.orderInfoId}
        subtitle={item.storeName}
        rightTitle={item.orderItemName}
        rightSubtitle={"数量"+item.amount+"  总价"+ item.totalPrice}
        leftIcon={{ name: item.icon }}
      />
    ))
  }
        </ScrollView>
        </View>)}
}