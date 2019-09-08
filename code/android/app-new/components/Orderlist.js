import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text,Icon } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter,Dimensions} from 'react-native'
import axios from 'axios';
import OrderItem from './OrderItem';
import Menu1 from './Menu1';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Menu from 'react-native-material-menu';
import { Drawer, List  } from '@ant-design/react-native';
var list=[];
const {height, width} = Dimensions.get('window');
var parserDate = function (date) {  
  var t = date.split(/[- :]/);
  var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);  
  return d;
};  
/**
 * @description 订单列表 
 * @constructor
 */
export default class Orderlist extends Component{
    constructor(props){
        super(props);
        state={
            text:'',
            itemlist:[],
            yes:"",
            isOpen:false
        }
    }
    /**
     * @description 点击全部响应函数
     */
    orderStatus(){
      console.log("emit here!");
        this.setState({itemlist:list});
    }
    /**
     * @description 点击待发货响应函数
     */
    orderStatus1(){
      var templist=[];
      var constantList = list;
      for(var i=0;i<constantList.length;i++){
        if(constantList[i].status == 0)
            templist.push(constantList[i]);
      }
      this.setState({itemlist:templist});
  }
  /**
     * @description 点击待付款响应函数
     */
  orderStatus2(){
    var templist=[];
      var constantList = list;
      for(var i=0;i<constantList.length;i++){
        if(constantList[i].status == 1)
            templist.push(constantList[i]);
      }
      this.setState({itemlist:templist});
}
/**
     * @description 点击全部配送中函数
     */
orderStatus3(){
  var templist=[];
      var constantList = list;
      for(var i=0;i<constantList.length;i++){
        if(constantList[i].status == 2)
            templist.push(constantList[i]);
      }
      this.setState({itemlist:templist});
}
/**
     * @description 点击全部订单已送达函数
     */
orderStatus4(){
  var templist=[];
      var constantList = list;
      for(var i=0;i<constantList.length;i++){
        if(constantList[i].status == 3)
            templist.push(constantList[i]);
      }
      this.setState({itemlist:templist});
}
/**
 * @description 页面刷新函数
 */
    change(){
      var userid =  this.props.userId;
      console.log(userid);
      axios.post('http://192.168.1.19:8080/order/userCheck',{id:userid,status:0}).then((response)=>{
        list = response.data;
      //  0：未支付 1：待发货 2：配送中 3：已送达
        for(var i=0;i<list.length;i++){
          list[i].icon="";
          var tempname = list[i].orderItemList[0].commodityInfo;
          list[i].time1 = parserDate(list[i].createDate);
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
        list.sort(function(item1,item2){
          return item1.time1-item2.time1;
      })
        console.log(list)
        this.setState({itemlist:list});
        console.log(this.state.itemlist);
      }).catch(function(error){
        console.log(error);
      })
      list.sort(function(item1,item2){
        return item1.time1-item2.time1;
    })
      this.setState({itemlist:list});
    }
    /**
     * @description 设置监听函数
     */
    componentDidMount(){
      this.listener = DeviceEventEmitter.addListener('change', () => {
      this.change();
        })
        this.listener = DeviceEventEmitter.addListener('changeOrder',()=>{
          this.change();
        })
        this.listener = DeviceEventEmitter.addListener('orderstatus', () => {
          this.orderStatus();
            })
          this.listener = DeviceEventEmitter.addListener('orderstatus1', () => {
            this.orderStatus1();
            })
          this.listener = DeviceEventEmitter.addListener('orderstatus2', () => {
            this.orderStatus2()
            })
          this.listener = DeviceEventEmitter.addListener('orderstatus3', () => {
              this.orderStatus3()
              })
              this.listener = DeviceEventEmitter.addListener('orderstatus4', () => {
                this.orderStatus4()
                })    
    }
    /**
     * @description 当页面销毁时移除监听
     */
    componentWillUnmount() {
      //移除监听
      if (this.listener) {
        this.listener.remove();
      }
    }
    /**
     * @description 进入页面时刷新
     */
    componentWillReceiveProps(){
      var userid =  this.props.userId;
      console.log(userid);
      axios.post('http://192.168.1.19:8080/order/userCheck',{id:userid,status:0}).then((response)=>{
        list = response.data;
      //  0：未支付 1：待发货 2：配送中 3：已送达
        for(var i=0;i<list.length;i++){
          list[i].icon="av-timer";
          var tempname = list[i].orderItemList[0].commodityInfo;
          list[i].time1 = parserDate(list[i].createDate);
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
        list.sort(function(item1,item2){
          return item1.time1-item2.time1;
      })
        console.log(list)
        this.setState({itemlist:list});
        console.log(this.state.itemlist);
      }).catch(function(error){
        console.log(error);
      })
      var yes = this.props.yes+"123";
      list.sort(function(item1,item2){
        return item1.time1-item2.time1;
    })
      this.setState({itemlist:list,yes:yes});
    }
    componentWillMount(){
      var userid =  this.props.userId;
      //var userid=2;
      console.log(userid);
      axios.post('http://192.168.1.19:8080/order/userCheck',{id:userid,status:0}).then((response)=>{
        list = response.data;
        
      //  0：未支付 1：待发货 2：配送中 3：已送达
        for(var i=0;i<list.length;i++){
          list[i].icon="av-timer";
          var tempname = list[i].orderItemList[0].commodityInfo;
          list[i].time1 = parserDate(list[i].createDate);
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
        console.log("sort here");
        list.sort(function(item1,item2){
          return item1.time1-item2.time1;
      })
        console.log(list)
        console.log("sort end!");
        this.setState({itemlist:list});
        console.log(this.state.itemlist);
      }).catch(function(error){
        console.log(error);
      })
      list.sort(function(item1,item2){
        return item1.time1-item2.time1;
    })
      this.setState({itemlist:list});
    }
    render(){
      var userid =  this.props.userId;
        return(
            <View style={{backgroundColor:'#ffffff',height:height}}>
                <View style={{backgroundColor:"#ffffff",height:height*0.07,marginTop:15}}>
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:20}}>优邻购</Text>
            </View></View>
<ScrollView style={{marginBottom:80,backgroundColor:"#ffffff"}}>
  <View>
    <View style={{flexDirection:'row',marginVertical:0}}>
    <View style={{width:width*0.8,marginLeft:20}}>
    <Text style={{fontSize:24}}>订单</Text></View>
    <Menu1/>
    <View style={{marginRight:40,marginTop:6}}>
    <Icon
              name='chevron-right'
              size={16}
              color={"#000000"}
        />
    
    </View>
    </View>
  <View>
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
        coverPicUrl={item.coverPicUrl}
      />
    ))
  }</View>
  </View>
        </ScrollView>
        </View>)}
}