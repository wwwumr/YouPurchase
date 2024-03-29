import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter} from 'react-native'
import axios from 'axios';
import OrderItem from './OrderItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
var list=[];
const list1 = [
  {
    orderInfoId: 1,
    icon: 'av-timer',
    storeName:'水果店1',
    orderItemName:'苹果',
    time:"2017-01-01 14:00",
    orderStatus:"订单已送达",
    totalPrice:100

  },
  {
    orderInfoId: 2,
    icon: 'av-timer',
    storeName:'水果店2',
    orderItemName:'香蕉',
    time:"2017-01-01 14:00",
    totalPrice:4,
    orderStatus:"订单已送达"
  },
  {
    orderInfoId: 3,
    icon: 'av-timer',
    storeName:'水果店3',
    orderItemName:'香梨',
    time:"2017-01-01 14:00",
    totalPrice:6,
    orderStatus:"订单已送达"
  },
  {
    orderInfoId: 4,
    icon: 'av-timer',
    storeName:'水果店4',
    orderItemName:'桃子',
    time:"2017-01-01 14:00",
    totalPrice:8,
    orderStatus:"订单已送达"
  },
  {
    orderInfoId: 5,
    icon: 'av-timer',
    storeName:'水果店5',
    orderItemName:'芒果',
    time:"2017-01-01 14:00",
    totalPrice:10,
    orderStatus:"订单已送达"
  },
  {
    orderInfoId: 6,
    icon: 'av-timer',
    storeName:'水果店6',
    orderItemName:'樱桃',
    time:"2017-01-01 14:00",
    totalPrice:12,
    orderStatus:"订单已送达"
  },
  {
    orderInfoId: 7,
    icon: 'av-timer',
    storeName:'水果店7',
    orderItemName:'西瓜',
    time:"2017-01-01 14:00",
    totalPrice:21,
    orderStatus:"订单已送达"
  },
  {
    orderInfoId: 8,
    icon: 'av-timer',
    storeName:'水果店8',
    orderItemName:'苹果',
    time:"2017-01-01 14:00",
    totalPrice:2,
    orderStatus:"订单已送达"
  },
  {
    orderInfoId: 9,
    icon: 'av-timer',
    storeName:'水果店9',
    orderItemName:'香蕉',
    time:"2017-01-01 14:00",
    totalPrice:4,
    orderStatus:"订单已送达"
  },
  {
    orderInfoId: 10,
    icon: 'av-timer',
    storeName:'水果店10',
    orderItemName:'栗子',
    time:"2017-01-01 14:00",
    totalPrice:20,
    orderStatus:"订单已送达"
  }
]
export default class Orderlist extends Component{
    constructor(props){
        super(props);
        state={
            text:'',
            itemlist:[],
            yes:""
        }
    }
    change(){
      var userid =  this.props.userId;
     // console.log(userid);
      axios.post('http://192.168.1.59:8080/order/userCheck',{id:userid,status:0}).then((response)=>{
        list = response.data;
        for(var i=0;i<list.length;i++){
          list[i].icon="av-timer";
          var tempname = list[i].orderItemList[0].commodityInfo;
          if(list[i].orderItemList.length!=1){
             tempname+="等"
          }
          list[i].orderItemName = tempname;
        }
       // console.log(list)
        this.setState({itemlist:list});
        console.log(this.state.itemlist);
      }).catch(function(error){
        console.log(error);
      })
      this.setState({itemlist:list});
    }
    componentDidMount(){
      this.listener = DeviceEventEmitter.addListener('change', () => {
      this.change();
        })
    }
    componentWillUnmount() {
      //移除监听
      if (this.listener) {
        this.listener.remove();
      }
    }
    componentWillReceiveProps(){
      var userid =  this.props.userId;
      console.log(userid);
      axios.post('http://192.168.1.19:8080/order/userCheck',{id:userid,status:0}).then((response)=>{
        list = response.data;
        for(var i=0;i<list.length;i++){
          list[i].icon="av-timer";
          var tempname = list[i].orderItemList[0].commodityInfo;
          if(list[i].orderItemList.length!=1){
             tempname+="等"
          }
          list[i].orderItemName = tempname;
        }
        console.log(list)
        this.setState({itemlist:list});
        console.log(this.state.itemlist);
      }).catch(function(error){
        console.log(error);
      })
      var yes = this.props.yes+"123";
      this.setState({itemlist:list,yes:yes});
    }
    componentWillMount(){
      var userid =  this.props.userId;
      console.log(userid);
      axios.post('http://192.168.1.19:8080/order/userCheck',{id:userid,status:0}).then((response)=>{
        list = response.data;
        for(var i=0;i<list.length;i++){
          list[i].icon="av-timer";
          var tempname = list[i].orderItemList[0].commodityInfo;
          if(list[i].orderItemList.length!=1){
             tempname+="等"
          }
          console.log(tempname);
          list[i].orderItemName = tempname;
        }
        console.log(list)
        this.setState({itemlist:list});
        console.log(this.state.itemlist);
      }).catch(function(error){
        console.log(error);
      })
      this.setState({itemlist:list});
    }
    render(){
      var userid =  this.props.userId;
        return(
            <View>
                <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: '我 的 订 单', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>  
<ScrollView style={{marginBottom:80,backgroundColor:"#E8E8E8"}}>
  {
    this.state.itemlist.map((item, i) => (
      <OrderItem navigation={this.props.navigation}
       userId={this.props.userId}
       storeId={item.storeId}
        key={item.orderInfoId}
        storeName={item.storeName}
        time={item.createDate}
        orderStatus={"订单已送达"}
        orderItemName={item.orderItemName}
        totalPrice = {item.totalPrice}
        leftIcon={{ name: item.icon }}
        judged={item.judged}
        orderItemList = {item.orderItemList}
        tarPeople={item.tarPeople}
        tarPhone={item.tarPhone}
        tarAddress={item.tarAddress}
        orderInfoId={item.orderInfoId}
      />
    ))
  }
        </ScrollView>
        </View>)}
}
