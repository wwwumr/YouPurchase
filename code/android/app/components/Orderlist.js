import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter} from 'react-native'
import axios from 'axios';
import OrderItem from './OrderItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
var list=[];
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
      console.log(userid);
      axios.post('http://192.168.1.59:8080/order/userCheck',{id:userid,status:0}).then((response)=>{
        list = response.data;
      //  0：未支付 1：待发货 2：配送中 3：已送达
        for(var i=0;i<list.length;i++){
          list[i].icon="av-timer";
          var tempname = list[i].orderItemList[0].commodityInfo;
          if(list[i].orderItemList.length!=1){
             tempname+="等"
          }
          console.log(tempname);
          list[i].totalJudge = true;
          list[i].mapjudged = true;
          list[i].orderItemName = tempname;
          if(list[i].status==0){
            list[i].orderStatus = "订单未支付";
          }
          if(list[i].status==1){
            list[i].orderStatus ="待发货";
          }
          if(list[i].status == 2){
            list[i].orderStatus="配送中";
            list[i].mapjudged =false;
          }
          if(list[i].status==3){
            list[i].orderStatus="订单已送达";
            if(list[i].judged==false)
            list[i].totalJudge = false;
          }
          
        }
        console.log(list)
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
        this.listener = DeviceEventEmitter.addListener('changeOrder',()=>{
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
      axios.post('http://192.168.1.59:8080/order/userCheck',{id:userid,status:0}).then((response)=>{
        list = response.data;
      //  0：未支付 1：待发货 2：配送中 3：已送达
        for(var i=0;i<list.length;i++){
          list[i].icon="av-timer";
          var tempname = list[i].orderItemList[0].commodityInfo;
          if(list[i].orderItemList.length!=1){
             tempname+="等"
          }
          console.log(tempname);
          list[i].totalJudge = true;
          list[i].mapjudged = true;
          list[i].orderItemName = tempname;
          if(list[i].status==0){
            list[i].orderStatus = "订单未支付";
          }
          if(list[i].status==1){
            list[i].orderStatus ="待发货";
          }
          if(list[i].status == 2){
            list[i].orderStatus="配送中";
            list[i].mapjudged =false;
          }
          if(list[i].status==3){
            list[i].orderStatus="订单已送达";
            if(list[i].judged==false)
            list[i].totalJudge = false;
          }
          
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
      axios.post('http://192.168.1.59:8080/order/userCheck',{id:userid,status:0}).then((response)=>{
        list = response.data;
      //  0：未支付 1：待发货 2：配送中 3：已送达
        for(var i=0;i<list.length;i++){
          list[i].icon="av-timer";
          var tempname = list[i].orderItemList[0].commodityInfo;
          if(list[i].orderItemList.length!=1){
             tempname+="等"
          }
          console.log(tempname);
          list[i].totalJudge = true;
          list[i].mapjudged = true;
          list[i].orderItemName = tempname;
          if(list[i].status==0){
            list[i].orderStatus = "订单未支付";
          }
          if(list[i].status==1){
            list[i].orderStatus ="待发货";
          }
          if(list[i].status == 2){
            list[i].orderStatus="配送中";
            list[i].mapjudged =false;
          }
          if(list[i].status==3){
            list[i].orderStatus="订单已送达";
            if(list[i].judged==false)
            list[i].totalJudge = false;
          }
          
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
      status={item.status}
       userId={this.props.userId}
       storeId={item.storeId}
       mapjudged = {item.mapjudged}
        key={item.orderInfoId}
        storeName={item.storeName}
        time={item.createDate}
        orderStatus={item.orderStatus}
        orderItemName={item.orderItemName}
        totalPrice = {item.totalPrice}
        leftIcon={{ name: item.icon }}
        judged={item.totalJudge}
        orderItemList = {item.orderItemList}
        tarPeople={item.tarPeople}
        tarLongitude={item.tarLongitude}
        tarLatitude={item.tarLatitude}
        orderNo={item.orderNo}
        tarPhone={item.tarPhone}
        tarAddress={item.tarAddress}
        orderInfoId={item.orderInfoId}
      />
    ))
  }
        </ScrollView>
        </View>)}
}
