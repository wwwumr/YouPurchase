import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text, Button,Divider,AirbnbRating,Overlay,Input,Rating } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter} from 'react-native'
export default class OrderItem extends Component{
    constructor(props){
      super(props);
      this.state={
        yes:"",
          content:"",
          score:-1,
          isVisible:false
      }
    }   
    /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 处理评分事件
     */ 
ratingCompleted(rating) {
  this.setState({score:rating})
  console.log("Rating is: " + rating)
}
/*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 关闭评价的表单
     */
    handler1(){
        this.setState({isVisible:false});
    }
    /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 打开评价的表单
     */
    handler(){
        this.setState({isVisible:true})
    }
    /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 实现跳转到订单详情页面
     */
    handler3(){
      if(this.props.status!=0)
      this.props.navigation.navigate('OrderDetail',{orderStatus:this.props.orderStatus,leftIcon:this.props.leftIcon,
        storeName:this.props.storeName,orderItemList:this.props.orderItemList,judged:this.props.judged,
      totalPrice:this.props.totalPrice,tarPeople:this.props.tarPeople,tarPhone:this.props.tarPhone,
      tarAddress:this.props.tarAddress,createData:this.props.time,
      tarLongitude:this.props.tarLongitude,tarLatitude:this.props.tarLatitude,orderNo:this.props.orderNo,
      orderInfoId:this.props.orderInfoId,storeId:this.props.storeId,userId:this.props.userId,mapjudged:this.props.mapjudged
    });
    else{
      var orderItemList = this.props.orderItemList;
      var templist=[];
      for(var i=0;i<orderItemList.length;i++){
        var tempitem={};
        tempitem.itemimg = orderItemList[i].commodityCoverPicUrl;
        tempitem.commodityInfo = orderItemList[i].commodityInfo;
        tempitem.quantity = orderItemList[i].amount;
        tempitem.itemPrice = orderItemList[i].price;
        tempitem.itemId = orderItemList[i].commodityId;
        templist.push(tempitem);
      }
      this.props.navigation.navigate('OrderOk2',{tarPeople:this.props.tarPeople,tarPhone:this.props.tarPhone,
        tarAddress:this.props.tarAddress,orderItemlist:templist,shopName:this.props.storeName,total:this.props.totalPrice,orderInfoId:this.props.orderInfoId});
    }
  }
  /*********************************** 
    ****          生命周期函数    ****
    ************************************/

    /**
     * @description 每次当yes改变是刷新
     */
  componentWillReceiveProps(){
    var yes=this.state.yes+="123";
    this.setState({yes:yes});
  }
    render(){
      return(
  <View style={{marginTop:20,marginBottom:10,backgroundColor:"#ffffff"}}>
      <View style={{marginLeft:10,marginRight:10}}>
    <ListItem
    leftIcon={this.props.leftIcon}
    title={<Text style={{fontSize:18}}>{this.props.storeName}</Text>}
    subtitle={<Text style={{fontSize:13}}>{this.props.time}</Text>}
    rightTitle={<Text style={{fontSize:15}}>{this.props.orderStatus}</Text>}/>
    <Divider style={{backgroundColor:"blue",marginBottom:5,marginLeft:35}}/>
    <ListItem
    title={<Text style={{marginLeft:35,fontSize:15}}>{this.props.orderItemName}</Text>}
    rightTitle={<Text style={{fontSize:15,fontWeight:"bold",fontFamily: 'System'}}>￥{this.props.totalPrice}</Text>}/>
    <Divider style={{backgroundColor:"blue",marginBottom:5}}/>
    <ListItem
    rightIcon={<View style={{flexDirection:"row"}}><View style={{marginRight:10}}><Button  title={this.props.status==0?"去支付":"详情"} type="outline" onPress={this.handler3.bind(this)}/></View></View>}/>
    </View>
  </View>
      );
    }
  }